import * as React from "react";
import ProfilAvatar from "./ProfilAvatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "tmkredux/userSlice";

import { useState } from "react";
import { Delete, Edit, Image, Logout } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  CircularProgress,
  Dialog,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { handleFileUpload, updateUserProfileImg } from "utils";
import { LoadingButton } from "@mui/lab";
import { clearPosts } from "tmkredux/postSlice";

const DropdownAvatar = ({ profilName, profilImg }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const alt = theme.palette.background.alt;
  const dark = theme.palette.neutral.dark;
  const mediumMain = theme.palette.neutral.mediumMain;
  const { user, token } = useSelector((state) => state.user);
  const [profileImg, setProfileImg] = useState(null);
  //
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const isFullDialog = useMediaQuery("(max-width:500px)");
  const isSmallMobileScreens = useMediaQuery("(max-width:450px)");

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Dialog
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setProfileImg(null);
  };
  const handleUpdateUserAvatar = async () => {
    setIsSubmitting(true);
    try {
      const profileUrl = profileImg && (await handleFileUpload(profileImg));
      profileUrl && (await updateUserProfileImg(profileUrl, token, dispatch));
      setIsSubmitting(false);
      handleClose();
    } catch (error) {
      setIsSubmitting(false);
      setProfileImg(null);
      console.log(error);
    }
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton sx={{ p: 0 }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Tooltip title="Edit profile image">
              <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                <Avatar
                  sx={{ width: 22, height: 22, border: `2px solid ${alt}` }}
                >
                  <Edit sx={{ fontSize: "15px", color: dark }} />
                </Avatar>
              </IconButton>
            </Tooltip>
          }
        >
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <ProfilAvatar profilName={profilName} profilImg={profilImg} />
            </IconButton>
          </Tooltip>
        </Badge>
      </IconButton>

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          onClick={() => {
            navigate(`/profile/${user._id}`);
            navigate(0);
            handleCloseUserMenu();
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          sx={{ gap: "0.25rem" }}
          onClick={() => {
            dispatch(logout());
            dispatch(clearPosts());
            handleCloseUserMenu();
          }}
        >
          <Logout />
          Log Out
        </MenuItem>
      </Menu>

      <Dialog
        fullScreen={isFullDialog ? true : false}
        open={open}
        onClose={handleClose}
      >
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: theme.palette.background.alt,
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{
                ml: 2,
                flex: 1,
              }}
              variant="h6"
              component="div"
            >
              Update profile avatar
            </Typography>

            <LoadingButton
              disabled={!profileImg}
              variant="outlined"
              onClick={handleUpdateUserAvatar}
              loading={isSubmitting}
              loadingPosition="start"
              loadingIndicator={
                <CircularProgress
                  color="info"
                  size={isSmallMobileScreens ? 24 : 32}
                />
              }
              sx={{
                fontWeight: "bold",
                fontSize: "1rem",
                color: theme.palette.primary.baseBlue,
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              Save
            </LoadingButton>
          </Toolbar>
        </AppBar>

        <Box padding="0.5rem">
          <label htmlFor="uploadImg">
            <Box
              gap="0.25rem"
              sx={{
                height: "5rem",
                display: profileImg ? "none" : "flex",
                border: "dashed 0.2rem",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Image color="success" />
              <Typography
                fontSize={isSmallMobileScreens && "0.7rem"}
                color={mediumMain}
              >
                Add Image
              </Typography>
            </Box>
            <input
              type="file"
              onChange={(e) => {
                setProfileImg(e.target.files[0]);
              }}
              id="uploadImg"
              accept=".jpg, .jpeg, .png"
              size="5120"
              hidden
            />
          </label>
          {profileImg && (
            <Box sx={{ position: "relative" }}>
              <IconButton
                sx={{
                  color: "red",
                  position: "absolute",
                  right: "1rem",
                  top: "0.5rem",
                  cursor: "pointer",
                }}
                onClick={() => setProfileImg(null)}
                aria-label="close"
              >
                <Delete />
              </IconButton>

              <img
                style={{
                  display: "block",
                  maxWidth: "20rem",
                  maxHeight: "20rem",
                  borderRadius: "0.5rem",
                  objectFit: "fill",
                }}
                src={URL.createObjectURL(profileImg)}
                alt="tamkeen"
              />
            </Box>
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default DropdownAvatar;
