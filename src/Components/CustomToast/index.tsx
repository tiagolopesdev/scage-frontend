import { toast } from "react-hot-toast"
import iconSuccess from "../../Assets/icon_success.svg"


export const CustomToast = () => {

  const displayToast = () => {
    return toast.custom(
      <div style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.25)',
        borderRadius: '15px',
        display: 'flex',
        alignItems: "center"
      }}>
        <img src={String(iconSuccess)} style={{ width: '25px', marginLeft: '15px' }} />
        <p style={{
          fontFamily: 'Dosis',
          fontSize: '1rem',
          fontWeight: '600',
          margin: '10px 15px 10px 5px'
        }} >Usuário criado com sucesso</p>
      </div>,
      {
        duration: 2000
      }
    )
  }

  return <> { displayToast() } </>
}
