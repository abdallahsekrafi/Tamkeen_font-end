import { Box, useMediaQuery, useTheme } from "@mui/material";
import FormLogin from "components/LoginForm";
import LogoSlogon from "components/widgets/LogoSlogon";
import React from "react";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <>
      <Box
        width={isNonMobileScreens ? "80%" : "93%"}
        // height={isNonMobileScreens ? "80%" : "100%"}
        height="auto"
        m="2rem auto"
        alignItems="center"
        justifyContent="center"
        display="flex"
        textAlign="center"
        flexDirection={isNonMobileScreens ? "row" : "column"}
      >
        <LogoSlogon />
        <Box
          width={isNonMobileScreens ? "50%" : "100%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
          sx={{ boxShadow: 3 }}
        >
          <FormLogin />
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
