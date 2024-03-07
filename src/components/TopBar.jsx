import {
  IconButton,
  InputBase,
  Typography,
  useTheme,
  useMediaQuery,
  Tooltip,
  Snackbar,
  CircularProgress,
  Menu,
  Badge,
} from "@mui/material";
import {
  Search,
  MarkUnreadChatAlt,
  DarkMode,
  LightMode,
  Notifications,
  PeopleAlt,
  WheelchairPickup,
  Tune,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMode } from "tmkredux/modeSlice";
import FlexBetween from "./FlexBetween";
import DropdownAvatar from "./DropdownAvatar";
import { apiRequest, fetchTamkeens } from "utils";
import { useEffect, useState } from "react";
import FrendsRequest from "./widgets/FrendsRequest";
const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const is850 = useMediaQuery("(min-width:850px)");
  const isSmallMobileScreens = useMediaQuery("(max-width:450px)");
  const isMobileScreens = useMediaQuery("(max-width:800px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;

  const alt = theme.palette.background.alt;
  const [friendRequest, setFriendRequest] = useState([]);
  const { user, token } = useSelector((state) => state.user);
  const fullName = `${user.firstName} ${user.lastName}`;
  const [anchorEl, setAnchorEl] = useState(null);
  const openFrends = Boolean(anchorEl);
  const [openToast, setOpenToast] = useState(false);
  // Toast
  const handleOpenToast = () => {
    setOpenToast(true);
  };
  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast(false);
  };
  // menu frends
  const handleFrendsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFrendsClose = () => {
    setAnchorEl(null);
  };
  //
  const updateTamkeens = async () => {
    handleOpenToast();
    await fetchTamkeens(token, dispatch);
    handleCloseToast();
  };
  const refreshFriendRequest = (id) => {
    setFriendRequest(
      friendRequest.filter((req) => {
        return req._id !== id;
      })
    );
  };
  // get frends request
  const getFriendRequest = async () => {
    try {
      const res = await apiRequest({
        url: "/users/get-friend-request",
        token: token,
        method: "GET",
      });
      setFriendRequest(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect
  useEffect(() => {
    getFriendRequest();
  }, []);
  return (
    <>
      <FlexBetween
        padding={isNonMobileScreens ? "0.75rem 4%" : "0.75rem 2%"}
        backgroundColor={alt}
        sx={{ boxShadow: 3 }}
      >
        <FlexBetween gap="1.75rem">
          <Typography
            fontWeight="bold"
            fontSize={
              isNonMobileScreens
                ? "2.25rem"
                : !isMobileScreens
                ? "2rem"
                : isSmallMobileScreens
                ? "1.5rem"
                : "1.75rem"
            }
            color={theme.palette.primary.baseBlue}
            onClick={() => {
              navigate("/");
              updateTamkeens();
            }}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Tamkeen
          </Typography>
          {is850 && (
            <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="9px"
              padding="0.1rem 1.5rem"
            >
              <InputBase sx={{ width: "100%" }} placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
              <IconButton>
                <Tune />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>

        <FlexBetween gap={isSmallMobileScreens ? "0.5rem" : "1rem"}>
          {!isMobileScreens && (
            <Tooltip title="AI assistant">
              <IconButton
                onClick={() => {
                  navigate("/assistant");
                }}
              >
                <WheelchairPickup
                  sx={{
                    color: dark,
                    fontSize: isNonMobileScreens ? "30px" : "25px",
                  }}
                />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Switch mode">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode
                  sx={{
                    color: dark,
                    fontSize: isNonMobileScreens ? "30px" : "25px",
                  }}
                />
              ) : (
                <LightMode
                  sx={{
                    color: dark,
                    fontSize: isNonMobileScreens ? "30px" : "25px",
                  }}
                />
              )}
            </IconButton>
          </Tooltip>
          {!isMobileScreens && (
            <Tooltip title="Messages">
              <IconButton>
                <MarkUnreadChatAlt
                  sx={{
                    color: dark,
                    fontSize: isNonMobileScreens ? "30px" : "25px",
                  }}
                />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Notifications">
            <IconButton>
              <Notifications
                sx={{
                  color: dark,
                  fontSize: isNonMobileScreens ? "30px" : "25px",
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Frends">
            <IconButton
              onClick={(e) => {
                console.log(friendRequest);
                friendRequest?.length > 0 && handleFrendsClick(e);
              }}
              aria-controls={openFrends ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openFrends ? "true" : undefined}
            >
              <Badge badgeContent={friendRequest?.length} max={9} color="error">
                <PeopleAlt
                  sx={{
                    color: dark,
                    fontSize: isNonMobileScreens ? "30px" : "25px",
                  }}
                />
              </Badge>
            </IconButton>
          </Tooltip>
          <DropdownAvatar profilName={fullName} profilImg={user?.profileUrl} />
        </FlexBetween>
      </FlexBetween>
      <Snackbar
        sx={{ mt: "15rem" }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openToast}
        onClose={handleCloseToast}
      >
        <CircularProgress color="primary" />
      </Snackbar>
      {/* frends requst */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openFrends}
        onClose={handleFrendsClose}
        onClick={handleFrendsClose}
        sx={{
          "& .MuiMenu-paper": { backgroundColor: theme.palette.background.alt },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <FrendsRequest
          friendRequest={friendRequest}
          refreshFriendRequest={refreshFriendRequest}
          token={token}
        />
      </Menu>
    </>
  );
};

export default TopBar;
