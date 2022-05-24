import React from 'react'
import { Link as RouterLink} from 'react-router-dom'
import {removeUser} from '../store/slices/userSlice'
import { useAppDispatch } from 'hooks/redux-hooks'
import { useMessage } from 'hooks/message.hook'
import { useAuth } from 'hooks/use-auth'

import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import ViewListIcon from '@mui/icons-material/ViewList';
import AddIcon from '@mui/icons-material/Add';
import MoreIcon from '@mui/icons-material/MoreVert'
import Avatar from '@mui/material/Avatar'

function stringToColor(string: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar(name: string, size: number[]) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: size[0],
      height: size[1],
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[0][1]}`,
  }
}

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)

    const message = useMessage()
    const dispatch = useAppDispatch()
    const {email} = useAuth()

    const logoutHandler = (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault()
      dispatch(removeUser())
      message('Возвращайтесь =)', 'success')
    }
  
    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    }
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null)
    }
  
    const handleMenuClose = () => {
      setAnchorEl(null)
      handleMobileMenuClose()
    }
  
    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setMobileMoreAnchorEl(event.currentTarget)
    }
  
    const menuId = 'primary-search-account-menu'
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
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
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Профиль</MenuItem>
        <MenuItem onClick={(e) => {
          logoutHandler(e)
          handleMenuClose()
        }}>
          Выйти
        </MenuItem>
      </Menu>
    )
  
    const mobileMenuId = 'primary-search-account-menu-mobile'
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem
            component={RouterLink} 
            to="/addOffer"
        >
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <AddIcon />
          </IconButton>
          <p>Добавить оффер</p>
        </MenuItem>
        <MenuItem
            component={RouterLink} 
            to="/games"
        >
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <ViewListIcon />
          </IconButton>
          <p>Каталог игр</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
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
        </MenuItem>
      </Menu>
    )
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Link 
                      component={RouterLink} 
                      to="/" 
                      color="#fff"
                      variant="h6"
                      noWrap
                      sx={{ display: { xs: 'none', sm: 'block' } }}
                      underline="none"
                    >
                      Pay2win
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                      <Button 
                        color="inherit"
                        component={RouterLink} 
                        to="/addOffer"
                      >
                        Добавить оффер
                      </Button>
                      <Button 
                        color="inherit"
                        component={RouterLink} 
                        to="/games"
                      >
                        Каталог игр
                      </Button>
                      <IconButton
                          size="large"
                          edge="end"
                          aria-label="account of current user"
                          aria-controls={menuId}
                          aria-haspopup="true"
                          onClick={handleProfileMenuOpen}
                          color="inherit"
                      >
                        <Avatar 
                          {...stringAvatar(`${email}`, [34,34])}
                        />
                      </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                    >
                        <MoreIcon />
                    </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    )
}

export default Header