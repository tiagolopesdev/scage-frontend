import { toast } from "react-hot-toast"
import iconSuccess from "../../Assets/icon_success.svg"
import iconError from "../../Assets/icon_error.svg"

interface ICustomToast {
  message: string,
  duration: number,
  isError: boolean
}

export const CustomToast = (props: ICustomToast) => {

  const { duration, isError, message } = props

  const typeIconDisplay = isError ? String(iconError) : String(iconSuccess);

  const displayToast = () => {
    return toast.custom(
      <div style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.25)',
        borderRadius: '15px',
        display: 'flex',
        alignItems: "center"
      }}>
        <img src={typeIconDisplay}
          style={{ width: '25px', marginLeft: '15px' }}
        />
        <p style={{
          fontFamily: 'Dosis',
          fontSize: '1rem',
          fontWeight: '600',
          margin: '10px 15px 10px 5px'
        }} >{message}</p>
      </div>,
      {
        duration: duration
      }
    )
  }

  return <> {displayToast()} </>
}
