import { Box, Divider, Typography, useTheme } from "@mui/material";
import ProfilAvatar from "components/ProfilAvatar";
import WidgetWrapper from "components/WidgetWrapper";
import moment from "moment";
import React from "react";

const AiChatWidget = ({ aiChat, user }) => {
  // theme
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  return (
    <WidgetWrapper
      m="0 0.25rem 0.1rem 0.1rem"
      sx={{
        display: "flex",
        flexDirection: "column",
        p: "1rem ",
        boxShadow: 3,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}>
        {aiChat.role === "user" ? (
          <ProfilAvatar
            profilName={`${user?.firstName} ${user?.lastName}`}
            profilImg={user?.profileUrl}
            profilSize={32}
          />
        ) : (
          <ProfilAvatar
            profilName="Tamkeen Assistant"
            profilImg="/tamkeen.png"
            profilSize={32}
          />
        )}

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            // sx={{
            //   "&:hover": {
            //     color: palette.primary.light,
            //     cursor: "pointer",
            //   },
            // }}
          >
            {aiChat.role === "user"
              ? `${user?.firstName} ${user?.lastName}`
              : "Tamkeen Assistant"}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {moment(aiChat?.createdAt).fromNow()}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          ml: "2.75rem",
          display: "flex",
          flexDirection: "row",
          gap: "0.25rem",
        }}
      >
        <Divider orientation="vertical" flexItem />
        <Typography color={main}>{aiChat?.content}</Typography>
      </Box>
    </WidgetWrapper>
  );
};

export default AiChatWidget;
