import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { slogon } from "utils/slogon";

const LogoSlogon = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isMobileScreens = useMediaQuery("(max-width:650px)");
  return (
    <Box
      width={isNonMobileScreens ? "50%" : "100%"}
      // backgroundColor="red"
      p="1rem 6%"
      alignItems="center"
      justifyContent="center"
    >
      <img
        width={
          isNonMobileScreens ? "190px" : !isMobileScreens ? "120px" : "70px"
        }
        height={
          isNonMobileScreens ? "190px" : !isMobileScreens ? "120px" : "70px"
        }
        src="/tamkeen.png"
        alt="Tamkeen is a social app where users can share reviews about the accessibility of public places like restaurants, stores, parks, etc. Integrate filters specific to disability types so everyone can find information tailored to their needs"
      />
      <Typography
        fontWeight="bold"
        fontSize={
          isNonMobileScreens ? "32px" : !isMobileScreens ? "24px" : "16px"
        }
        color={theme.palette.primary.baseBlue}
      >
        {slogon}
      </Typography>
    </Box>
  );
};

export default LogoSlogon;
