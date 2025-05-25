import { createTheme } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E535AB',
      contrastText: '#fff',
    },
    secondary: {
      main: blue[500],
      contrastText: '#fff',
    },
    error: {
      main: red[500],
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
