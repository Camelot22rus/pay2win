import React from 'react'
import { Link as RouterLink} from 'react-router-dom'
import { map } from "lodash"

import { menuItems } from "constants-app"
import { MenuItem } from "./HeaderNavbar.d";

import Button from '@mui/material/Button'


export const HeaderNavbar = () => {
  return (
    <>
      {map(menuItems, (menuItem: MenuItem) => {
        return (
          <Button 
            color="inherit"
            component={RouterLink} 
            to={`/${menuItem.url}`}
          >
            {menuItem.title}
          </Button>
        )
      })}
    </>
  )
}
