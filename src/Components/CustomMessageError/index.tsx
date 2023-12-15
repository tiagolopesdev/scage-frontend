import { Icon } from '../Img'

import ScaleNotFoundIcon from '../../Assets/icon_scale_notFound.svg'
import { Typography } from '@mui/material'


interface ICustomMessageError {
  message: string
}

export const CustomMessageError = ({ message }: ICustomMessageError) => {

  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  }}>
    <Icon src={String(ScaleNotFoundIcon)} style={{ width: '200px', margin: 0, padding: 0 }} />
    <Typography sx={{ fontSize: 17 }}>{message}</Typography>
  </div>
}