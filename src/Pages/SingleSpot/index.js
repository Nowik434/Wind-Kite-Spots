import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
// import { getCertificates } from "../../Slices/certificates";
import { useParams } from "react-router-dom";
import { createSelector } from "reselect";

const UPLOADS_URL = process.env.REACT_APP_UPLOADS_URL;

export default function SingleSpot() {
  let { spotId } = useParams();

  const selectSpot = createSelector(
    (state) => state.spots,
    (spots) => spots.filter((spot) => spot.id === Number(spotId))[0].attributes
  );

  const componentRef = useRef();

  const spot = useSelector(selectSpot);

  console.log(spot);

  return (
    <main>
      {spot && (
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
              gutterBottom
            >
              Spot {spot && spot.name}
            </Typography>
            <Typography
              variant="h4"
              align="center"
              color="text.secondary"
              paragraph
            >
              {spot && spot.desc}
            </Typography>
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <img
                src={
                  spot.image.data
                    ? `${UPLOADS_URL}${spot.image.data.attributes.url}`
                    : null
                }
                alt={spot && spot.name}
                loading="lazy"
                style={{ maxWidth: "100%" }}
                ref={componentRef}
              />
            </div>
          </Container>
        </Box>
      )}
      {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
    </main>
  );
}
