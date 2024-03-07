import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import React from "react";

const AdvertWidget = ({ imageUrl }) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper sx={{ boxShadow: 3 }}>
      <FlexBetween>
        <Typography color={dark}>Sponsored</Typography>
        {/* <Typography color={medium}>Create Ad</Typography> */}
      </FlexBetween>
      <a
        href="https://www.bbc.com/news/business-35427933"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          width="100%"
          height="auto"
          alt="advert"
          src={imageUrl || "/myo.png"}
          style={{
            borderRadius: "0.75rem",
            margin: "0.75rem 0",
            maxHeight: "8rem",
            objectFit: "fill",
          }}
        />
      </a>
      <FlexBetween>
        <Typography color={main}>Ontario-based Thalmic Labs</Typography>
        <Typography color={medium}>Myo</Typography>
      </FlexBetween>
      {/* <Typography color={medium} m="0.5rem 0">
        The Myo enables a person to control computer devices by reading the
        electricity produced by their skeletal muscles and then ...
      </Typography> */}
    </WidgetWrapper>
  );
};

export default AdvertWidget;
