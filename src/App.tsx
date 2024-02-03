import { LocalizationProvider } from "@mui/x-date-pickers"
import { RenderScale } from "./Pages/RenderScage"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { ScaleProvider } from "./Context/scale"
import { GlobalStyle } from "./Styles"
import { ThemeProvider, createTheme } from "@mui/material"


export const theme = createTheme({
  palette: {
    success: {
      main: 'rgb(14, 202, 101)',
      contrastText: '#FFFFFF'
    }
  },
  typography: {
    fontFamily: 'Dosis',    
    fontWeightBold: 700,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  },
})

export const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <ScaleProvider>
        <GlobalStyle />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
          <RenderScale />
        </LocalizationProvider>
      </ScaleProvider>
    </ThemeProvider>
  )
}
