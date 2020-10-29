import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import blueGrey from '@material-ui/core/colors/blueGrey';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: pink[500],
        },
        secondary: {
            main: blueGrey[500],
        },
    },
});