import React from 'react'

export const useBasicHeader = () => {
    const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null)

    const isMenuOpen = Boolean(anchorElement)

    const avatarOpenPopoverHandler = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElement(event.currentTarget)
    }

    const avatarCloseMenuHandler = () => {
      setAnchorElement(null)
    }
    
    return {
        anchorElement, isMenuOpen, avatarOpenPopoverHandler, avatarCloseMenuHandler
    }
}
