import "./App.css";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProtectedRoute from "./Components/PrivateRoute";

import { useSelector } from "react-redux";
import Map from "./Pages/Map";
import Error404 from "./Components/404";
import Profile from "./Pages/Profile";
import ResetPassword from "./Pages/ResetPassword";
import TermsAndConditions from "./Pages/TermsAndConditions";
import Copyright from "./Components/Copyright";
import ForgotPassword from "./Pages/ForgotPassword";
import EmailConfirmation from "./Components/EmailConfirmed";
import EmailNotConfirmed from "./Components/EmailNotConfirmed";

import Spots from "./Pages/Spots";
import Friends from "./Pages/Friends";
import SingleSpot from "./Pages/SingleSpot";
import MainPage from "./Pages/MainPage/index";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6FCF97",
    },
    fontWhite: {
      main: "#fff",
    },
  },
});

function App() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const spots = useSelector((state) => state.spots);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute user={currentUser} />}>
            {currentUser && (
              <>
                <Route path="/" element={<MainPage />} />
              </>
            )}

            <Route path="/Map" element={<Map spots={spots} />} />
            <Route path="/spots">
              <Route index element={<Spots />} />
              <Route path=":spotId" element={<SingleSpot />} />
            </Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/friends/*" element={<Friends />} />
          </Route>
          {!currentUser && (
            <>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route
                path="terms-and-conditions"
                element={<TermsAndConditions />}
              />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />}>
                <Route path=":code" element={<ResetPassword />} />
              </Route>
              <Route path="confirmed" element={<EmailConfirmation />} />
            </>
          )}
          <Route path="notconfirmed" element={<EmailNotConfirmed />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
      {/* <Copyright style={{ marginBottom: "25px" }} /> */}
    </ThemeProvider>
  );
}

export default App;
