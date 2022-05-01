/**
 * this class takes care of folder tree path finding in os
 * recursive folder tree structure generation
 * file loading and file saving
 */



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

  
  // recursive file tree structure generation
  const recursiveFiles = async (dir:any) =>{
    return dirTree(dir, {attributes:["type", "extension"]});
  }

  // event listener for opening path getting dialog
    ipcMain.on('get-folder-path', async (event,arg)=>{
        const {filePaths} = await  dialog.showOpenDialog(mainWindow,{
            properties:['openDirectory']
        })
        console.log(filePaths[0])
      await event.reply('get-folder-path',filePaths[0])
   
    })

    // recursive file tree event listener
    ipcMain.on('load-all-files', async (event,arg)=>{
          const folderPath = arg;
          
          const files = await  recursiveFiles(folderPath)
          event.reply('load-all-files', files);
    })

    // listener for for setting the editor coloring and autocomplete session
    ipcMain.on('show-file', async (event,arg)=>{
      const end = arg;
      event.reply('show-file', end);
    })

    let PATH:string = "";

    // listener for loading file content
    ipcMain.on('load-file', async (event,arg)=>{
      const path = arg;
      PATH = arg;
      
      if (path != undefined || path != '' || !fs.statSync(path).isDirectory()){
        fs.readFile(path, 'utf-8',async (err, data) => {
          if(err){
              console.log(err);
              return;
          }
          console.log(data);
          event.reply('load-file', data);
      });
      }      
    })

        // listener for saving file content
    ipcMain.on("save-file",  (event,arg)=>{
      const content = arg;
      if(content != " " || content != undefined || PATH != "" || PATH != undefined){
        console.log(content);
        fs.writeFileSync(PATH,content,'utf-8');
      }
    })
}

export default findPathEvents