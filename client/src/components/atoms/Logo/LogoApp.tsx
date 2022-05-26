import React from 'react'
import { Link as RouterLink} from 'react-router-dom'

import { APP_NAME } from "constants-app"

import Link from '@mui/material/Link'

export const LogoApp = () => {
  return (
    <Link 
      component={RouterLink} 
      to="/" 
      color="#fff"
      variant="h6"
      noWrap
      sx={{ display: { xs: 'none', sm: 'block' } }}
      underline="none"
    >
      {APP_NAME}
    </Link>
  )
}
