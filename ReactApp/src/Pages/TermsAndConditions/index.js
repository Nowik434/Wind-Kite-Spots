import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../../Components/Copyright";
import { Logo } from "../../Components/Logo";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

export default function TermsAndConditions() {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        elevation={4}
        sx={{ p: 4, marginTop: 8, display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            alignItems: "center",
          }}
        >
          <Logo />
          <Typography component="h2" variant="h6">
            Terms and Conditions
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Typography variant="body2" gutterBottom>
              Pursuant to Article 6(1)(a) of the General Data Protection
              Regulation of April 27, 2016(Official Journal of the EU L 119 of
              04.05.2016), I consent to the processing of my personal data for
              marketing purposes. I have been informed that I have the right to
              access my data, the possibility of correcting them, to request to
              stop processing them. The administrator of the data is.
            </Typography>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Box>
        </Box>
      </Paper>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
