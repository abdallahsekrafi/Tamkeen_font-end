import {
  Avatar,
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";

import WidgetWrapper from "components/WidgetWrapper";
import React from "react";

const FilterPage = ({
  handleMental,
  handleMotor,
  handleHearing,
  handleVisual,
  handlePsychological,
}) => {
  const isMin1400 = useMediaQuery("(min-width:1400px)");
  const isMin1300 = useMediaQuery("(min-width:1300px)");
  const isMin950 = useMediaQuery("(min-width:950px)");
  const isMin1150 = useMediaQuery("(min-width:1150px)");
  const isSmallMobileScreens = useMediaQuery("(max-width:450px)");
  const isMobileScreens = useMediaQuery("(max-width:800px)");

  const { palette } = useTheme();

  return (
    <WidgetWrapper
      sx={{
        padding: "1.5rem 0.75rem 1.5rem 0.5rem",
        boxShadow: isMobileScreens ? 0 : 3,
        backgroundColor: isMobileScreens ? "inherit" : palette.background.alt,
        borderRadius: isMobileScreens ? "0" : "0.75rem",
      }}
    >
      <FlexBetween>
        <Box />
        <FilterAlt sx={{ color: palette.neutral.medium }} />
      </FlexBetween>
      {/* Disability type */}
      <Divider>Disability type</Divider>
      <Box
        mt="1.5rem"
        display="grid"
        gap="18px"
        gridTemplateColumns={"repeat(5, minmax(0, 1fr))"}
      >
        <FormControlLabel
          componentsProps={{
            typography: {
              fontSize: isMin1400
                ? "0.8rem"
                : isMin1300
                ? "0.75rem"
                : isMin1150
                ? "0.6rem"
                : isMin950
                ? "0.8rem"
                : "0.6rem",
            },
          }}
          control={
            <Checkbox
              sx={{ padding: 0 }}
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
              onClick={handleMental}
            />
          }
          label="Mental"
          labelPlacement="bottom"
        />
        <FormControlLabel
          componentsProps={{
            typography: {
              fontSize: isMin1400
                ? "0.8rem"
                : isMin1300
                ? "0.75rem"
                : isMin1150
                ? "0.6rem"
                : isMin950
                ? "0.8rem"
                : "0.6rem",
            },
          }}
          control={
            <Checkbox
              sx={{ padding: 0 }}
              name="motor"
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
              onClick={handleMotor}
            />
          }
          label="Motor"
          labelPlacement="bottom"
        />
        <FormControlLabel
          componentsProps={{
            typography: {
              fontSize: isMin1400
                ? "0.8rem"
                : isMin1300
                ? "0.75rem"
                : isMin1150
                ? "0.6rem"
                : isMin950
                ? "0.8rem"
                : "0.6rem",
            },
          }}
          control={
            <Checkbox
              sx={{ padding: 0 }}
              name="hearing"
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
              onClick={handleHearing}
            />
          }
          label="Hearing"
          labelPlacement="bottom"
        />
        <FormControlLabel
          componentsProps={{
            typography: {
              fontSize: isMin1400
                ? "0.8rem"
                : isMin1300
                ? "0.75rem"
                : isMin1150
                ? "0.6rem"
                : isMin950
                ? "0.8rem"
                : "0.6rem",
            },
          }}
          control={
            <Checkbox
              sx={{ padding: 0 }}
              name="visual"
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
              onClick={handleVisual}
            />
          }
          label="Visual"
          labelPlacement="bottom"
        />
        <FormControlLabel
          componentsProps={{
            typography: {
              fontSize: isMin1400
                ? "0.8rem"
                : isMin1300
                ? "0.75rem"
                : isMin1150
                ? "0.6rem"
                : isMin950
                ? "0.8rem"
                : "0.55rem",
            },
          }}
          control={
            <Checkbox
              sx={{ padding: 0 }}
              name="psychological"
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
              onClick={handlePsychological}
            />
          }
          label="Psychological"
          labelPlacement="bottom"
        />
      </Box>
    </WidgetWrapper>
  );
};

export default FilterPage;
