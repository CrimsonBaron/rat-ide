import { MenuList,MenuItem,ListItemText,Divider } from '@mui/material';

/**
 * this class generates file topbar menu
 */

const closeClick = ()=>{
  window.electron.ipcRenderer.closeProject()
}

const openProject = ()=>{
  window.electron.ipcRenderer.getFolderPath()
}

const close = ()=>{
  window.electron.ipcRenderer.close();
}

const FileMenu = () => {
  return (
    <MenuList dense>
                <MenuItem>
                    <ListItemText onClick={closeClick} >Close project Folder</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText onClick={openProject} >Open Project Folder</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemText onClick={close}>Exit</ListItemText>
                </MenuItem>
                
            </MenuList>
  )
}

export default FileMenu