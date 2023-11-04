import { LocalizationProvider } from "@mui/x-date-pickers"
import { RenderScale } from "./Pages/RenderScage"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { ScaleProvider } from "./Context/scale"
import { GlobalStyle } from "./Styles"


export const App = () => {

  return (
    <ScaleProvider>
      <GlobalStyle />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RenderScale />
      </LocalizationProvider>
    </ScaleProvider>
  )
}
