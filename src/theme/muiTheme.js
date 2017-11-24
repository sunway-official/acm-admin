import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey300 } from 'material-ui/styles/colors';
const colors = {
  shark: '#2f3440',
  sanJuan: '#3E5566',
  milkPunch: '#f6e6be',
  sunglow: '#f9cb3e',
  outrageousOrange: '#ec5f3e',
};
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: colors.shark,
    accent1Color: grey300,
    // accent2Color: deepOrange500,
  },
  appBar: {
    color: colors.shark,
  },
  datePicker: {
    color: colors.shark,
    selectColor: colors.sunglow,
    headerColor: colors.shark,
  },
  dialog: {
    titleFontSize: 30,
  },
  floatingActionButton: {
    color: colors.shark,
  },
  listItem: {
    nestedLevelDepth: 1000,
  },
  raisedButton: {
    color: colors.outrageousOrange,
    textColor: colors.milkPunch,
    primaryColor: colors.sunglow,
  },
  tabs: {
    backgroundColor: colors.sanJuan,
    selectedTextColor: colors.milkPunch,
  },
  textField: {
    textColor: colors.shark,
    errorColor: colors.outrageousOrange,
    focusColor: colors.sunglow,
  },
  timePicker: {
    color: colors.shark,
    accentColor: colors.sunglow,
    headerColor: colors.shark,
    selectColor: colors.sunglow,
  },
  toggle: {
    thumbOnColor: colors.sunglow,
    trackOnColor: colors.sunglow,
  },
});

export default muiTheme;
