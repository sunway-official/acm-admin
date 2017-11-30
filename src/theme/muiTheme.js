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
    primary1Color: colors.sanJuan,
    accent1Color: grey300,
  },
  appBar: {
    color: colors.sanJuan,
  },
  badge: {
    color: colors.sunglow,
    textColor: colors.sanJuan,
    primaryColor: colors.sunglow,
    primaryTextColor: colors.sanJuan,
  },
  datePicker: {
    color: colors.sanJuan,
    selectColor: colors.sunglow,
    headerColor: colors.sanJuan,
  },
  dialog: {
    titleFontSize: 30,
  },
  floatingActionButton: {
    color: colors.sanJuan,
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
    textColor: colors.sanJuan,
    errorColor: colors.outrageousOrange,
    focusColor: colors.sunglow,
  },
  timePicker: {
    color: colors.sanJuan,
    accentColor: colors.sunglow,
    headerColor: colors.sanJuan,
    selectColor: colors.sunglow,
  },
  toggle: {
    thumbOnColor: colors.sunglow,
    trackOnColor: colors.sunglow,
  },
});

export default muiTheme;
