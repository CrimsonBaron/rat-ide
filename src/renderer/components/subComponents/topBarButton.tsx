import { Button,MenuList,MenuItem,ListItemText,Divider, Menu } from '@mui/material';
import React from 'react'

interface topBarButtonProps{
    title:String,
    color:String,
}

const TopBarButton = (props:topBarButtonProps) => {

    const {title, color} = props;
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
            <MenuList dense>
                <MenuItem>
                    <ListItemText inset>Single</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText inset>1.15</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText inset>Double</ListItemText>
                </MenuItem>
                <MenuItem>
                     Custom: 1.2
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemText>Add space before paragraph</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText>Add space after paragraph</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemText>Custom spacing...</ListItemText>
                </MenuItem>
            </MenuList>
        </Menu>
</>
  )
}

export default TopBarButton