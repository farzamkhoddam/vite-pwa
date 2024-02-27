import {
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { LocalStorageTypes, SignupInterface } from "../../Types";
import { useMutation } from "react-query";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupInterface>({
    UserName: "",
    Email: "",
    Password: "",
  } as SignupInterface);
  const mutation = useMutation(
    async () => {
      const response = await axios.post(
        "https://localhost:7215/api/auth/register",
        formData
      );
      return response.data;
    },
    {
      onSuccess: (res) => {
        
        localStorage.setItem(LocalStorageTypes.USER_KEY, res);
        navigate("/?boss=true");
      },
      onError: (error) => {
        // @ts-expect-error I dont have the type
        toast.error(error.response.data.error[0]);
        console.log("farzam error ===", error);
      },
    }
  );
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
          Sign up
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={formData.UserName}
                onChange={(e) =>
                  setFormData({ ...formData, UserName: e.target.value })
                }
                label="User Name"
                name="user name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={formData.Email}
                onChange={(e) =>
                  setFormData({ ...formData, Email: e.target.value })
                }
                label="Email Address"
                name="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={formData.Password}
                onChange={(e) =>
                  setFormData({ ...formData, Password: e.target.value })
                }
                label="Password"
                type="password"
              />
            </Grid>
          </Grid>
          <Button
            disabled={
              !formData.UserName || !formData.Email || !formData.Password
            }
            onClick={() => {
              mutation.mutate();
            }}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signin">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
export default Signup;
