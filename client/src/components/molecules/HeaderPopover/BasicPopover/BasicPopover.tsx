import React from 'react'

import { Props } from "./BasicPopover.d";
import { menuId } from "constants-app"

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'


export const BasicPopover = ({ anchorElement, isMenuOpen, avatarCloseMenuHandler }: Props) => {
  return (
    <Menu
      anchorEl={anchorElement}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={avatarCloseMenuHandler}
    >
      <MenuItem onClick={avatarCloseMenuHandler}>Профиль</MenuItem>
      <MenuItem onClick={(e) => {
        //logoutHandler(e)
        avatarCloseMenuHandler()
      }}>
        Выйти
      </MenuItem>
    </Menu>
  )
}
