import { Button,MenuList,MenuItem,ListItemText,Divider, Menu } from '@mui/material';
import React from 'react'

interface topBarButtonProps{
    title:String,
    color:String,
    menuElement: React.ReactNode,
}

const TopBarButton = (props:topBarButtonProps) => {

    const {title, color, menuElement} = props;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

  return (
    <>
        <Button variant='text'
            color='secondary'
            id="menu-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className={'nonDragable'}
     
        >
            <span style={{color: `${color}`}}>{title}</span>
        </Button>
        <Menu 
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            transformOrigin={{vertical: 'top', horizontal: 'center'}}
            MenuListProps={{'aria-labelledby': 'basic-button',}}
            
         >
            {menuElement}
        </Menu>
</>
  )
}

export default TopBarButton