import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import useMediaQuery from "@mui/material/useMediaQuery";

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
  const [value, setValue] = useState(dayjs("2022-12-18T21:11:54"));
  const mobileView = useMediaQuery("(max-width:600px)");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  console.log(mobileView);

  return (
    <>
      <Typography variant="h7" component="h6" sx={{ mt: 4, mb: 2 }}>
        Choose the date and how much time you will spend on the water.
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {mobileView ? (
          <MobileDatePicker
            label="Date"
            inputFormat="MM/DD/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        ) : (
          <DesktopDatePicker
            label="Date"
            inputFormat="MM/DD/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
      </LocalizationProvider>
      <Box sx={{ width: "75%", mt: 2 }}>
        <Slider
          aria-label="Always visible"
          defaultValue={0}
          getAriaValueText={valuetext}
          step={34}
          marks={marks}
          // valueLabelDisplay="on"
        />
      </Box>
    </>
  );
}
