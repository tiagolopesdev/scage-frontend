import { toast } from "react-hot-toast"
import iconSuccess from "../../Assets/icon_success.svg"
import iconError from "../../Assets/icon_error.svg"
import { TextStyle, ToastContainer } from "./style"

interface ICustomToast {
  message: string,
  duration: number,
  icon: string
}

export const CustomToast = (props: ICustomToast) => {

  const { duration, icon, message } = props

  return toast.custom(
    <ToastContainer>
      <img src={icon}
        style={{ width: '25px', marginLeft: '15px' }}
        alt={message}
      />
      <TextStyle>{message}</TextStyle>
    </ToastContainer>,
    { duration }
  )
}
