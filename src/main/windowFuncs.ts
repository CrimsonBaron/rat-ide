/**
 * this class takes care of basic window and top bar menu
 * functions
 * 
 */

import { BrowserWindow, ipcMain } from "electron";

const WindowFunc = (mainWindow: BrowserWindow) =>{

    // listener for minimization of the app
    ipcMain.on('btn-minimize',  async(event, arg)=>{
        event.preventDefault();
        mainWindow.minimize();
    })

    // listener for maximization of the app
    ipcMain.on('btn-maximize',async (event, arg)=>{
        event.preventDefault();
        if(!mainWindow.isMaximized()){
            mainWindow.maximize();
            return;
        }
        mainWindow.restore();
    })

    // listener for close app event
    ipcMain.on('btn-close',async  (event, arg)=>{
        event.preventDefault();
        mainWindow.close();
    })

    // listener for closing the folder tree view
    ipcMain.on("close-project", (event, arg)=>{
        event.reply("close-project");
    })

    // listener for editor undo event
    ipcMain.on("editor-undo", (event, arg)=>{
        event.reply("editor-undo");
    })

    // listener for editor redo event
    ipcMain.on("editor-redo", (event, arg)=>{
        event.reply("editor-redo");
    })

}


export default WindowFunc 