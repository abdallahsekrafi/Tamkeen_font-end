import { Add, Delete } from "@mui/icons-material";
import { Box, Button, Divider, useMediaQuery, useTheme } from "@mui/material";
import BottomBar from "components/BottomBar";
import TopBar from "components/TopBar";
import AdvertWidget from "components/widgets/AdvertWidget";
import AiChatsWidget from "components/widgets/AiChatsWidget";
import React from "react";

const AiAssistant = () => {
  // reponsive
  const isNonMobileScreens = useMediaQuery("(min-width:1150px)");
  const isSmallMobileScreens = useMediaQuery("(mi-width:450px)");
  const isMobileScreens = useMediaQuery("(max-width:800px)");
  // theme
  const theme = useTheme();

  return (
    <Box>
      <TopBar />
      <Box
        width="100%"
        padding={!isMobileScreens ? "2rem 1% 0 1%" : "1rem 0 3rem 0"}
        display="flex"
        gap="0.5rem"
        justifyContent="space-between"
      >
        {/* LEFT SIDE */}
        {!isMobileScreens && (
          <Box flexBasis={isNonMobileScreens ? "30%" : "40%"}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "50%",
                padding: "1.5rem 0.75rem 1.5rem 0.75rem",
                backgroundColor: theme.palette.background.alt,
                borderRadius: "0.75rem",
                boxShadow: 3,
                mb: "0.5rem",
              }}
            >
              <Button
                sx={{
                  fontSize: "0.75rem",
                  mb: "1rem",
                  color: theme.palette.neutral.dark,
                  "&:hover": {
                    color: theme.palette.primary.main,
                    backgroundColor: theme.palette.primary.baseBlue,
                  },
                  boxShadow: 3,
                  backgroundColor: theme.palette.primary.baseBlue,
                }}
                variant="contained"
                startIcon={<Add sx={{ color: theme.palette.neutral.dark }} />}
              >
                Create new assistance
              </Button>

              <Divider>ASSISTANCE HISTORY</Divider>
              <Box sx={{ flexGrow: 1 }}></Box>
              <Button
                sx={{
                  fontSize: "0.75rem",
                  color: theme.palette.neutral.dark,
                  "&:hover": {
                    color: theme.palette.primary.main,
                    backgroundColor: "#ff7961",
                  },
                  boxShadow: 3,
                  backgroundColor: "#ff7961",
                }}
                variant="contained"
                startIcon={
                  <Delete sx={{ color: theme.palette.neutral.dark }} />
                }
              >
                Clear all assistance
              </Button>
            </Box>
          </Box>
        )}
        {/* CENTER SIDE 47% 45 */}
        <Box
          // height: "60vh",
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          }}
          flexBasis={
            isNonMobileScreens
              ? "45%"
              : isMobileScreens
              ? "99%"
              : !isSmallMobileScreens
              ? "57%"
              : "100%"
          }
        >
          {/* chat list */}
          <AiChatsWidget />
        </Box>
        {/* RIGHT SIDE 20 --> 22% */}
        {isNonMobileScreens && (
          <Box
            flexBasis="22%"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <AdvertWidget imageUrl={"/ai-accessibility.jpg"} />
          </Box>
        )}
      </Box>
      {isMobileScreens && <BottomBar />}
    </Box>
  );
};

export default AiAssistant;
