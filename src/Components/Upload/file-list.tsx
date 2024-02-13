import { Button, IconButton, Typography } from "@mui/material"

import DeleteIcon from '../../Assets/icon_trash.svg'
import EyeIcon from '../../Assets/icon_eye_image.svg'
import { Icon } from "../Img"
import { ScaleContext } from "../../Context/scale"
import { useContext } from "react"
import { InitialStateThumbnaisl } from "../../@types/Youtube/InitialStateThumbnails"


export const FileUploaded = () => {

  const { thumbnails, setThumbnails } = useContext(ScaleContext)

  const sizeFormated = (thumbnails.size / 1048576).toFixed(2)

  return <div style={{ alignItems: 'center', display: 'flex', flexDirection: "row", width: '100%' }}>
    <img
      src={thumbnails.url}
      style={{
        width: '100px',
        height: '50px',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
      onClick={() => { window.open(thumbnails.url, '_blank') }}
    />
    <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Typography sx={{ fontWeight: 600 }}>{thumbnails.name}</Typography>
      <Typography sx={{ fontSize: 13 }} >{`${sizeFormated} MB`}</Typography>
    </div>
    <IconButton children={<Icon src={String(DeleteIcon)} />} color="error"
      onClick={() => { setThumbnails(InitialStateThumbnaisl) }}
    />
  </div>
}
