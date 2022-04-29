
import { Box } from '@mui/material'


import Editor from './subComponents/editor';
import Explorer from './subComponents/explorer';

/**
 * this class takes care of the coding stuff
 * such ass rendering the file tree view :: <Explorer/>
 *                        coding editor :: <Editor/>
 */

const CodingArea = () => {
  return (
    <Box sx={{flex:1, display:'flex', paddingLeft:1,paddingRight:1,paddingBottom:2}} className='nonDragable'>     
        <div className='grid'>
            <Explorer/>
            <Editor/>
        </div>
    </Box>
  )
}

export default CodingArea