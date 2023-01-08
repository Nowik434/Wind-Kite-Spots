import React, { useEffect } from "react";
import Slider from "@mui/material/Slider";
import { useSelector } from "react-redux";

const marks = [
  {
    value: 0,
    label: "100 km",
  },
  {
    value: 30,
    label: "200 km",
  },
  {
    value: 60,
    label: "400 km",
  },
  {
    value: 90,
    label: "800 km",
  },
];

function valuetext(value) {
  return `${value} km`;
}

export default function RangeSlider({ setFiltered, displaySelected }) {
  const spots = useSelector((state) => state.spots);
  const [value, setValue] = React.useState();
  // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  Math.radians = function (degrees) {
    return degrees * (Math.PI / 180);
  };

  Math.degrees = function (radians) {
    return radians * (180 / Math.PI);
  };

  const earthRadius = 6371;

  function rangeFilter(lat, lng, distance) {
    const lat1 = Math.radians(lat);
    const lng1 = Math.radians(lng);
    // Formuła Havestina
    const filteredSpots = spots.filter((spot) => {
      const lat2 = Math.radians(spot.attributes.latitude);
      const lng2 = Math.radians(spot.attributes.longitude);
      const dLat = lat2 - lat1;
      const dLng = lng2 - lng1;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) *
          Math.cos(lat2) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = earthRadius * c;
      return d <= distance;
    });

    return filteredSpots;
  }

  console.log(valuetext);
  useEffect(() => {
    console.log(rangeFilter(51.2465, 22.5684, value));
    setFiltered(rangeFilter(51.2465, 22.5684, value));
  }, [value]);

  const handleChange = (value) => {
    switch (value) {
      case 0:
        setValue(100);
        break;
      case 30:
        setValue(200);
        break;
      case 60:
        setValue(400);
        break;
      case 90:
        setValue(800);
        break;
      default:
        return value;
    }
  };
  console.log(value);

  // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  return (
    <Slider
      aria-label="Temperature"
      defaultValue={30}
      getAriaValueText={valuetext}
      //   valueLabelDisplay="auto"
      value={value}
      step={30}
      min={0}
      max={90}
      marks={marks}
      sx={{
        display: displaySelected === "nerby" ? "flex" : "none",
        width: "200px",
        margin: "35px auto 0px",
      }}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}
