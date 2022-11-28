import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 0,
    label: "1 hour",
  },
  {
    value: 33,
    label: "2 hours",
  },
  {
    value: 66,
    label: "3 hours",
  },
  {
    value: 100,
    label: "All Day",
  },
];

function valuetext(value) {
  return `${value}`;
}

export default function StartActivity() {
  return (
    <Box sx={{ width: "75%" }}>
      <Slider
        aria-label="Always visible"
        defaultValue={0}
        getAriaValueText={valuetext}
        step={34}
        marks={marks}
        valueLabelDisplay="on"
      />
    </Box>
  );
}
