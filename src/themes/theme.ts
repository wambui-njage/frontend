import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5ACCCC",
      dark: "#335C6E",
      light: "#CFFAFA",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#F76434",
      contrastText: "#FFE6DC",
    },
    error: {
      main: "#F76434",
    },
    warning: {
      main: "#FAAD00",
    },
    common: {
      white: "#FFFFFF",
      black: "#000000",
    },
  },
  typography: {
    fontFamily: "Mulish, Arial, sans-serif",
  },
});

export default theme;
