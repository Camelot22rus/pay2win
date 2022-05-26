import React from 'react'
import { Link as RouterLink} from 'react-router-dom'

import { LogoApp } from "components/atoms/Logo"
import { Avatar } from "components/atoms/Avatar"
import { BasicPopover } from "components/molecules/HeaderPopover"
import { HeaderNavbar } from "components/molecules/HeaderNavbar"

import AppBar from '@mui/material/AppBar'
import Stack from '@mui/material/Stack'

export const MobileHeader = () => {
  return (
    <AppBar position="static">
        <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={1.5}
        >
            <LogoApp />
            {/*<Stack direction="row" alignItems="center" spacing={3}>
                <HeaderNavbar />
                <Avatar 
                  avatarOpenMenuHandler={avatarOpenMenuHandler}
                  avatarText={email}
                  sizes={[34,34]}
                />
                <BasicPopover />
            </Stack>*/}
        </Stack>
    </AppBar>
  )
}
