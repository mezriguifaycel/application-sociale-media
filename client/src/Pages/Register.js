import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { SignUp } from "../Redux/UserSlice";
import { useNavigate } from "react-router-dom";
import Img1 from "../img1.jpg";
import { Input } from "@mui/material";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        SOCIAL MEDIA
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
const Register = () => {
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({});
  const HandleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const HandleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };
  const dispatch = useDispatch();
  const signinUp = (e) => {
    e.preventDefault();
    const formDataUser = new FormData();
    formDataUser.append("name", newUser.name);
    formDataUser.append( "email", newUser.email );
    formDataUser.append("nationalite", newUser.nationalite);
    formDataUser.append("password", newUser.password);
    formDataUser.append("Img", image);
    dispatch(SignUp(formDataUser));
    navigate("/Login");
  };
  return (
    <div className="loginthm">
      <img src={Img1} alt="" className="img" />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
                    onChange={HandleChange}
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    onChange={HandleChange}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />{" "}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={HandleChange}
                    required
                    fullWidth
                    id="nationalite"
                    label="Nationalite"
                    name="nationalite"
                    autoComplete="nationalite"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    onChange={HandleChange}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={13}>
                  <Input
                    onChange={HandleChangeImage}
                    required
                    fullWidth
                    name="img"
                    type="file"
                    accept="image/*"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                onClick={signinUp}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item></Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Register;
