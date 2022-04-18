import React, {useEffect, useRef} from 'react'
import { Box } from '@mui/material'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit';

const AppTerminal = () => {
    const terminal = new Terminal({
        convertEol: true,
      fontSize: 15,
      rendererType: 'dom',
      cursorBlink:true,
    });
    const fitAddon = new FitAddon();

    useEffect(()=>{
        const terminalRef = document.getElementById('termArea');
        if(terminalRef !=null){
            terminal.loadAddon(fitAddon);
            terminal.open(terminalRef);
            
        }
        terminal.write('hello world');
        fitAddon.fit();
    })

    /**
     * <div id='termArea' className='term'></div>
     */

  return (
    <Box id='termArea' sx={{gridArea:'terminal', borderRadius:'5px', display:'flex', width:1, height:1}} bgcolor={'primary.dark'}>
    </Box>
  )
}

export default AppTerminal