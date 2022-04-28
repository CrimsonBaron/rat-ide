import  React from 'react';
import {AppBar,IconButton,InputBase , Box, ButtonGroup, Avatar} from '@mui/material';
import { styled} from '@mui/material/styles';


import MinimizeSharpIcon from '@mui/icons-material/MinimizeSharp';
import MaximizeSharpIcon from '@mui/icons-material/MaximizeSharp';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
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

    const SearchIconWrapper = styled('div')(({theme})=>({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        width: '100%', 
      }));
  
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
          borderRadius: '15px',
        },
      }));

      /**
       * 
       *  <Box sx={{display:'flex', flexDirection:'row',margin:1}}>
                <Box sx={{paddingLeftRight:.5, borderRadius:'5px', display:'flex', justifyContent:'center', alignItems:'center'}} bgcolor={'primary.dark'} >
                    <Avatar sx={{width:25,height:25,marginLeft:1}} />
                    <Search className='nonDragable'>
                        <SearchIconWrapper>
                            <SearchIcon color='secondary'/>
                        </SearchIconWrapper>
                        <StyledInputBase placeholder='Search....' inputProps={{'aria-label':'search'}}/>
                    </Search>
                </Box>
            </Box>

              <TopBarButton title={'view'} color={'#9C865B'} menuElement={<FileMenu/>}/>
                <TopBarButton title={'go'} color={'#97745C'} menuElement={<FileMenu/>}/>
                <TopBarButton title={'run'} color={'#784F53'} menuElement={<FileMenu/>}/>
                <TopBarButton title={'help'} color={'#9FB8B5'} menuElement={<FileMenu/>}/>
       */

  return (
    <Box sx={{height:45}}>
        <AppBar position='fixed' sx={{height:45,display:'flex', flexDirection:'row',zIndex: (theme) => theme.zIndex.drawer + 1, } } elevation={0} color={'transparent'}>
           
            <Box sx={{height:29, paddingLeft:1,  paddingRight:5, borderRadius:'5px', flex:1,margin:1, display:'flex',alignItems:'center'}} bgcolor={'primary.dark'}>
              <ButtonGroup variant="text" aria-label="text button group" sx={{height:25}}>
              <TopBarButton title={'file'} color={'#768669'} menuElement={<FileMenu/>}/>
                <TopBarButton title={'edit'} color={'#7C5E67'} menuElement={<EditMenu/>}/>
                <TopBarButton title={'selection'} color={'#D99B66'} menuElement={<FileMenu/>}/>
              </ButtonGroup>
            </Box>
            <Box sx={{margin:1, paddingLeft:.5,paddingRight:.5, borderRadius:'5px'}} bgcolor={'primary.dark'}>
                <IconButton aria-label="minimaze button" className='nonDragable' color={'secondary'} size="small"  onClick={minimize}>
                    <MinimizeSharpIcon/>
                </IconButton>
                <IconButton aria-label="minimaze button" className='nonDragable' color={'secondary'} size="small" onClick={maximize}>
                    <MaximizeSharpIcon/>
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