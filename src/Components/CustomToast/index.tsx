import { toast } from "react-hot-toast"
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
