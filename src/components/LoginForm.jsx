import React from "react";
import { useState } from "react";
import {
  Box,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Divider,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiRequest } from "utils";
import { login } from "tmkredux/userSlice";
const FormLogin = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isMobileScreens = useMediaQuery("(max-width:650px)");
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // hide show password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await apiRequest({
        url: "/auth/login",
        data: data,
        method: "POST",
      });
      if (!res.success) {
        setErrMsg(res);
      } else {
        setErrMsg("");
        const newData = { token: res?.token, user: res?.user };
        dispatch(login(newData));
        window.location.replace("/");
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
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      >
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
              ? "1rem"
              : "0.75rem",
            m: "1rem 0",
            p: "1rem",
            backgroundColor: palette.primary.baseBlue,
            color: palette.background.alt,
            // "&:hover": {
            //   color: palette.primary.main,
            //   backgroundColor: palette.primary.baseBlue,
            // },
            gridColumn: "span 4",
          }}
        >
          Login
        </LoadingButton>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
            textAlign: "center",
            gridColumn: "span 4",
            textDecoration: "underline",
            color: palette.primary.baseBlue,
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("/reset-password")}
        >
          Forgot Password ?
        </Typography>

        <Divider
          sx={{
            gridColumn: "span 4",

            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          Don't have an account
        </Divider>
        <Button
          sx={{
            fontWeight: "bold",
            fontSize: isNonMobileScreens
              ? "2rem"
              : !isMobileScreens
              ? "1.25rem"
              : "1rem",
            p: "0.25rem",

            backgroundColor: "green",
            color: palette.background.alt,
            "&:hover": {
              color: palette.primary.main,
              backgroundColor: "green",
            },
            gridColumn: "span 4",
          }}
          onClick={() => navigate("/register")}
        >
          Creat new account
        </Button>
      </Box>
    </form>
  );
};

export default FormLogin;
