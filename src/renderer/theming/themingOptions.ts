import {ThemeOptions} from '@mui/material';

/**
 * this class takes care of the coloring of the entire app
 * changing said values affects 90% of app coloring
 * 
 * more info at :  https://mui.com/material-ui/customization/color/#main-content
 *           or    https://bareynol.github.io/mui-theme-creator/#text-buttons
 */

export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
          main: '#282828',
          light: '#282828',
          dark: '#282828',
        },
        secondary: {
          main: '#736a60',
          light: '#bdb2a7',
          dark: '#40382f',
        },
        background: {
          default: '#101010',
          paper: '#101010',
        },
        divider: '#60564d',
      },
      
}