import React from "react";
import useTheme from "@mui/material/styles/useTheme"
import useMediaQuery from "@mui/material/useMediaQuery"
import { BasicHeader, MobileHeader } from "components/organisms/Headers"

export const MainHeader = () => {
  const theme = useTheme()
  const MdDowm = useMediaQuery(theme.breakpoints.down("md"))

  return !MdDowm ? <BasicHeader /> : <MobileHeader />
};
