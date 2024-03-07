import React, { useState } from "react";

import {
  Accessibility,
  EventAvailable,
  Image,
  MonetizationOn,
  Videocam,
  Public,
  Delete,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Divider,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
  AppBar,
  Avatar,
  Box,
  Checkbox,
  Dialog,
  IconButton,
  Toolbar,
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

import FlexBetween from "components/FlexBetween";
import ProfilAvatar from "components/ProfilAvatar";
import WidgetWrapper from "components/WidgetWrapper";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { apiRequest, fetchTamkeens, handleFileUpload } from "utils";

const NewTamkeen = () => {
  const { palette } = useTheme();
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const isSmallMobileScreens = useMediaQuery("(max-width:450px)");
  const isFullDialog = useMediaQuery("(max-width:500px)");
  const dSize = isSmallMobileScreens ? 24 : 32;
  const hSize = 18;
  //
  const tamkeenWelcom = "What is your Tamkeen for today";
  //
  const { user, token } = useSelector((state) => state.user);
  const fullName = `${user.firstName} ${user.lastName}`;
  const dispatch = useDispatch();
  //
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  //
  const [openToast, setOpenToast] = useState(false);
  const [toastStatus, setToastStatus] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  //
  const [uploadedImg, setUploadedImg] = useState(null);

  const [isAccessibility, setIsAccessibility] = useState(false);
  const [isGivingHelp, setIsGivingHelp] = useState(true);
  const [description, setDescription] = useState("");
  const [disabilityCount, setDisabilityCount] = useState(5);
  const [isMental, setIsMental] = useState(true);
  const [isMotor, setIsMotor] = useState(true);
  const [isHearing, setIsHearing] = useState(true);
  const [isVisual, setIsVisual] = useState(true);
  const [isPsychological, setIsPsychological] = useState(true);

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
  // Dialog
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetDialog();
  };
  const resetDialog = () => {
    setIsSubmitting(false);
    setUploadedImg(null);
    setDescription("");
    setDisabilityCount(5);
    setIsAccessibility(false);
    setIsGivingHelp(true);
    setIsMental(true);
    setIsMotor(true);
    setIsHearing(true);
    setIsVisual(true);
    setIsPsychological(true);
  };
  const updateTamkeens = async () => {
    await fetchTamkeens(token, dispatch);
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const newTamkeen = {
        description,
        isAccessibility,
        isGivingHelp,
        isMental,
        isMotor,
        isHearing,
        isVisual,
        isPsychological,
      };
      const imageURL = uploadedImg && (await handleFileUpload(uploadedImg));
      imageURL && (newTamkeen.image = imageURL);
      const res = await apiRequest({
        url: "/posts/create-post",
        token: token,
        data: newTamkeen,
        method: "POST",
      });
      if (res?.sucess) {
        setSuccessMsg(res?.message);
        setToastStatus("success");
        handleOpenToast();
        handleClose();
        updateTamkeens();
      } else {
        setSuccessMsg(res?.message);
        setToastStatus("error");
        handleOpenToast();
      }
      setIsSubmitting(false);
    } catch (error) {
      setSuccessMsg(error?.message);
      setToastStatus("error");
      handleOpenToast();
      setIsSubmitting(false);
      console.log(error);
    }
  };
  //
  return (
    <>
      <WidgetWrapper
        m={!isSmallMobileScreens ? "0.1rem" : "0.1rem 0"}
        sx={{ boxShadow: 3 }}
      >
        <FlexBetween gap={isSmallMobileScreens ? "1rem" : "1.5rem"}>
          <ProfilAvatar profilName={fullName} profilImg={user?.profileUrl} />
          <Box onClick={handleOpen} sx={{ width: "100%" }}>
            <Typography
              fontSize={isSmallMobileScreens ? "0.8rem" : "1rem"}
              width="100%"
              color={palette.primary.baseBlue}
              padding="1rem 2rem"
              borderRadius="2rem"
              sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                ":hover": { cursor: "pointer", color: medium },
              }}
            >
              {tamkeenWelcom}
            </Typography>
          </Box>
        </FlexBetween>

        <Divider sx={{ margin: "1.25rem 0" }} />

        <FlexBetween>
          <FlexBetween
            gap="0.25rem"
            onClick={handleOpen}
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            <Image color="success" />
            <Typography
              fontSize={isSmallMobileScreens && "0.7rem"}
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </FlexBetween>

          <FlexBetween
            gap="0.25rem"
            onClick={handleOpen}
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            <Videocam color="error" />
            <Typography
              fontSize={isSmallMobileScreens && "0.7rem"}
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Live
            </Typography>
          </FlexBetween>

          <FlexBetween
            gap="0.25rem"
            onClick={handleOpen}
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            <MonetizationOn color="warning" />
            <Typography
              fontSize={isSmallMobileScreens && "0.7rem"}
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Donate
            </Typography>
          </FlexBetween>

          <FlexBetween
            gap="0.25rem"
            onClick={handleOpen}
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            <EventAvailable sx={{ color: palette.primary.purple }} />
            <Typography
              fontSize={isSmallMobileScreens && "0.7rem"}
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Event
            </Typography>
          </FlexBetween>

          <FlexBetween
            gap="0.25rem"
            onClick={() => {
              setIsAccessibility(true);
              handleOpen();
            }}
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            <Accessibility color="primary" />
            <Typography
              fontSize={isSmallMobileScreens && "0.7rem"}
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Accessibility
            </Typography>
          </FlexBetween>
        </FlexBetween>
      </WidgetWrapper>

      <Dialog
        fullScreen={isFullDialog ? true : false}
        fullWidth
        open={open}
        onClose={handleClose}
      >
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: palette.background.alt,
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
                color: disabilityCount === 0 && palette.primary.red,
              }}
              variant="h6"
              component="div"
            >
              {disabilityCount > 0
                ? "New Tamkeen"
                : "Choose at least one disability"}
            </Typography>

            <LoadingButton
              disabled={
                description === "" || disabilityCount === 0 ? true : false
              }
              variant="outlined"
              onClick={handleSubmit}
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
                color: palette.primary.baseBlue,
                "&:hover": {
                  color: palette.primary.main,
                },
              }}
            >
              Share
            </LoadingButton>
          </Toolbar>
        </AppBar>

        <Box padding="0.5rem">
          <FlexBetween>
            <FlexBetween gap={isSmallMobileScreens ? "0.5rem" : "1rem"}>
              <ProfilAvatar
                profilName={fullName}
                profilImg={user?.profileUrl}
              />
              <Box>
                <Typography
                  color={main}
                  variant={isSmallMobileScreens ? "h6" : "h5"}
                  fontWeight="500"
                >
                  {fullName}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Select
                    title="Hepl type"
                    name="isGivingHelp"
                    value={isGivingHelp}
                    onChange={(e) => setIsGivingHelp(e.target.value)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{
                      height: "2rem",
                    }}
                  >
                    <MenuItem value={true}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyItems: "center",
                          gap: "0.25rem",
                        }}
                      >
                        <Avatar
                          sx={{ width: hSize, height: hSize }}
                          alt="giving help"
                          src="/assets/giv_help.svg"
                        />
                        Give help
                      </Box>
                    </MenuItem>
                    <MenuItem value={false}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyItems: "center",
                          gap: "0.25rem",
                        }}
                      >
                        <Avatar
                          sx={{ width: hSize, height: hSize }}
                          alt="asking for help"
                          src="/assets/ask_help.svg"
                        />
                        Ask for help
                      </Box>
                    </MenuItem>
                  </Select>
                  <Select
                    title="Tamkeen type"
                    name="isAccessibility"
                    value={isAccessibility}
                    onChange={(e) => setIsAccessibility(e.target.value)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{
                      height: "2rem",
                    }}
                  >
                    <MenuItem value={false}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyItems: "center",
                          gap: "0.2rem",
                        }}
                      >
                        <Public color="primary" />
                        General
                      </Box>
                    </MenuItem>
                    <MenuItem value={true}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyItems: "center",
                          gap: "0.2rem",
                        }}
                      >
                        <Accessibility color="primary" />
                        Accessibility
                      </Box>
                    </MenuItem>
                  </Select>
                </Box>
              </Box>
            </FlexBetween>

            <Box
              gap={isFullDialog ? "0.3rem" : "0.75rem"}
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Checkbox
                name="isMental"
                sx={{ padding: 0 }}
                checked={isMental}
                icon={
                  <Avatar
                    sx={{ width: dSize, height: dSize }}
                    alt="unmental"
                    src="/assets/unmental.svg"
                  />
                }
                checkedIcon={
                  <Avatar
                    sx={{ width: dSize, height: dSize }}
                    alt="mental"
                    src="/assets/mental.svg"
                  />
                }
                onClick={(e) => {
                  setDisabilityCount((p) => (e.target.checked ? p + 1 : p - 1));
                  setIsMental((v) => !v);
                }}
              />
              <Checkbox
                name="isMotor"
                sx={{ padding: 0 }}
                checked={isMotor}
                icon={
                  <Avatar
                    sx={{ width: dSize, height: dSize }}
                    alt="unmotor"
                    src="/assets/unmotor.svg"
                  />
                }
                checkedIcon={
                  <Avatar
                    sx={{ width: dSize, height: dSize }}
                    alt="motor"
                    src="/assets/motor.svg"
                  />
                }
                onClick={(e) => {
                  setDisabilityCount((p) => (e.target.checked ? p + 1 : p - 1));
                  setIsMotor((v) => !v);
                }}
              />
              <Checkbox
                name="isHearing"
                sx={{ padding: 0 }}
                checked={isHearing}
                icon={
                  <Avatar
                    sx={{ width: dSize, height: dSize }}
                    alt="unhearing"
                    src="/assets/unhearing.svg"
                  />
                }
                checkedIcon={
                  <Avatar
                    sx={{ width: dSize, height: dSize }}
                    alt="hearing"
                    src="/assets/hearing.svg"
                  />
                }
                onClick={(e) => {
                  setDisabilityCount((p) => (e.target.checked ? p + 1 : p - 1));
                  setIsHearing((v) => !v);
                }}
              />
              <Checkbox
                name="isVisual"
                sx={{ padding: 0 }}
                checked={isVisual}
                icon={
                  <Avatar
                    sx={{ width: dSize, height: dSize }}
                    alt="unvisual"
                    src="/assets/unvisual.svg"
                  />
                }
                checkedIcon={
                  <Avatar
                    sx={{ width: dSize, height: dSize }}
                    alt="visual"
                    src="/assets/visual.svg"
                  />
                }
                onClick={(e) => {
                  setDisabilityCount((p) => (e.target.checked ? p + 1 : p - 1));
                  setIsVisual((v) => !v);
                }}
              />
              <Checkbox
                name="isPsychological"
                sx={{ padding: 0 }}
                checked={isPsychological}
                icon={
                  <Avatar
                    sx={{ width: dSize, height: dSize }}
                    alt="unpsychological"
                    src="/assets/unpsychological.svg"
                  />
                }
                checkedIcon={
                  <Avatar
                    sx={{ width: dSize, height: dSize }}
                    alt="psychological"
                    src="/assets/psychological.svg"
                  />
                }
                onClick={(e) => {
                  setDisabilityCount((p) => (e.target.checked ? p + 1 : p - 1));
                  setIsPsychological((v) => !v);
                }}
              />
            </Box>
          </FlexBetween>
          <InputBase
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ width: "100%", padding: "1rem", fontSize: "1rem" }}
            placeholder={tamkeenWelcom}
            multiline
          />
          <label htmlFor="uploadImg">
            <Box
              gap="0.25rem"
              sx={{
                height: "5rem",
                display: uploadedImg ? "none" : "flex",
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
                setUploadedImg(e.target.files[0]);
              }}
              id="uploadImg"
              accept=".jpg, .jpeg, .png"
              size="5120"
              hidden
            />
          </label>
          {uploadedImg && (
            <Box sx={{ position: "relative" }}>
              <IconButton
                sx={{
                  color: "red",
                  position: "absolute",
                  right: "1rem",
                  top: "0.5rem",
                  cursor: "pointer",
                }}
                onClick={() => setUploadedImg(null)}
                aria-label="close"
              >
                <Delete />
              </IconButton>

              <img
                style={{
                  display: "block",
                  width: "100%",
                  maxHeight: "30rem",
                  borderRadius: "0.5rem",
                  objectFit: "fill",
                }}
                src={URL.createObjectURL(uploadedImg)}
                alt="tamkeen"
              />
            </Box>
          )}
        </Box>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openToast}
        autoHideDuration={2000}
        onClose={handleCloseToast}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toastStatus}
          color={toastStatus}
          sx={{ width: "100%" }}
        >
          {successMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NewTamkeen;
