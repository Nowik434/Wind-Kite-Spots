import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Button } from "@mui/material";

export default function RentalListItem() {
  const theme = useTheme();

  return (
    <Card
      elevation={6}
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        maxHeight: "200px",
        mb: 4,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            Name of your rental
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Subtitle
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <Button variant="outlined" href="#outlined-buttons">
            Details
          </Button>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ display: "flex" }}
        image="http://localhost:1337/uploads/s3_2a75d22fd1.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
}
