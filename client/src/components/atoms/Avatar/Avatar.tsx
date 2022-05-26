import React from 'react'

import { useStringAvatar } from './hooks/'
import { Props } from "./Avatar.d";
import { menuId } from "constants-app"

import IconButton from '@mui/material/IconButton'
import { default as MuiAvatar } from '@mui/material/Avatar'

export const Avatar = ({avatarOpenPopoverHandler, avatarText, sizes}: Props) => {
  return (
    <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={avatarOpenPopoverHandler}
        color="inherit"
    >
        <MuiAvatar 
            {...useStringAvatar(`${avatarText}`, [...sizes])}
        />
    </IconButton>
  )
}
