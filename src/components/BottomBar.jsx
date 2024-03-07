import React from "react";
import PropTypes from "prop-types";
import Drawer from "@mui/material/Drawer";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Box, Paper, Tooltip, useTheme } from "@mui/material";
import { MarkUnreadChatAlt, WheelchairPickup, Menu } from "@mui/icons-material";
import { useState } from "react";
import LeftMenu from "../pages/LeftMenu";
import FilterPage from "pages/FilterPage";
import { useNavigate } from "react-router-dom";
const BottomBar = ({
  window,
  handleMental,
  handleMotor,
  handleHearing,
  handleVisual,
  handlePsychological,
  handleAccessibility,
  handleGivingHelp,
}) => {
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const theme = useTheme();
  const alt = theme.palette.background.alt;
  const dark = theme.palette.neutral.dark;
  const iconSize = "28px";
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          newValue === 0 && setMobileOpen(true);
          newValue === 1 && navigate("/assistant");
        }}
        sx={{
          bgcolor: { alt },
          "& .Mui-selected": {
            "& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label": {
              color: theme.palette.primary.baseBlue,
            },
          },
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <BottomNavigationAction
          icon={
            <Tooltip title="Filters">
              <Menu sx={{ color: dark, width: iconSize, height: iconSize }} />
            </Tooltip>
          }
        />
        <BottomNavigationAction
          icon={
            <Tooltip title="AI assistant">
              <WheelchairPickup
                sx={{ color: dark, width: iconSize, height: iconSize }}
              />
            </Tooltip>
          }
        />
        <BottomNavigationAction
          icon={
            <Tooltip title="Messages">
              <MarkUnreadChatAlt
                sx={{ color: dark, width: iconSize, height: iconSize }}
              />
            </Tooltip>
          }
        />
      </BottomNavigation>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "70%",
            },
          }}
        >
          <Box padding="1.5rem 0.75rem 1.5rem 0.75rem">
            <FilterPage
              handleMental={handleMental}
              handleMotor={handleMotor}
              handleHearing={handleHearing}
              handleVisual={handleVisual}
              handlePsychological={handlePsychological}
            />
            <LeftMenu
              handleAccessibility={handleAccessibility}
              handleGivingHelp={handleGivingHelp}
            />
          </Box>
        </Drawer>
      </nav>
    </Paper>
  );
};
BottomBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
export default BottomBar;
