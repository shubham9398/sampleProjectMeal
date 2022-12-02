import { blue, pink } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Nanum Gothic',
  },
  palette: {
      primary: blue,
      secondary: pink,
  },
});

export default theme;