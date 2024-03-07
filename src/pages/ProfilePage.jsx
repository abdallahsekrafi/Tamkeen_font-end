import { Home } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";

import React from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Typography
        fontWeight="bold"
        width="100%"
        textAlign="center"
        fontSize={"16px"}
        color={dark}
      >
        Comming soon !!
      </Typography>

      <Typography
        fontWeight="bold"
        width="100%"
        textAlign="center"
        fontSize={"16px"}
        color={palette.primary.baseBlue}
      >
        شاركهم ما تملك ... مكنهم من حياة أفضل
      </Typography>
      <Box
        onClick={() => {
          navigate("/");
          navigate(0);
        }}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.75rem",
          cursor: "pointer",
        }}
      >
        <Home sx={{ color: palette.primary.baseBlue }} />
        <Typography
          fontWeight="bold"
          width="100%"
          textAlign="center"
          fontSize={"16px"}
          color={dark}
        >
          Back to home
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfilePage;
