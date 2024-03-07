import {
  Avatar,
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  OndemandVideo,
  Image,
  Accessibility,
  MonetizationOn,
  EventAvailable,
  Storefront,
  Public,
} from "@mui/icons-material";
import React, { useState } from "react";

const FilterPage = ({ handleAccessibility, handleGivingHelp }) => {
  const { palette } = useTheme();
  const [isAccessibility, setIsAccessibility] = useState("");
  const [isGivingHelp, setIsGivingHelp] = useState("");
  return (
    <Box
      padding="1.5rem 1.5rem 0.75rem 0.75rem"
      sx={{
        display: "inline-flex",
        flexDirection: "column",
      }}
    >
      <Divider>Help type</Divider>
      <Select
        title="Hepl type"
        name="isGivingHelp"
        value={isGivingHelp}
        onChange={(e) => {
          setIsGivingHelp(e.target.value);
          handleGivingHelp(e.target.value);
        }}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        sx={{
          height: "2rem",
          mt: "0.25rem",
          mb: "1rem",
        }}
      >
        <MenuItem value={""}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "0.2rem",
            }}
          >
            <FilterAltIcon
              color="action"
              sx={{ width: "2rem", height: "2rem" }}
            />
            <Typography fontSize="1rem">All</Typography>
          </Box>
        </MenuItem>
        <MenuItem value={true}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            <Avatar
              sx={{ width: "1.75rem", height: "1.75rem" }}
              alt="giving help"
              src="/assets/giv_help.svg"
            />
            <Typography fontSize="1rem">Give help</Typography>
          </Box>
        </MenuItem>
        <MenuItem value={false}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            <Avatar
              sx={{ width: "1.75rem", height: "1.75rem" }}
              alt="asking for help"
              src="/assets/ask_help.svg"
            />
            <Typography fontSize="1rem"> Ask for help</Typography>
          </Box>
        </MenuItem>
      </Select>
      <Divider sx={{ width: "100%" }}>Accessibility type</Divider>
      <Select
        title="Tamkeen type"
        name="isAccessibility"
        value={isAccessibility}
        onChange={(e) => {
          setIsAccessibility(e.target.value);
          handleAccessibility(e.target.value);
        }}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        sx={{
          height: "2rem",
          mt: "0.25rem",
          mb: "1rem",
        }}
      >
        <MenuItem value={""}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "0.2rem",
            }}
          >
            <FilterAltIcon
              color="action"
              sx={{ width: "2rem", height: "2rem" }}
            />
            <Typography fontSize="1rem">All</Typography>
          </Box>
        </MenuItem>
        <MenuItem value={false}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "0.2rem",
            }}
          >
            <Public color="primary" sx={{ width: "2rem", height: "2rem" }} />
            <Typography fontSize="1rem">General</Typography>
          </Box>
        </MenuItem>
        <MenuItem value={true}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "0.2rem",
            }}
          >
            <Accessibility
              color="primary"
              sx={{ width: "2rem", height: "2rem" }}
            />
            <Typography fontSize="1rem">Accessibility</Typography>
          </Box>
        </MenuItem>
      </Select>
      <Divider></Divider>
      <FormControlLabel
        componentsProps={{
          typography: {
            fontSize: "0.8rem",
          },
        }}
        control={
          <Checkbox
            name="donate"
            icon={
              <MonetizationOn
                color="warning"
                sx={{ width: "2rem", height: "2rem" }}
              />
            }
            checkedIcon={
              <MonetizationOn
                sx={{
                  color: palette.primary.baseBlue,
                  width: "2rem",
                  height: "2rem",
                }}
              />
            }
          />
        }
        label="Donates"
        labelPlacement="end"
      />

      <FormControlLabel
        componentsProps={{
          typography: {
            fontSize: "0.8rem",
          },
        }}
        control={
          <Checkbox
            name="video"
            icon={
              <EventAvailable
                sx={{
                  width: "2rem",
                  height: "2rem",
                  color: palette.primary.purple,
                }}
              />
            }
            checkedIcon={
              <EventAvailable
                sx={{
                  color: palette.primary.baseBlue,
                  width: "2rem",
                  height: "2rem",
                }}
              />
            }
          />
        }
        label="Events"
        labelPlacement="end"
      />

      <FormControlLabel
        componentsProps={{
          typography: {
            fontSize: "0.8rem",
          },
        }}
        control={
          <Checkbox
            name="marketspace"
            icon={
              <Storefront
                color="success"
                sx={{
                  width: "2rem",
                  height: "2rem",
                  color: palette.primary.market,
                }}
              />
            }
            checkedIcon={
              <Storefront
                sx={{
                  color: palette.primary.baseBlue,
                  width: "2rem",
                  height: "2rem",
                }}
              />
            }
          />
        }
        label="Marketspace"
        labelPlacement="end"
      />
    </Box>
  );
};

export default FilterPage;
