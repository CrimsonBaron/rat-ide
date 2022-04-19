import React, {useEffect, useState} from 'react'
import { Box,TextField } from '@mui/material'

const AppTerminal = () => {

  const [text, setText] = useState("dada");

   
    useEffect(()=>{
      
    })

    const handleTextFieldChange = (e:any) =>{
      setText(e.target.value)
    }
    /**
     * <div id='termArea' className='term'></div>
     * variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
     */

  return (
    <Box sx={{gridArea:'terminal', borderRadius:'5px', display:'flex',  }} bgcolor={'primary.dark'}>
      
       

    </Box>
  )
}

export default AppTerminal