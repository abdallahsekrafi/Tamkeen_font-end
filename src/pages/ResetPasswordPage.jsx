import { Box, useMediaQuery, useTheme } from "@mui/material";
import ResetPasswordForm from "components/ResetPasswordForm";
import LogoSlogon from "components/widgets/LogoSlogon";
import React from "react";

const ResetPasswordPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1150px)");
  return (
    <>
      <Box
        width={isNonMobileScreens ? "80%" : "93%"}
        height={isNonMobileScreens ? "80%" : "100%"}
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
          <ResetPasswordForm />
        </Box>
      </Box>
    </>
  );
};

export default ResetPasswordPage;
