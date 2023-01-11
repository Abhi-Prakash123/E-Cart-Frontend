
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
const theme = createTheme({
    props: {
        MuiTooltip: {
            arrow: true,
        },
    },
    palette: {
        primary: {
            main: '#282928',
        },
        secondary: {
            main: '#FFFFFF',
        },
        success: {
            main:"#00FF00"
        },
        text: {
            primary: '#000000',
            secondary: '#FFFFFF',
        },
    },

})

export default responsiveFontSizes(theme);