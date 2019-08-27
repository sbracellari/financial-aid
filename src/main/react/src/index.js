import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import CssBaseline from '@material-ui/core/CssBaseline'
import { StylesProvider, createGenerateClassName } from '@material-ui/styles'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const project_name = 'financialaid'

const oaklandTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#b89f74',
      main: '#877148',
      dark: '#58461f',
      contrastText: '#fff'
    },
    secondary: {
      light: '#56a2ea',
      main: '#0074b7',
      dark: '#004987',
      contrastText: '#fff'
    }
  }
})
const generateClassName = createGenerateClassName({
  productionPrefix: project_name
})

ReactDOM.render(
  <StylesProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={oaklandTheme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </StylesProvider>,
  document.getElementById(project_name)
)
