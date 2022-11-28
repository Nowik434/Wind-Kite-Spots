import React from "react";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

const footers = [
  {
    title: "O NAS",
    description: [
      { title: "Historia", url: "https://dev-nowicki.pl/" },
      { title: "Działalność", url: "https://dev-nowicki.pl/" },
      { title: "Lokalizacja", url: "https://dev-nowicki.pl/" },
    ],
  },
  {
    title: "DZIAŁALNOŚĆ",
    description: [
      { title: "Jak uzyskać cośtam?", url: "https://dev-nowicki.pl/" },
    ],
  },
  {
    title: "INFORMACJE",
    description: [
      { title: "Jak cośtam?", url: "https://dev-nowicki.pl/" },
      { title: "Jak zgłosić cośtam?", url: "https://dev-nowicki.pl/" },
    ],
  },
  {
    title: "KONTAKT",
    description: [
      { title: "Lokalizacja", url: "https://dev-nowicki.pl/" },
      { title: "Napisz do Nas", url: "https://dev-nowicki.pl/" },
    ],
  },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const Footer = () => {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {footers.map((footer) => (
              <Grid item xs={6} sm={3}>
                <Item elevation={7}>YOUR AD</Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
