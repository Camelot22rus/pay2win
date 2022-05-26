import React from 'react'
import { Link as RouterLink} from 'react-router-dom'
import { map } from "lodash"

import { menuItems } from "constants-app"
import { MenuItem } from "./MobilePopover.d";

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { default as Menu } from '@mui/material/MenuItem'


export const MobilePopover = () => {
  return (
    <>
      {map(menuItems, (menuItem: MenuItem) => {
        return (        
        <Menu
            component={RouterLink} 
            to={`/${menuItem.url}`}
        >
          <Button
            size="large"
            color="inherit"
          >
            {menuItem.title}
          </Button>
        </Menu>
        )
      })}
      {/*<Menu onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar 
            {...stringAvatar(`${email}`, [34,34])}
          />
        </IconButton>
        <p>Profile</p>
      </Menu> */}
    </>
  )
}
