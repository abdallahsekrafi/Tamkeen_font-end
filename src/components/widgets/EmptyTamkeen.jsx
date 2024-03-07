import React from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { slogon } from "utils/slogon";

const EmptyTamkeen = () => {
  const { palette } = useTheme();

  const isSmallMobileScreens = useMediaQuery("(max-width:450px)");

  return (
    <Typography
      mt="2rem"
      fontWeight="bold"
      width="100%"
      textAlign="center"
      fontSize={isSmallMobileScreens ? "12px" : "18px"}
      color={palette.primary.baseBlue}
    >
      {slogon}
    </Typography>
  );
};

export default EmptyTamkeen;
