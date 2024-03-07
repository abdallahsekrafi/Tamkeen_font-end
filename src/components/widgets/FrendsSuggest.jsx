import { PersonAdd } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import ProfilAvatar from "components/ProfilAvatar";
import WidgetWrapper from "components/WidgetWrapper";
import React from "react";
import { useNavigate } from "react-router-dom";
import { sendFrendsRequest } from "utils";

const FrendsSuggest = ({
  suggestedFriends,
  refreshSuggestedFriends,
  token,
}) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const dSize = 16;

  // send frends request
  const handleFriendRequest = async (id) => {
    try {
      const res = await sendFrendsRequest(id, token);
      refreshSuggestedFriends(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WidgetWrapper sx={{ boxShadow: 3 }}>
      <Typography color={dark}>Suggested Frends</Typography>
      <Divider sx={{ mb: "0.5rem" }} />
      {suggestedFriends.map((frend) => (
        <FlexBetween key={frend?._id} m="0.5rem 0">
          <FlexBetween gap={"0.5rem"}>
            <ProfilAvatar
              profilName={`${frend?.firstName} ${frend?.lastName}`}
              profilImg={frend?.profileUrl}
              profilSize={32}
            />
            <Box
              onClick={() => {
                navigate(`/profile/${frend?._id}`);
              }}
            >
              <Typography
                color={main}
                sx={{
                  "&:hover": {
                    color: palette.primary.dark,
                    cursor: "pointer",
                  },
                }}
              >
                {`${frend?.firstName} ${frend?.lastName}`}
              </Typography>
              <Box
                gap="0.25rem"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                {frend?.isMental && (
                  <Avatar
                    sx={{ width: dSize, height: dSize }}
                    alt="mental"
                    src="/assets/mental.svg"
                  />
                )}
                {frend?.isMotor && (
                  <Avatar
                    sx={{ width: dSize, height: dSize }}
                    alt="motor"
                    src="/assets/motor.svg"
                  />
                )}
                {frend?.isHearing && (
                  <Avatar
                    sx={{ width: dSize, height: dSize }}
                    alt="hearing"
                    src="/assets/hearing.svg"
                  />
                )}
                {frend?.isVisual && (
                  <Avatar
                    sx={{ width: dSize, height: dSize }}
                    alt="visual"
                    src="/assets/visual.svg"
                  />
                )}
                {frend?.isPsychological && (
                  <Avatar
                    sx={{ width: dSize, height: dSize }}
                    alt="psychological"
                    src="/assets/psychological.svg"
                  />
                )}
              </Box>
            </Box>
          </FlexBetween>
          <IconButton onClick={() => handleFriendRequest(frend?._id)}>
            <PersonAdd
              sx={{
                color: palette.primary.baseBlue,
              }}
            />
          </IconButton>
        </FlexBetween>
      ))}
    </WidgetWrapper>
  );
};

export default FrendsSuggest;
