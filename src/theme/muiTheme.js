import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey300, deepOrange500, red600 } from 'material-ui/styles/colors';
const colors = {
  white: '#ffffff',
};
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: deepOrange500,
    accent1Color: deepOrange500,
  },
  raisedButton: {
    // primaryColor: colors.white,
    // primaryTextColor: deepOrange500,
    secondaryColor: red600,
  },
  tabs: {
    backgroundColor: colors.white,
    textColor: grey300,
    selectedTextColor: deepOrange500,
  },
});

export default muiTheme;
