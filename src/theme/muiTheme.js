import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { teal500, grey50, grey900, tealA700 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: tealA700,
    textColor: grey50,
    pickerHeaderColor: tealA700,
  },
});

export default muiTheme;
