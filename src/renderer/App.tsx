import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import {Box  ,CssBaseline} from '@mui/material';
import { createTheme, ThemeProvider,responsiveFontSizes  } from '@mui/material/styles';
import { themeOptions } from './theming/themingOptions';
import icon from '../../assets/icon.svg';


import NavBar from './components/navBar';
import CodingArea from './components/codingArea';




import './App.css';

const theme = responsiveFontSizes(createTheme(themeOptions));

const App = ()=>{
  return (
    <Box>
      <ThemeProvider theme={theme} >
        <CssBaseline />
        <Box className='app'>
        <Router>
          <Routes>
            <Route path="/" element={<> <Box sx={{display:'flex', flexDirection:'column', width:'100%', height:'100vh'}}><NavBar/><CodingArea/></Box></>} />
          </Routes>
        </Router>
        </Box>
      </ThemeProvider>
    </Box>
  );
}


export default App;
