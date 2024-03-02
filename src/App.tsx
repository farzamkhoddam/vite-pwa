import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Homepage";
import Settings from "./Pages/Settings";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import { AuthResDataType, CookiesTypes } from "./Types";
import { GetUserKeyDecoded } from "./utils";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

function App() {
  const refreshToken = Cookies.get(CookiesTypes.USER_REFRESH_KEY)
  const tokenId = GetUserKeyDecoded().UserId;
  const navigate = useNavigate();
  const mutation = useMutation<AuthResDataType>(
    async () => {
      const response = await axios.post(
        `https://localhost:7215/api/auth/refresh/${tokenId}`,

        refreshToken,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Ensure this matches the expected content type
          },
        }
      );
      return response.data;
    },

    {
      onSuccess: (res) => {
       Cookies.set(CookiesTypes.USER_KEY, res.accessToken, {
         secure: true, // Use secure cookies in production
         sameSite: "strict", // Prevents the cookie from being sent in cross-site requests
         expires: 7, // Cookie expires after 7 days
       });
       Cookies.set(CookiesTypes.USER_REFRESH_KEY, res.refreshToken, {
         secure: true, // Use secure cookies in production
         sameSite: "strict", // Prevents the cookie from being sent in cross-site requests
         expires: 7, // Cookie expires after 7 days
       });
        toast.success("yayyyyyyyyy");
      },
      onError: (err) => {
        console.error(err);
        toast.error("Your Session Has Expired! Please Signin again");
        navigate("/signin");
      },
    }
  );

  // handling unauthorized requests
  function handleUnauthorized(error: AxiosError) {
    if (
      error.response &&
      error.response.status === 401 &&
      !!Cookies.get(CookiesTypes.USER_REFRESH_KEY)
    ) {
      mutation.mutate()
    }
    return Promise.reject(error);
  }
  axios.interceptors.response.use(
    (response) => {
      // If the request was successful, just return the response
      return response;
    },
    (error) => {
      // If there was an error, check if it's a 401 Unauthorized response
      return handleUnauthorized(error);
    }
  );

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
}

export default App;
