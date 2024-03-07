import {
  Avatar,
  Box,
  Button,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import ProfilAvatar from "components/ProfilAvatar";
import React from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "utils";

const FrendsRequest = ({ friendRequest, refreshFriendRequest, token }) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const dSize = 16;
  // accept/deny frends
  const acceptFriendRequest = async (id, status) => {
    try {
      const res = await apiRequest({
        url: "/users/accept-request",
        token: token,
        method: "POST",
        data: { rid: id, status },
      });
      refreshFriendRequest(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        padding: "1.5rem 0.5rem",
        minWidth: "25vw",
      }}
    >
      <Typography color={dark}>Frends Requests</Typography>
      <Divider sx={{ mb: "0.5rem" }} />
      {friendRequest.map((request) => (
        <FlexBetween key={request?.requestFrom?._id} m="0.5rem 0">
          <FlexBetween gap={"0.5rem"}>
            <ProfilAvatar
              profilName={`${request?.requestFrom?.firstName} ${request?.requestFrom?.lastName}`}
              profilImg={request?.requestFrom?.profileUrl}
              profilSize={32}
            />
            <Box
              onClick={() => {
                navigate(`/profile/${request?.requestFrom?._id}`);
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
                {`${request?.requestFrom?.firstName} ${request?.requestFrom?.lastName}`}
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
                {request?.requestFrom?.isMental && (
                  <Avatar
                    sx={{ width: dSize, height: dSize }}
                    alt="mental"
                    src="/assets/mental.svg"
                  />
                )}
                {request?.requestFrom?.isMotor && (
                  <Avatar
                    sx={{ width: dSize, height: dSize }}
                    alt="motor"
                    src="/assets/motor.svg"
                  />
                )}
                {request?.requestFrom?.isHearing && (
                  <Avatar
                    sx={{ width: dSize, height: dSize }}
                    alt="hearing"
                    src="/assets/hearing.svg"
                  />
                )}
                {request?.requestFrom?.isVisual && (
                  <Avatar
                    sx={{ width: dSize, height: dSize }}
                    alt="visual"
                    src="/assets/visual.svg"
                  />
                )}
                {request?.requestFrom?.isPsychological && (
                  <Avatar
                    sx={{ width: dSize, height: dSize }}
                    alt="psychological"
                    src="/assets/psychological.svg"
                  />
                )}
              </Box>
            </Box>
          </FlexBetween>
          <Box
            gap="0.5rem"
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Button
              onClick={() => {
                acceptFriendRequest(request?._id, "Accepted");
              }}
              color="success"
              sx={{
                minHeight: 0,
                minWidth: 0,
                padding: 0,
              }}
            >
              Accet
            </Button>
            <Button
              onClick={() => {
                acceptFriendRequest(request?.requestFrom?._id, "Denied");
              }}
              color="error"
              sx={{
                minHeight: 0,
                minWidth: 0,
                padding: 0,
              }}
            >
              Deny
            </Button>
          </Box>
        </FlexBetween>
      ))}
    </Box>
  );
};

export default FrendsRequest;
