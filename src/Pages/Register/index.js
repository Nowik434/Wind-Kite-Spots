import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useParams, useNavigate, Link as LinkR } from "react-router-dom";
import Copyright from "../../Components/Copyright";
import { registerUser } from "../../Slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { Logo } from "../../Components/Logo";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDocumentTitle } from "../../Hooks/useDocumentTitle";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const token = "YOUR_TOKEN_HERE"; // TOKEN TRZEBA USTAWIĆ, Narazie działa bez

export default function Register() {
  useDocumentTitle("rejestracja");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMsg = useSelector((state) => state.message);

  const schema = yup.object({
    password: yup
      .string()
      .required("Wpisz hasło")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Hasło musi zawierać przynajmniej 8 znaków, jedną małą i wielką literę, jedną liczbę oraz znak specjalny"
      ),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Hasło musi być takie samo")
      .required("Powtórz hasło"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loadnig, setLoading] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  //   const [firstName, setFirstName] = useState('');
  //   const [lastName, setLastName] = useState('');
  // const [password, setPassword] = useState();
  const [clamped, setClamped] = useState(true);
  const [checkboxes, setCheckboxes] = useState({
    rodo: false,
    terms: false,
  });

  const { rodo, terms } = checkboxes;
  const error = [rodo, terms].filter((v) => v).length !== 2;

  useEffect(() => {
    if (!error && watch("password") !== "" && watch("repeatPassword") !== "") {
      setIsValidate(true);
    } else {
      setIsValidate(false);
    }
  }, [checkboxes, watch("password"), watch("repeatPassword")]);

  const onSubmit = (data) => {
    console.log(data.firstname, data.lastname, data.email, data.password);
    setLoading(true);
    try {
      dispatch(
        register({
          email: data.email,
          password: data.password,
          firstname: data.firstname,
          lastname: data.lastname,
          userRole: "guest",
        })
      )
        .unwrap()
        .then((res) => {
          console.log(res);
          if (res.user !== undefined && res.user.user.confirmed == true) {
            navigate("/");
            setLoading(false);
          } else if (res.user.user.confirmed == false) {
            navigate("/notconfirmed");
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log("errrr", err);
          setLoading(false);
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleCheckboxChange = (e) => {
    setCheckboxes({
      ...checkboxes,
      [e.target.name]: e.target.checked,
    });
  };

  return (
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
        <Logo />
        <Typography component="h1" variant="h5">
          Registration
        </Typography>
        <Typography component="p" variant="h8" sx={{ textAlign: "center" }}>
          Register to ....
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => handleSubmit(onSubmit)(e)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="Name"
            name="firstname"
            {...register("firstname")}
            helperText={errors.firstname && errors.firstname.message}
            error={errors.firstname !== undefined}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Surname"
            name="lastname"
            {...register("lastname")}
            helperText={errors.lastname && errors.lastname.message}
            error={errors.lastname !== undefined}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Adress"
            name="email"
            autoComplete="email"
            {...register("email")}
            helperText={errors.email && errors.email.message}
            error={errors.email !== undefined}
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
            {...register("password")}
            helperText={errors.password && errors.password.message}
            error={errors.password !== undefined}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="repeatPassword"
            label="Repeat Password"
            type="password"
            id="repeatPassword"
            autoComplete="current-password"
            {...register("repeatPassword")}
            helperText={errors.repeatPassword && errors.repeatPassword.message}
            error={errors.repeatPassword !== undefined}
          />
          {console.log(errorMsg.message)}
          {errorMsg.message !== "" && (
            <Alert severity="error">
              <AlertTitle>{errorMsg.message}</AlertTitle>
            </Alert>
          )}
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="rodo"
                  value="rodo"
                  color="primary"
                  checked={rodo}
                  onChange={handleCheckboxChange}
                />
              }
              label={
                <div
                  style={{
                    boxSizing: "border-box",
                    display: "flex",
                    WebkitBoxAlign: "end",
                    msFlexAlign: "end",
                    alignItems: "flex-end",
                  }}
                >
                  <div className={clamped && "clamp"}>
                    I consent to the processing of personal data contained in
                    the registration form for the purpose of registration and
                    account maintenance in the system. I acknowledge that giving
                    consent is voluntary and that I can revoke my consent at any
                    time by contacting us. Detailed information about the
                    processing of your personal data, including your rights, can
                    be found in our
                    <br />
                    <Link href="/terms-and-conditions" underline="always">
                      Privacy Policy
                    </Link>
                    <br />
                    and
                    <br />
                    <Link href="/terms-and-conditions" underline="always">
                      Cookies policy
                    </Link>
                    .
                  </div>
                  <Link underline="always" onClick={() => setClamped(!clamped)}>
                    {clamped ? "rozwiń" : "zwiń"}
                  </Link>
                </div>
              }
              sx={{ marginRight: "4px" }}
            />
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    name="terms"
                    checked={terms}
                    onChange={handleCheckboxChange}
                    value="terms"
                    color="primary"
                  />
                }
                label={`Accept`}
                sx={{ marginRight: "4px" }}
              />
              <Link href="/terms-and-conditions" underline="always">
                Terms and Conditions
              </Link>
            </div>
          </FormGroup>
          {error && (
            <FormHelperText sx={{ color: "red" }}>
              You must check all consents
            </FormHelperText>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isValidate}
          >
            Register
          </Button>
          <Grid container>
            <Grid item>
              <LinkR
                to="/login"
                style={{ textDecoration: "none", color: "#d2ab67" }}
              >
                You have an account? Log In
              </LinkR>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
