import { toast } from "react-hot-toast"
import iconSuccess from "../../Assets/icon_success.svg"
import iconError from "../../Assets/icon_error.svg"
import { TextStyle, ToastContainer } from "./style"

interface ICustomToast {
  message: string,
  duration: number,
  isError: boolean
}

export const CustomToast = (props: ICustomToast) => {

  const { duration, isError, message } = props

  const typeIconDisplay = isError ? String(iconError) : String(iconSuccess);

  return toast.custom(
    <ToastContainer>
      <img src={typeIconDisplay}
        style={{ width: '25px', marginLeft: '15px' }}
        alt={message}
      />
      <TextStyle>{message}</TextStyle>
    </ToastContainer>,
    { duration }
  )
}
