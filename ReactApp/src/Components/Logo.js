import React from "react";
import { styled } from "@mui/material/styles";
import logo from "../assets/logo.png";

export const Logo = ({ size }) => {
  const CustomizedLogo = styled("div")`
    width: 100%;
    height: ${size}px;

    background: url(${logo});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;

    flex: none;
    order: 0;
    flex-grow: 0;
    :hover {
      color: #2e8b57;
    }
  `;

  return <CustomizedLogo />;
};
