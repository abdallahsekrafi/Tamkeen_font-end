import React from "react";
import { useState } from "react";
import {
  Box,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  FormControlLabel,
  Checkbox,
  Divider,
  Avatar,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "utils";

const RegisterForm = () => {
  const { palette } = useTheme();

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isMobileScreens = useMediaQuery("(max-width:650px)");
  const isSmallMobileScreens = useMediaQuery("(max-width:450px)");
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // hide show password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  //Interested disability
  const [disabilityCount, setDisabilityCount] = useState(0);
  const [disabilityInterested, setDisabilityInterested] = useState(
    "Interested disability"
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    if (disabilityCount < 1) {
      setDisabilityInterested("Interested disability (*)");
      return;
    }
    setIsSubmitting(true);
    // console.log(data);
    try {
      data.firstName = data.firstName.trim();
      data.lastName = data.lastName.trim();
      const res = await apiRequest({
        url: "/auth/register",
        data: data,
        method: "POST",
      });
      if (res.success === "failed") {
        setErrMsg(res);
      } else {
        setErrMsg(res);
        setTimeout(() => {
          window.location.replace("/login");
        }, 5000);
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box
        display="grid"
        gap="25px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      >
        <TextField
          label="First Name"
          type="text"
          name="firstName"
          placeholder="First Name"
          {...register("firstName", {
            validate: (value) => {
              if (value.length < 3) {
                return "First Name must be at least 3 characters";
              }
            },
            required: "First Name is required",
          })}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          sx={{
            gridColumn: isSmallMobileScreens ? "span 4" : "span 2",
            ".MuiInputBase-input": { fontSize: "1.25rem" },
          }}
        />
        <TextField
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Last Name"
          {...register("lastName", {
            validate: (value) => {
              if (value.length < 3) {
                return "Last Name must be at least 3 characters";
              }
            },
            required: "Last Name is required",
          })}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          sx={{
            gridColumn: isSmallMobileScreens ? "span 4" : "span 2",
            ".MuiInputBase-input": { fontSize: "1.25rem" },
          }}
        />
        <FormControlLabel
          componentsProps={{
            typography: { variant: "h6", fontWeight: "bold" },
          }}
          sx={{
            textAlign: "start",
            gridColumn: isNonMobileScreens ? "span 2" : "span 4",
            color: palette.primary.baseBlue,
          }}
          control={<Checkbox name="isDisabled" {...register("isDisabled")} />}
          label="Do you have a disability ?"
        />
        <FormControlLabel
          componentsProps={{
            typography: { variant: "h6", fontWeight: "bold" },
          }}
          sx={{
            textAlign: "start",
            gridColumn: isNonMobileScreens ? "span 2" : "span 4",
            color: palette.primary.baseBlue,
          }}
          control={
            <Checkbox name="isFMDisabled" {...register("isFMDisabled")} />
          }
          label="A family member has a disability ?"
        />
        {/*------------*/}
        <Divider
          sx={{
            gridColumn: "span 4",
            color:
              disabilityInterested === "Interested disability"
                ? palette.primary.baseBlue
                : palette.primary.red,
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          {disabilityInterested}
        </Divider>
        <Box
          display="grid"
          gap="25px"
          gridTemplateColumns="repeat(5, minmax(0, 1fr))"
          sx={{ gridColumn: "span 4" }}
        >
          <FormControlLabel
            componentsProps={{
              typography: {
                variant: "h6",
                fontSize: isSmallMobileScreens && "0.7rem",
              },
            }}
            control={
              <Checkbox
                name="isMental"
                icon={
                  <Avatar
                    sx={isSmallMobileScreens && { width: 32, height: 32 }}
                    alt="unmental"
                    src="/assets/unmental.svg"
                  />
                }
                checkedIcon={
                  <Avatar
                    sx={isSmallMobileScreens && { width: 32, height: 32 }}
                    alt="mental"
                    src="/assets/mental.svg"
                  />
                }
                {...register("isMental")}
                onClick={(e) =>
                  setDisabilityCount((p) => (e.target.checked ? p + 1 : p - 1))
                }
              />
            }
            label="Mental"
            labelPlacement="bottom"
          />
          <FormControlLabel
            componentsProps={{
              typography: {
                variant: "h6",
                fontSize: isSmallMobileScreens && "0.7rem",
              },
            }}
            control={
              <Checkbox
                name="isMotor"
                icon={
                  <Avatar
                    sx={isSmallMobileScreens && { width: 32, height: 32 }}
                    alt="unmotor"
                    src="/assets/unmotor.svg"
                  />
                }
                checkedIcon={
                  <Avatar
                    sx={isSmallMobileScreens && { width: 32, height: 32 }}
                    alt="motor"
                    src="/assets/motor.svg"
                  />
                }
                {...register("isMotor")}
                onClick={(e) =>
                  setDisabilityCount((p) => (e.target.checked ? p + 1 : p - 1))
                }
              />
            }
            label="Motor"
            labelPlacement="bottom"
          />
          <FormControlLabel
            componentsProps={{
              typography: {
                variant: "h6",
                fontSize: isSmallMobileScreens && "0.7rem",
              },
            }}
            control={
              <Checkbox
                name="isHearing"
                icon={
                  <Avatar
                    sx={isSmallMobileScreens && { width: 32, height: 32 }}
                    alt="unhearing"
                    src="/assets/unhearing.svg"
                  />
                }
                checkedIcon={
                  <Avatar
                    sx={isSmallMobileScreens && { width: 32, height: 32 }}
                    alt="hearing"
                    src="/assets/hearing.svg"
                  />
                }
                {...register("isHearing")}
                onClick={(e) =>
                  setDisabilityCount((p) => (e.target.checked ? p + 1 : p - 1))
                }
              />
            }
            label="Hearing"
            labelPlacement="bottom"
          />
          <FormControlLabel
            componentsProps={{
              typography: {
                variant: "h6",
                fontSize: isSmallMobileScreens && "0.7rem",
              },
            }}
            control={
              <Checkbox
                name="isVisual"
                icon={
                  <Avatar
                    sx={isSmallMobileScreens && { width: 32, height: 32 }}
                    alt="unvisual"
                    src="/assets/unvisual.svg"
                  />
                }
                checkedIcon={
                  <Avatar
                    sx={isSmallMobileScreens && { width: 32, height: 32 }}
                    alt="visual"
                    src="/assets/visual.svg"
                  />
                }
                {...register("isVisual")}
                onClick={(e) =>
                  setDisabilityCount((p) => (e.target.checked ? p + 1 : p - 1))
                }
              />
            }
            label="Visual"
            labelPlacement="bottom"
          />
          <FormControlLabel
            componentsProps={{
              typography: {
                variant: "h6",
                fontSize: isSmallMobileScreens && "0.7rem",
              },
            }}
            control={
              <Checkbox
                name="isPsychological"
                icon={
                  <Avatar
                    sx={isSmallMobileScreens && { width: 32, height: 32 }}
                    alt="unpsychological"
                    src="/assets/unpsychological.svg"
                  />
                }
                checkedIcon={
                  <Avatar
                    sx={isSmallMobileScreens && { width: 32, height: 32 }}
                    alt="psychological"
                    src="/assets/psychological.svg"
                  />
                }
                {...register("isPsychological")}
                onClick={(e) =>
                  setDisabilityCount((p) => (e.target.checked ? p + 1 : p - 1))
                }
              />
            }
            label="Psychological"
            labelPlacement="bottom"
          />
        </Box>
        {/*------------*/}
        <TextField
          label="Email"
          type="email"
          name="email"
          placeholder="email@example.com"
          {...register("email", {
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email format",
            },
            required: "Email is required",
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{
            gridColumn: "span 4",
            ".MuiInputBase-input": { fontSize: "1.25rem" },
          }}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          {...register("password", {
            validate: (value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }
            },
            required: "Password is required",
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{
            gridColumn: "span 4",
            ".MuiInputBase-input": { fontSize: "1.25rem" },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {errMsg?.message && (
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "1rem",
              textAlign: "center",
              gridColumn: "span 4",
              color:
                errMsg?.success === "PENDING" ? "green" : palette.primary.red,
            }}
          >
            {errMsg.message}
          </Typography>
        )}
        <LoadingButton
          type="submit"
          loading={isSubmitting}
          loadingPosition="start"
          variant="contained"
          loadingIndicator={
            <CircularProgress
              color="info"
              size={isNonMobileScreens ? 40 : !isMobileScreens ? 32 : 24}
            />
          }
          sx={{
            fontWeight: "bold",
            fontSize: isNonMobileScreens
              ? "2rem"
              : !isMobileScreens
              ? "1.25rem"
              : "1rem",
            p: "0.25rem",
            backgroundColor: palette.primary.baseBlue,
            color: palette.background.alt,
            // "&:hover": {
            //   color: palette.primary.main,
            //   backgroundColor: palette.primary.baseBlue,
            // },
            gridColumn: "span 4",
          }}
        >
          Register
        </LoadingButton>

        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
            textAlign: "start",
            gridColumn: "span 2",
            textDecoration: "underline",
            color: palette.primary.baseBlue,
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("/login")}
        >
          Already has an account ?
        </Typography>
      </Box>
    </form>
  );
};

export default RegisterForm;
