import { BrowserWindow, ipcMain, dialog  } from "electron";
import path from 'path';
import fs from 'fs';

const dirTree = require("directory-tree");

interface fileProps{
  type:String
  name:String
  files:any
}

const findPathEvents = (mainWindow:any)=>{

  

  const recursiveFiles = async (dir:any) =>{
    return dirTree(dir, {attributes:["type", "extension"]});
  }

    ipcMain.on('get-folder-path', async (event,arg)=>{
        const {filePaths} = await  dialog.showOpenDialog(mainWindow,{
            properties:['openDirectory']
        })
        console.log(filePaths[0])
       //event.sender.send('get-folder-path',filePaths[0])
      await event.reply('get-folder-path',filePaths[0])
   
    })

    ipcMain.on('load-all-files', async (event,arg)=>{
          const folderPath = arg;
          
          const files = await  recursiveFiles(folderPath)
          event.reply('load-all-files', files);
    })
}

export default findPathEvents