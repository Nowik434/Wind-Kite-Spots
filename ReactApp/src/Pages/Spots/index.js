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
import { Fade, Link } from "@mui/material";
import { useDocumentTitle } from "../../Hooks/useDocumentTitle";
import { Footer } from "../../Components/Footer";

const UPLOADS_URL = process.env.REACT_APP_UPLOADS_URL;

export default function Spots() {
  useDocumentTitle("Spots");
  const [displaySelected, setDisplaySelected] = useState(false);
  const [filtered, setFiltered] = useState();
  const dispatch = useDispatch();
  const yourTypes = useSelector((state) =>
    state.spots.reduce(
      (unique, item) =>
        unique.includes(item.attributes.type)
          ? unique
          : [...unique, item.attributes.type],
      []
    )
  );
  const spots = useSelector((state) => state.spots);
  const { user } = useSelector((state) => state.auth);
  const filteredSpots = (type) =>
    type
      .map((type) => spots.filter((el) => el.attributes.type === type && el))
      .flat();

  useEffect(() => {
    if (spots) {
      dispatch(getSpots(user));
    }
    setFiltered(filteredSpots(yourTypes));
  }, [displaySelected]);

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
                variant={displaySelected ? "contained" : "outlined"}
                onClick={() => setDisplaySelected(true)}
              >
                Liked
              </Button>
              <Button
                variant={displaySelected ? "outlined" : "contained"}
                onClick={() => setDisplaySelected(false)}
              >
                Nerby You
              </Button>
              <Button
                variant={displaySelected ? "outlined" : "contained"}
                onClick={() => setDisplaySelected(false)}
              >
                All
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {displaySelected &&
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
                      <CardMedia
                        component="img"
                        alt="zdjęcie"
                        height="140"
                        image={
                          attributes.src.data
                            ? `${UPLOADS_URL}${attributes.image.data.attributes.url}`
                            : null
                        }
                      />
                      <CardContent>
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
                          <Button size="small">More</Button>
                        </Link>
                      </CardActions>
                    </Card>
                  </Grid>
                </Fade>
              ))}
            {!displaySelected &&
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
                          <Button size="small">More</Button>
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
