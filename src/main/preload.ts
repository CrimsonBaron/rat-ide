/**
 * this class takes care for exposing electron functionality to the renderer framework
 * via electron interface 
 */


import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    close(){
      ipcRenderer.send('btn-close');
    },
    minimize(){
      ipcRenderer.send('btn-minimize');
    },
    maximize(){
      ipcRenderer.send('btn-maximize');
    },
    getFolderPath(){
      ipcRenderer.send('get-folder-path');
    },
    loadFiles(path:String){
      ipcRenderer.send('load-all-files', path);
    },
    loadFile(path:string){
      ipcRenderer.send('load-file', path);
    },
    displayFile(fileEnd:string){
      ipcRenderer.send("show-file",fileEnd);
    },
    writeFile(content:String){
      ipcRenderer.send("save-file", content);
    },
    closeProject(){
      ipcRenderer.send("close-project");
    },
    undo(){
      ipcRenderer.send("editor-undo");
    },
    redo(){
      ipcRenderer.send("editor-redo");
    },
    on(channel: string, func: (...args: unknown[]) => void) {
      const validChannels = ['ipc-example','get-folder-path','load-all-files','show-file','load-file', "close-project","editor-undo","editor-paste","editor-copy","editor-cut","editor-redo","editor-undo"];
      if (validChannels.includes(channel)) {
        const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
          func(...args);
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, subscription);

        return () => ipcRenderer.removeListener(channel, subscription);
      }

      return undefined;
    },
    once(channel: string, func: (...args: unknown[]) => void) {
      const validChannels = ['ipc-example','get-folder-path','load-all-files','show-file','load-file',"close-project","editor-undo","editor-paste","editor-copy","editor-cut","editor-redo","editor-undo"];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (_event, ...args) => func(...args));
      }
    },
  },
});
