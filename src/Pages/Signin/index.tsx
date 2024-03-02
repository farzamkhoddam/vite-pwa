import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useMutation } from "react-query";
import axios from "axios";
import { useState } from "react";
import {
  AuthResDataType,
  CookiesTypes,
  
  SigninInterface,
} from "../../Types";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Signin = () => {
  const [formData, setFormData] = useState<SigninInterface>({
    UserNameOrEmail: "",
    Password: "",
  } as SigninInterface);
  const navigate = useNavigate();
  const mutation = useMutation<AuthResDataType>(
    async () => {
      const response = await axios.post(
        "https://localhost:7215/api/auth/login",
        formData
      );
      return response.data;
    },
    {
      onSuccess: (res) => {
        Cookies.set(CookiesTypes.USER_KEY, res.accessToken, {
          secure: true, // Use secure cookies in production
          sameSite: "strict", // Prevents the cookie from being sent in cross-site requests
          expires: 1, // Cookie expires after 7 days
        });
        Cookies.set(CookiesTypes.USER_REFRESH_KEY, res.refreshToken, {
          secure: true, // Use secure cookies in production
          sameSite: "strict", // Prevents the cookie from being sent in cross-site requests
          expires: 7, // Cookie expires after 7 days
        });
        navigate("/?boss=true");
      },
      onError: (error) => {
        // @ts-expect-error I dont have the type
        toast.error(error.response.data.error[0]);
        console.error( error);
      },
    }
  );
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "fit-content",
          p: 4,
          maxWidth: "30rem",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => e.preventDefault()}
          sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="User Name or Email Address"
            name="UsernameOrEmail"
            value={formData.UserNameOrEmail}
            onChange={(e) =>
              setFormData({ ...formData, UserNameOrEmail: e.target.value })
            }
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.Password}
            onChange={(e) =>
              setFormData({ ...formData, Password: e.target.value })
            }
          />
          <Button
            fullWidth
            type={"submit"}
            variant="contained"
            disabled={!formData.UserNameOrEmail || !formData.Password}
            onClick={() => mutation.mutate()}
            sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
export default Signin;
