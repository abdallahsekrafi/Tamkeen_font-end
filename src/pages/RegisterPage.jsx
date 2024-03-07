import { Box, useMediaQuery, useTheme } from "@mui/material";
import RegisterForm from "components/RegisterForm";
import LogoSlogon from "components/widgets/LogoSlogon";
import React from "react";
const RegisterPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1150px)");
  return (
    <>
      <Box
        width={isNonMobileScreens ? "80%" : "93%"}
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
          height="100%"
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
          sx={{ boxShadow: 3 }}
        >
          <RegisterForm />
        </Box>
      </Box>
    </>
  );
};

export default RegisterPage;
