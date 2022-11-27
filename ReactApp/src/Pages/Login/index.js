import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../../Components/Copyright";
import { login } from "../../Slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Logo } from "../../Components/Logo";
import MainBanner from "../../assets/main-banner.jpg";
import { useRememberMe } from "../../Hooks/useRememberMe";
import { useDocumentTitle } from "../../Hooks/useDocumentTitle";
import { Avatar, createTheme, Paper, ThemeProvider } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { getSpots } from "../../Slices/spots";

export default function Login() {
  useDocumentTitle("logowanie");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checked, setChecked] = useState(false);

  const { saveToLocal } = useRememberMe(checked, { username, password });

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.message);

  const checkboxChange = (e) => {
    setChecked(e);
  };
  const theme = createTheme();
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("rememberMe"));
    setChecked(localData ? true : false);
    setUsername(localData ? localData.username : username);
    setPassword(localData ? localData.password : password);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (!username.includes("@")) {
      setUsernameError("Login musi zawierać znak @");
    } else if (username.length < 5) {
      setUsernameError("Login musi być dłuższy niż 5 znaków");
    } else {
      setUsernameError(null);
    }

    if (password.length < 5) {
      setPasswordError("Hasło musi być dłuższe niż 5 znaków");
    } else {
      setPasswordError(null);
    }
    saveToLocal();
    dispatch(login({ username, password }))
      .unwrap()
      .then((res) => {
        if (res.user !== undefined) {
          navigate("/");
          setLoading(false);
          // window.location.reload();
          if (res.user.jwt) {
            dispatch(getSpots(res.user));
          }
        }
      })
      .catch((err) => {
        console.log("errrr", err.message);
        setLoading(false);
      });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${MainBanner})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={0}
        square
        // sx={{ alignSelf: "center" }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "transparent", width: 256, height: 256 }}
          >
            <Logo size={300} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={usernameError ? true : false}
              helperText={usernameError}
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              error={passwordError ? true : false}
              helperText={passwordError}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  color="primary"
                  onChange={(e) => checkboxChange(e.target.checked)}
                />
              }
              label="Remember me"
            />
            {error.message !== "" && (
              <Alert severity="error">
                <AlertTitle sx={{ mb: 0 }}>{error.message}</AlertTitle>
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Zaloguj
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"You don`t have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
