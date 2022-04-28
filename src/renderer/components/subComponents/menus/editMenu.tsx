import React from 'react'
import { Button,MenuList,MenuItem,ListItemText,Divider, Menu } from '@mui/material';

const EditMenu = () => {
  return (
    <MenuList dense sx={{width:200}}>
    <MenuItem>
        <ListItemText >Undo</ListItemText>
    </MenuItem>
    <MenuItem>
        <ListItemText  >Redo</ListItemText>
    </MenuItem>
    <Divider />
    <MenuItem>
        <ListItemText >Cut</ListItemText>
    </MenuItem>
    <MenuItem>
        <ListItemText >Copy</ListItemText>
    </MenuItem>
    <MenuItem>
        <ListItemText >Paste</ListItemText>
    </MenuItem>
    <Divider />
    <MenuItem>
        <ListItemText >Find</ListItemText>
    </MenuItem>
</MenuList>
  )
}

export default EditMenu