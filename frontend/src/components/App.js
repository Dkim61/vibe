import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const regularTheme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#90caf9', //light blue

      contrastText: 'white',
    },
    secondary: {
      main: '#64489b', //dark pink
      contrastText: 'white',
    },
    background: {
      default: '#d1c4e9'
    }
  }
});


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ThemeProvider theme={regularTheme}>
      <CssBaseline />
      <div className="center">
        <div className="HomePage">
        <HomePage />
        </div>
      </div>
      </ThemeProvider>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);


