import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const UPLOADS_URL = process.env.REACT_APP_UPLOADS_URL;

function MapCards({ setActive, activeMarker }) {
  const spots = useSelector((state) => state.spots);

  const mobile = useMediaQuery("(min-width:600px)");

  return (
    <Paper
      elevation={3}
      sx={
        mobile
          ? {
              zIndex: 1,
              position: "fixed",
              top: "93px",
              right: "30px",
              height: "90%",
              maxWidth: "300px",
            }
          : {
              position: "absolute",
              width: "100vw",
              bottom: "0",
            }
      }
    >
      <Grid
        container
        spacing={2}
        sx={
          mobile
            ? {
                px: 2,
                overflowY: "scroll",
                height: "100%",
                display: "flex",
                alignItems: "center",
                marginTop: "0px",
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
              }
            : {
                display: "flex",
                flexDirection: "row",
                overflowX: "scroll",
                overflowY: "hidden",
                flexWrap: "nowrap",
              }
        }
      >
        {spots.map(({ id, attributes: { name, desc, image } }) => (
          <Grid
            key={id}
            item
            xs={12}
            sm={12}
            md={12}
            sx={
              !mobile && {
                maxHeight: "320px",
                minHeight: "320px",
                minWidth: "200px",
              }
            }
          >
            <Card
              id={id}
              sx={
                mobile
                  ? { maxWidth: 345 }
                  : { marginTop: "16px", maxWidth: 345, height: "275px" }
              }
              onClick={() => setActive(id)}
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
              <CardActions></CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default MapCards;
