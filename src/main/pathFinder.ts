import { BrowserWindow, ipcMain, dialog  } from "electron";
import path from 'path';
import fs from 'fs';

const findPathEvents = (mainWindow:any)=>{

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
          
          const files = fs
          .readdirSync(folderPath)
          .map(file => {
            const stats = fs.statSync(path.join(folderPath, file))
            return {
              name: file,
              directory: stats.isDirectory()
            }
          })
          .sort((a, b) => {
            if (a.directory === b.directory) {
              return a.name.localeCompare(b.name)
            }
            return a.directory ? -1 : 1
          })

          event.reply('load-all-files', files);
    })
}

export default findPathEvents