import { LoadingButton } from "@mui/lab";
import {
  Box,
  CircularProgress,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ResetPasswordForm = () => {
  const { palette } = useTheme();

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isSmallMobileScreens = useMediaQuery("(max-width:450px)");
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // setIsSubmitting(true);
    // try {
    //   const res = await apiRequest({
    //     url: "/users/request-passwordreset",
    //     data: data,
    //     method: "POST",
    //   });
    //   setErrMsg(res);
    //   setIsSubmitting(false);
    // } catch (error) {
    //   console.log(error);
    //   setIsSubmitting(false);
    // }
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
            <CircularProgress color="info" size={isNonMobile ? 40 : 25} />
          }
          sx={{
            fontWeight: "bold",
            fontSize: isSmallMobileScreens ? "1rem" : "2rem",
            m: "1rem 0",
            p: "1rem",
            backgroundColor: palette.primary.baseBlue,
            color: palette.background.alt,
            "&:hover": {
              color: palette.primary.main,
              backgroundColor: palette.primary.baseBlue,
            },
            gridColumn: "span 4",
          }}
        >
          Reset password
        </LoadingButton>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
            textAlign: "start",
            gridColumn: "span 4",
            textDecoration: "underline",
            color: palette.primary.baseBlue,
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
            textAlign: "start",
            gridColumn: "span 4",
            textDecoration: "underline",
            color: palette.primary.baseBlue,
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("/register")}
        >
          Create Account
        </Typography>
      </Box>
    </form>
  );
};

export default ResetPasswordForm;
