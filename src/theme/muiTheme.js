import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { purple500 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    textColor: purple500,
    pickerHeaderColor: purple500,
  },
});

export default muiTheme;
