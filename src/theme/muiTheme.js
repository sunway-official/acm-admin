import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { deepOrange500, grey300 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: deepOrange500,
    accent1Color: grey300,
    pickerHeaderColor: deepOrange500,
  },
});

export default muiTheme;
