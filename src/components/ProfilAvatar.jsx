import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { useMediaQuery } from "@mui/material";

function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name, size) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: size,
      height: size,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const ProfilAvatar = ({ profilName, profilImg = "", profilSize }) => {
  const isSmallMobileScreens = useMediaQuery("(max-width:450px)");
  const size = profilSize ? profilSize : isSmallMobileScreens ? 40 : 48;
  return profilImg ? (
    <Avatar
      alt={profilName}
      src={profilImg}
      sx={{ width: size, height: size }}
    />
  ) : (
    <Avatar {...stringAvatar(profilName, size)} />
  );
};

export default ProfilAvatar;
