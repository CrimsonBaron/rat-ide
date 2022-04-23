import React, {useEffect, useState, useMemo} from 'react'
import { Box,Button } from '@mui/material'


interface explorerViewProps{
    callBackSetPath(path:String):void;
}

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

interface folderViewProps{
    files:never[]
}

const FolderView = (props:folderViewProps) =>{

    const {files} = props;

    return (
        <Box sx={{width:1, height:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}} >
              {
                  files.map((file)=>{
                      return(
                        <div>{file.name}</div>
                      )
                  })
              }
        </Box>
      )
}

const Explorer = () => {
    const [folderPath, setFolderPath] = useState('');
    const [files, setFiles] = useState([]);
   

    useEffect(() => {
       if(folderPath != ""){
           window.electron.ipcRenderer.loadFiles(folderPath);
            window.electron.ipcRenderer.once('load-all-files',(arg:any)=>{
                 setFiles(arg);
            })
       }

    })
    
  return (
    <Box sx={{width:1, height:1, borderRadius:'5px', gridArea:'explorer'}} bgcolor={'primary.dark'}>
          {
              folderPath === ''? <ExplorerView callBackSetPath={(path:string) =>{setFolderPath(path)}} /> : <FolderView files={files}/>
          }
    </Box>
  )
}

export default Explorer