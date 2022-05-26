import React from 'react'
import { Link as RouterLink} from 'react-router-dom'

import { useAuth } from 'hooks/use-auth'
import { LogoApp } from "components/atoms/Logo"
import { Avatar } from "components/atoms/Avatar"
import { BasicPopover } from "components/molecules/HeaderPopover"
import { HeaderNavbar } from "components/molecules/HeaderNavbar"
import { useBasicHeader } from "../hooks";

import AppBar from '@mui/material/AppBar'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Stack'

export const BasicHeader = () => {
  const { anchorElement, isMenuOpen, avatarOpenPopoverHandler, avatarCloseMenuHandler } = useBasicHeader()
  const {email} = useAuth()

  return (
    <AppBar position="static">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1.5}
        px={3}
      >
          <LogoApp />
          <Stack direction="row" alignItems="center" spacing={3}>
              <HeaderNavbar />
              <Avatar 
                avatarText={email}
                sizes={[34,34]}
                avatarOpenPopoverHandler={avatarOpenPopoverHandler}
              />
              <BasicPopover 
                anchorElement={anchorElement}
                isMenuOpen={isMenuOpen}
                avatarCloseMenuHandler={avatarCloseMenuHandler}
              />
          </Stack>
      </Stack>
    </AppBar>
  )
}
