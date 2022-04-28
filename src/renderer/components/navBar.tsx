import  React from 'react';
import {AppBar,IconButton,InputBase , Box, ButtonGroup, Avatar} from '@mui/material';
import { styled} from '@mui/material/styles';


import RemoveIcon from '@mui/icons-material/Remove';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CloseIcon from '@mui/icons-material/Close';
import TopBarButton from './subComponents/topBarButton';

import FileMenu from './subComponents/menus/fileMenu';
import EditMenu from './subComponents/menus/editMenu';

const NavBar = () => {
    const close = ()=>{
        window.electron.ipcRenderer.close();
    };

    const minimize=()=>{
        window.electron.ipcRenderer.minimize();
    };

    const maximize=()=>{
        window.electron.ipcRenderer.maximize();
    };

      /**
       *
              <TopBarButton title={'view'} color={'#9C865B'} menuElement={<FileMenu/>}/>
                <TopBarButton title={'go'} color={'#97745C'} menuElement={<FileMenu/>}/>
                <TopBarButton title={'run'} color={'#784F53'} menuElement={<FileMenu/>}/>
                <TopBarButton title={'help'} color={'#9FB8B5'} menuElement={<FileMenu/>}/>
                 <TopBarButton title={'selection'} color={'#D99B66'} menuElement={<FileMenu/>}/>
       */

  return (
    <Box sx={{height:45}}>
        <AppBar position='fixed' sx={{height:45,display:'flex', flexDirection:'row',zIndex: (theme) => theme.zIndex.drawer + 1, } } elevation={0} color={'transparent'}>
           
            <Box sx={{height:29, paddingLeft:1,  paddingRight:5, borderRadius:'5px', flex:1,margin:1, display:'flex',alignItems:'center'}} bgcolor={'primary.dark'}>
              <ButtonGroup variant="text" aria-label="text button group" sx={{height:25}}>
              <TopBarButton title={'file'} color={'#768669'} menuElement={<FileMenu/>}/>
                <TopBarButton title={'edit'} color={'#7C5E67'} menuElement={<EditMenu/>}/>
               
              </ButtonGroup>
            </Box>
            <Box sx={{margin:1, paddingLeft:.5,paddingRight:.5, borderRadius:'5px', display:'flex', alignItems:'center'}} bgcolor={'primary.dark'}>
                <IconButton aria-label="minimaze button" className='nonDragable' color={'secondary'} size="small"  onClick={minimize}>
                    <RemoveIcon/>
                </IconButton>
                <IconButton aria-label="minimaze button" className='nonDragable' color={'secondary'} size="small" onClick={maximize}>
                    <CropSquareIcon/>
                </IconButton>
                <IconButton aria-label="minimaze button" className='nonDragable' color={'secondary'} size="small" onClick={close}>
                     <CloseIcon/>
                </IconButton>
            </Box>
        </AppBar>
    </Box>
  )
}

export default NavBar