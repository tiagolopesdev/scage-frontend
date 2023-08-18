import { LocalizationProvider } from "@mui/x-date-pickers"
import { RenderScale } from "./Pages/RenderScage"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { ScaleProvider } from "./Context/scale"


export const App = () => {

  return (
    <ScaleProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RenderScale />
      </LocalizationProvider>
    </ScaleProvider>
  )
}
