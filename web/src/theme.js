import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f46524',
    },
    secondary: {
      main: '#59205D',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    a: {
      color: 'white'
    }
  },
});

export default theme;
