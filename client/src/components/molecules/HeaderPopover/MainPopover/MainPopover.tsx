import React from "react";
import useTheme from "@mui/material/styles/useTheme"
import useMediaQuery from "@mui/material/useMediaQuery"
import { Props } from "./MainPopover.d";
import { BasicPopover, MobilePopover } from "components/molecules/HeaderPopover"

export const MainPopover = ({ anchorElement, isMenuOpen, avatarCloseMenuHandler }: Props) => {
  const theme = useTheme()
  const MdDowm = useMediaQuery(theme.breakpoints.down("md"))

  return !MdDowm ? <BasicPopover {...{anchorElement, isMenuOpen, avatarCloseMenuHandler}}/> : <MobilePopover />
};
