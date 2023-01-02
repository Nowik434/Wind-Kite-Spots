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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainBanner from "../../assets/main-banner.jpg";
import { useRememberMe } from "../../Hooks/useRememberMe";
import { useDocumentTitle } from "../../Hooks/useDocumentTitle";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { getSpots } from "../../Slices/spots";

export default function MainPage() {
  useDocumentTitle("Main Page");

  const navigate = useNavigate();

  const UPLOADS_URL = process.env.REACT_APP_UPLOADS_URL;
  const spots = useSelector((state) => state.spots);

  const carouselItems = [
    {
      name: "Find a spot",
      description:
        "Find the spot that's best for you and add it to your favorites",
    },
    {
      name: "Let's meet on the spot!!",
      description: "Let your friends know where you are",
    },
  ];

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user.user.jwt) {
      dispatch(getSpots(user));
    }
  }, [user, dispatch]);

  return (
    <>
      <Grid
        container
        component="main"
        sx={{ height: "100%", position: "fixed" }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            height: "100%",
            backgroundImage: `url(${MainBanner})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { xs: "none", sm: "block" },
          }}
        >
          <Carousel
            sx={{ height: "100%" }}
            height="100px"
            fullHeightHover={true}
          >
            {carouselItems.map((item, i) => (
              <Box
                sx={{
                  height: "100vh",
                  backgroundImage: `url(${MainBanner})`,
                  backgroundRepeat: "no-repeat",
                  backgroundColor: (t) =>
                    t.palette.mode === "light"
                      ? t.palette.grey[50]
                      : t.palette.grey[900],
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography component="h4" variant="h2">
                    {item.name}
                  </Typography>
                  <Typography>{item.description}</Typography>

                  <Button
                    size="large"
                    variant="contained"
                    className="CheckButton"
                    sx={{
                      color: "#fff",
                      mt: 3,
                    }}
                    onClick={() => navigate("/map")}
                  >
                    Check it out!
                  </Button>
                </Box>
              </Box>
            ))}
          </Carousel>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
          <Box
            sx={{
              my: 1,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              overflow: "hidden",
              overflowY: "scroll",
              height: "100%",
              position: "fixed",
              "&::-webkit-scrollbar": {
                width: 10,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "rgba(0, 0, 0, 0.12)",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#6fcf9791",
                borderRadius: 2,
              },
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ marginTop: { xs: "60px", sm: "0px" } }}
            >
              Places
            </Typography>
            <Grid
              container
              spacing={2}
              sx={{ px: 2, textAlign: { xs: "-webkit-center", sm: "inherit" } }}
            >
              {spots.map(({ id, attributes: { name, desc, image } }) => (
                <Grid key={id} item xs={12} sm={6} md={4}>
                  <Card
                    id={id}
                    sx={{
                      maxWidth: 345,
                      height: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={`${UPLOADS_URL}${image.data.attributes.url}`}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {desc}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => navigate(`/spots/${id}`)}
                      >
                        More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
