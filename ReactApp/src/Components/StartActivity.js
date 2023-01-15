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

export default function StartActivity({ setExpirationDate }) {
  const [value, setValue] = useState(dayjs("2022-12-18T21:11:54"));
  const [duration, setDuration] = useState();
  const mobileView = useMediaQuery("(max-width:600px)");

  const addTime = (duration = 1) => {
    console.log(duration);
    switch (duration) {
      case 0:
        console.log("duration is 0");
        return 1;
      case 0.25:
        console.log("duration is 0.25");
        return 2;
      case 0.75:
        console.log("duration is 0.75");
        return 3;
      case 1:
        console.log("duration is 1");
        return 10;
      default:
        console.log("no value");
    }
  };
  // const testReturn = addTime(duration);
  // console.log(testReturn);

  const handleChange = (newValue) => {
    // const currentDate = new Date();
    const date = new Date(newValue);
    // console.log(date);
    setValue(date);
    setExpirationDate(
      new Date(date.setHours(date.getHours() + addTime(duration)))
    );
  };
  // console.log(value);
  // console.log(new Date(value));
  // console.log(currentDate);
  // console.log(new Date(currentDate.setHours(currentDate.getHours() + 2)));

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
          onChange={(e) =>
            setDuration(Math.round(e.target.value * 0.01 * 4) / 4)
          }
        />
      </Box>
    </>
  );
}
