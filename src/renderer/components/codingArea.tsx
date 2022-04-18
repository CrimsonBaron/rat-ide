
import { Box,Paper  } from '@mui/material'
import { styled } from '@mui/material/styles';
import React from 'react'

import Editor from './subComponents/editor';
import AppTerminal from './subComponents/terminal';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#282828' : '#282828',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const CodingArea = () => {
  return (
    <Box sx={{flex:1, display:'flex', paddingLeft:1,paddingRight:1,paddingBottom:2}} className='nonDragable'>     
        <div className='grid'>
            <Item key={1} sx={{gridArea:'explorer'}}>explorer</Item >
            <AppTerminal/>
            <Editor/>
        </div>
    </Box>
  )
}

export default CodingArea