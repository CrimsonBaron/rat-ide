import {AppBar,IconButton, Box, ButtonGroup,} from '@mui/material';

/**
 * this component class is responsible for rendering the top bar and its functions
 */


import RemoveIcon from '@mui/icons-material/Remove';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CloseIcon from '@mui/icons-material/Close';
import TopBarButton from './subComponents/topBarButton';

import FileMenu from './subComponents/menus/fileMenu';
import EditMenu from './subComponents/menus/editMenu';

const NavBar = () => {

  // sends the app close event
    const close = ()=>{
        window.electron.ipcRenderer.close();
    };

    // sends the app mimimize event
    const minimize=()=>{
        window.electron.ipcRenderer.minimize();
    };

    // sends the app close event
    const maximize=()=>{
        window.electron.ipcRenderer.maximize();
    };

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