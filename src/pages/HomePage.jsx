import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TopBar from "components/TopBar";
import React, { useEffect, useState } from "react";
import FilterPage from "./FilterPage";
import LeftMenu from "./LeftMenu";
import BottomBar from "components/BottomBar";

import { Search } from "@mui/icons-material";
import NewTamkeenDialog from "components/widgets/NewTamkeenDialog";
import AdvertWidget from "components/widgets/AdvertWidget";
import PostsWidget from "components/widgets/PostsWidget";
import FlexBetween from "components/FlexBetween";
import { useSelector } from "react-redux";
import { apiRequest, sendFrendsRequest } from "utils";
import FrendsSuggest from "components/widgets/FrendsSuggest";
import ProfilAvatar from "components/ProfilAvatar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  //
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // filter
  const [isAccessibility, setIsAccessibility] = useState("");
  const [isGivingHelp, setIsGivingHelp] = useState("");
  const [isMental, setIsMental] = useState(false);
  const [isMotor, setIsMotor] = useState(false);
  const [isHearing, setIsHearing] = useState(false);
  const [isVisual, setIsVisual] = useState(false);
  const [isPsychological, setIsPsychological] = useState(false);
  // reponsive
  const isNonMobileScreens = useMediaQuery("(min-width:1150px)");
  const isSmallMobileScreens = useMediaQuery("(mi-width:450px)");
  const isMobileScreens = useMediaQuery("(max-width:800px)");
  // theme
  const theme = useTheme();
  const dSize = 16;
  // state
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  // handle filter
  const handleAccessibility = (value) => {
    setIsAccessibility(value);
  };

  const handleGivingHelp = (value) => {
    setIsGivingHelp(value);
  };
  const handleMental = () => {
    setIsMental((prev) => !prev);
  };
  const handleMotor = () => {
    setIsMotor((prev) => !prev);
  };
  const handleHearing = () => {
    setIsHearing((prev) => !prev);
  };
  const handleVisual = () => {
    setIsVisual((prev) => !prev);
  };
  const handlePsychological = () => {
    setIsPsychological((prev) => !prev);
  };

  //
  const refreshSuggestedFriends = (id) => {
    setSuggestedFriends(
      suggestedFriends.filter((frend) => {
        return frend._id !== id;
      })
    );
  };

  const getSuggestedFriends = async () => {
    try {
      const res = await apiRequest({
        url: "/users/suggested-friends",
        token: token,
        method: "GET",
      });
      setSuggestedFriends(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  // send frends request
  const handleFriendRequest = async (id) => {
    try {
      const res = await sendFrendsRequest(id, token);
      refreshSuggestedFriends(id);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect
  useEffect(() => {
    // getFriendRequest();
    getSuggestedFriends();
  }, []);
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
            {/* "29%" : "39%"  */}
            <FlexBetween
              backgroundColor={theme.palette.background.alt}
              borderRadius="9px"
              padding="0.1rem 1.5rem"
              mb="0.5rem"
              sx={{ boxShadow: 3 }}
            >
              <InputBase sx={{ width: "100%" }} placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>

            <Box mb="0.5rem">
              <FilterPage
                handleMental={handleMental}
                handleMotor={handleMotor}
                handleHearing={handleHearing}
                handleVisual={handleVisual}
                handlePsychological={handlePsychological}
              />
            </Box>

            <Box>
              <LeftMenu
                handleAccessibility={handleAccessibility}
                handleGivingHelp={handleGivingHelp}
              />
            </Box>
          </Box>
        )}
        {/* CENTER SIDE 47% 45 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            overflowX: "hidden",
            height: "100vh",
            "::-webkit-scrollbar": {
              display: "none",
            },
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
          {/* new tamkeen */}
          <NewTamkeenDialog />
          {/* frend suggeste in small screen */}
          {!isNonMobileScreens && suggestedFriends?.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100vw",
                whiteSpace: "nowrap",
                minHeight: "7rem",
                overflowY: "hidden",
                overflowX: "auto",
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {suggestedFriends?.map((frend) => (
                <Box
                  key={frend?._id}
                  m="0.5rem"
                  sx={{
                    padding: "0.5rem",
                    backgroundColor: theme.palette.background.alt,
                    borderRadius: "0.75rem",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 3,
                  }}
                >
                  <Box
                    gap={"0.5rem"}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      alignContent: "center",
                      flexGrow: 1,
                    }}
                  >
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
                        color={theme.palette.neutral.main}
                        sx={{
                          "&:hover": {
                            color: theme.palette.primary.dark,
                            cursor: "pointer",
                          },
                          flexGrow: 1,
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
                  </Box>
                  <Button
                    sx={{
                      color: theme.palette.primary.baseBlue,
                      minHeight: 0,
                      minWidth: 0,
                      padding: 0,
                      mt: "0.5rem",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                    onClick={() => handleFriendRequest(frend?._id)}
                  >
                    Add frend
                  </Button>
                </Box>
              ))}
            </Box>
          )}
          {/* tamkeens list */}
          <PostsWidget
            isAccessibility={isAccessibility}
            isGivingHelp={isGivingHelp}
            isMental={isMental}
            isMotor={isMotor}
            isHearing={isHearing}
            isVisual={isVisual}
            isPsychological={isPsychological}
          />
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
            <AdvertWidget />

            {/* suggested Friends */}
            {suggestedFriends?.length > 0 && (
              <FrendsSuggest
                suggestedFriends={suggestedFriends}
                refreshSuggestedFriends={refreshSuggestedFriends}
                token={token}
              />
            )}
          </Box>
        )}
      </Box>
      {isMobileScreens && (
        <BottomBar
          handleMental={handleMental}
          handleMotor={handleMotor}
          handleHearing={handleHearing}
          handleVisual={handleVisual}
          handlePsychological={handlePsychological}
          handleAccessibility={handleAccessibility}
          handleGivingHelp={handleGivingHelp}
        />
      )}
    </Box>
  );
};

export default HomePage;
