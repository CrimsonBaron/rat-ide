import React from 'react'
import { Button,MenuList,MenuItem,ListItemText,Divider, Menu } from '@mui/material';

const undo = ()=>{
    window.electron.ipcRenderer.undo();
}

const redo = ()=>{
    window.electron.ipcRenderer.redo();
}


const EditMenu = () => {
  return (
    <MenuList dense sx={{width:200}}>
    <MenuItem>
        <ListItemText onClick={undo} >Undo</ListItemText>
    </MenuItem>
    <MenuItem>
        <ListItemText  onClick={redo} >Redo</ListItemText>
    </MenuItem>
   
</MenuList>
  )
}

export default EditMenu