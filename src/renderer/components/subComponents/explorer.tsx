import React, {useEffect, useState, useMemo} from 'react'
import { Box,Button } from '@mui/material'
import Tree from "./tree/tree"

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
    const [tree, setTree] = useState({});

    const convertChildren = async (children: any)=>{
        let files:any[] = [];

        (children || []).map( ((file:any) =>{
            if(file.type ==="file"){
              files.push({
                type: "file", 
                name: file.name
              })
            }else{
              files.push({
                type:"folder",
                name: file.name,
                files:  convertChildren(file.children)
              })
            }
        }))
        return files;
    }

    const convertToTreeStructure = async (files:any)=>{
      const tree = {
        type: "folder",
        name: files.name ,
        files: await convertChildren(files.children)
      }
      return tree;
   }

   const convert= async()=>{
     const localTree = await convertToTreeStructure(files);
     await setTree(localTree );


   }

   useEffect(()=>{

     convert();
   })



    return (
        <Box sx={{width:1, height:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}} >
            <Tree files={tree} />
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