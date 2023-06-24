import { LocalizationProvider } from "@mui/x-date-pickers"
import { RenderScale } from "./Pages/RenderScage"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"


export const App = () => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RenderScale />
    </LocalizationProvider>
  )
}
