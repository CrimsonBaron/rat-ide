import React, {useEffect, useState, useMemo} from 'react'
import { Box,Button, IconButton,Tooltip   } from '@mui/material'
import Tree from "./tree/tree"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

/**
 * this class takes care of rendering and reciveing the file tree events
 */

// component prop interface
interface explorerViewProps{
    callBackSetPath(path:String):void;
}

// file tree rendering is handled by this component which recieves the folder and loads all the files 
const ExplorerView = (props:explorerViewProps) =>{

  
    const {callBackSetPath} = props;

    useEffect(()=>{
        window.electron.ipcRenderer.on('get-folder-path', (arg:any) => {
            console.log(arg);
            if(arg != undefined){
                callBackSetPath(arg);
            }
          });
    })
    

   

    const openClick=()=>{
        window.electron.ipcRenderer.getFolderPath();  
    }

    return (
        <Box sx={{width:1, height:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}} >
              <Box sx={{flex:1}}></Box>
              <Box sx={{width:1, display:'flex', justifyContent:'center'}}>
                <Button variant="outlined" color='secondary' onClick={openClick}>Open project Folder</Button>
              </Box>
              <Box sx={{flex:1}}></Box>
        </Box>
      )
}

//component prop interface
interface folderViewProps{
    files:never[];
    onclickCallback(): any;
}

// the actual folder rendering using the loaded file structure from previus component

const FolderView = (props:folderViewProps) =>{

    const {files, onclickCallback} = props;

    return (
        <Box sx={{width:1, height:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}} >
            <Box sx={{padding: 0.5, fontSize:'12px', display:'flex', alignItems:'center',justifyContent:'left', width:1, marginLeft:'5px'}}>
              <Box sx={{flex:1 }} color={'secondary.main'}>EXPLORER</Box>
              <Tooltip title='close project'>
                <IconButton aria-label="more" color='secondary' size="small" onClick={onclickCallback}>
                  <MoreHorizIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Tree files={files} />
        </Box>
      )
}

//main file tree  component
const Explorer = () => {
    const [folderPath, setFolderPath] = useState('');
    const [files, setFiles] = useState([]);
    const [loaded, setLoaded] = useState(false);
   
    const closeProject = ()=>{
      setFolderPath('');
      setFiles([]);
      setLoaded(false);
    }

    useEffect(() => {
       if(folderPath != "" && loaded){
           window.electron.ipcRenderer.loadFiles(folderPath);
            window.electron.ipcRenderer.once('load-all-files',(arg:any)=>{
                 setFiles(arg);
                 
            })
       }

       window.electron.ipcRenderer.on("close-project",()=>{
         closeProject();
       })
    })
    
  return (
    <Box sx={{width:1, height:1, borderRadius:'5px', gridArea:'explorer'}} bgcolor={'primary.dark'}>
          {
              folderPath === ''? <ExplorerView callBackSetPath={(path:string) =>{setFolderPath(path); setLoaded(true)}} /> : <FolderView files={files} onclickCallback={closeProject}/>
          }
    </Box>
  )
}

export default Explorer