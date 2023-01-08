import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../Slices/spots";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import DropdownShareButton from "../../Components/DropdownShareButton";
import { CardHeader, Fade, IconButton, Link, Slider } from "@mui/material";
import { useDocumentTitle } from "../../Hooks/useDocumentTitle";
import { Footer } from "../../Components/Footer";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { update } from "../../Slices/auth";
import RangeSlider from "../../Components/RangeSlider";

const UPLOADS_URL = process.env.REACT_APP_UPLOADS_URL;

export default function Spots() {
  useDocumentTitle("Spots");
  const [displaySelected, setDisplaySelected] = useState("all");
  const [filtered, setFiltered] = useState([]);
  // const [showRangeSlider, setShowRangeSlider] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  console.log("filtered", filtered);

  // const yourTypes = useSelector((state) =>
  //   state.spots.reduce(
  //     (unique, item) =>
  //       unique.includes(item.attributes.type)
  //         ? unique
  //         : [...unique, item.attributes.type],
  //     []
  //   )
  // );
  const spots = useSelector((state) => state.spots);
  const { user } = useSelector((state) => state.auth);
  const { liked } = useSelector((state) => state.auth.user.user);

  const likedFilter = spots.filter(
    (spot) => liked.indexOf(spot.attributes.name) !== -1
  );

  // const rangeFilter = (range) => {
  //   const filteredSpots = spots.filter((spot) => {
  //     const lat = spot.attributes.latitude;
  //     const lng = spot.attributes.longitude;
  //     return (
  //       lat >= range.minLat &&
  //       lat <= range.maxLat &&
  //       lng >= range.minLng &&
  //       lng <= range.maxLng
  //     );
  //   });

  //   return filteredSpots;
  // };

  const showNerby = () => {
    setDisplaySelected("nerby");
    console.log("nerby");
  };

  console.log("Liked Filter", likedFilter);
  // console.log(
  //   "Range Filter",
  //   rangeFilter({ minLat: 50, maxLat: 52, minLng: 21, maxLng: 23 })
  // );

  // const filteredSpots = (type) =>
  //   type
  //     .map((type) => spots.filter((el) => el.attributes.type === type && el))
  //     .flat();

  // useEffect(() => {
  //   if (spots) {
  //     dispatch(getSpots(user));
  //   }
  //   setFiltered(filteredSpots(yourTypes));
  // }, [displaySelected]);

  const addToLikedList = (name) => {
    console.log(name, liked);
    let likeList = [];
    if (liked.includes(name)) {
      likeList = liked.filter((el) => el !== name);
    } else {
      likeList = !liked ? [name] : [...liked, name];
    }
    console.log(likeList);
    dispatch(
      update({
        id: user.user.id,
        token: user.jwt,
        payload: { liked: likeList },
      })
    );
  };

  return (
    <>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
            >
              Find a spot
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Find the spot that's best for you and add it to your favorites
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant={displaySelected === "liked" ? "contained" : "outlined"}
                onClick={() => setDisplaySelected("liked")}
              >
                Liked
              </Button>
              <Button
                variant={displaySelected === "nerby" ? "contained" : "outlined"}
                onClick={() => showNerby()}
                // disabled
              >
                Nerby You
              </Button>

              <Button
                variant={displaySelected === "all" ? "contained" : "outlined"}
                onClick={() => setDisplaySelected("all")}
              >
                All
              </Button>
            </Stack>
            <RangeSlider
              setFiltered={setFiltered}
              displaySelected={displaySelected}
            />
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {displaySelected === "liked" &&
              likedFilter.map(({ id, attributes }) => (
                <Fade key={id} in={true} timeout={400}>
                  <Grid item key={id} xs={12} sm={4} md={4}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                      }}
                    >
                      <CardHeader
                        action={
                          <IconButton aria-label="delete" color="primary">
                            {liked.includes(attributes.name) ? (
                              <FavoriteIcon sx={{ color: "#ff2323" }} />
                            ) : (
                              <FavoriteBorderIcon />
                            )}
                          </IconButton>
                        }
                        sx={{ position: "absolute" }}
                        onClick={() => addToLikedList(attributes.name)}
                      />
                      <CardMedia
                        component="img"
                        alt="zdjęcie"
                        height="140"
                        image={
                          attributes.image.data
                            ? `${UPLOADS_URL}${attributes.image.data.attributes.url}`
                            : null
                        }
                      />
                      <CardContent sx={{ flex: "auto" }}>
                        <Typography variant="h5" component="div">
                          {attributes.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {attributes.desc}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <DropdownShareButton shareUrl={attributes.share_url} />
                        <Link
                          href={attributes.share_url}
                          style={{
                            margin: "0px 0px 0px auto",
                            textDecoration: "none",
                          }}
                          target="_blank"
                        >
                          <Button
                            onClick={() => navigate(`/spots/${id}`)}
                            size="small"
                          >
                            More
                          </Button>
                        </Link>
                      </CardActions>
                    </Card>
                  </Grid>
                </Fade>
              ))}
            {displaySelected === "all" &&
              spots.map(({ id, attributes }) => (
                <Fade key={id} in={true} timeout={400}>
                  <Grid item key={id} xs={12} sm={4} md={4}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                      }}
                    >
                      <CardHeader
                        action={
                          <IconButton aria-label="delete" color="primary">
                            {liked.includes(attributes.name) ? (
                              <FavoriteIcon sx={{ color: "#ff2323" }} />
                            ) : (
                              <FavoriteBorderIcon />
                            )}
                          </IconButton>
                        }
                        sx={{ position: "absolute" }}
                        onClick={() => addToLikedList(attributes.name)}
                      />
                      <CardMedia
                        component="img"
                        alt="zdjęcie"
                        height="140"
                        image={
                          attributes.image.data
                            ? `${UPLOADS_URL}${attributes.image.data.attributes.url}`
                            : null
                        }
                      />
                      <CardContent sx={{ flex: "auto" }}>
                        <Typography variant="h5" component="div">
                          {attributes.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {attributes.desc}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <DropdownShareButton shareUrl={attributes.share_url} />
                        <Link
                          href={attributes.share_url}
                          style={{
                            margin: "0px 0px 0px auto",
                            textDecoration: "none",
                          }}
                          target="_blank"
                        >
                          <Button
                            onClick={() => navigate(`/spots/${id}`)}
                            size="small"
                          >
                            More
                          </Button>
                        </Link>
                      </CardActions>
                    </Card>
                  </Grid>
                </Fade>
              ))}
            {displaySelected === "nerby" &&
              filtered.map(({ id, attributes }) => (
                <Fade key={id} in={true} timeout={400}>
                  <Grid item key={id} xs={12} sm={4} md={4}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                      }}
                    >
                      <CardHeader
                        action={
                          <IconButton aria-label="delete" color="primary">
                            {liked.includes(attributes.name) ? (
                              <FavoriteIcon sx={{ color: "#ff2323" }} />
                            ) : (
                              <FavoriteBorderIcon />
                            )}
                          </IconButton>
                        }
                        sx={{ position: "absolute" }}
                        onClick={() => addToLikedList(attributes.name)}
                      />
                      <CardMedia
                        component="img"
                        alt="zdjęcie"
                        height="140"
                        image={
                          attributes.image.data
                            ? `${UPLOADS_URL}${attributes.image.data.attributes.url}`
                            : null
                        }
                      />
                      <CardContent sx={{ flex: "auto" }}>
                        <Typography variant="h5" component="div">
                          {attributes.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {attributes.desc}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <DropdownShareButton shareUrl={attributes.share_url} />
                        <Link
                          href={attributes.share_url}
                          style={{
                            margin: "0px 0px 0px auto",
                            textDecoration: "none",
                          }}
                          target="_blank"
                        >
                          <Button
                            onClick={() => navigate(`/spots/${id}`)}
                            size="small"
                          >
                            More
                          </Button>
                        </Link>
                      </CardActions>
                    </Card>
                  </Grid>
                </Fade>
              ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </>
  );
}
