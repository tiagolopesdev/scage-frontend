import { IconButton, Typography } from "@mui/material"
import { Icon } from "../Img"
import { ScaleContext } from "../../Context/scale"
import { useContext } from "react"
import { InitialStateThumbnaisl } from "../../@types/Youtube/InitialStateThumbnails"
import { FilesUploadedGroupStyle, InformationsFilesGroupStyle } from "./styles"

import DeleteIcon from '../../Assets/icon_trash.svg'


export const FileUploaded = () => {

  const { thumbnails, setThumbnails } = useContext(ScaleContext)

  const sizeFormated = (thumbnails.size / 1048576).toFixed(2)

  return <FilesUploadedGroupStyle>
    <Icon
      src={thumbnails.url}
      style={{
        width: '100px',
        height: '50px',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
      onClick={() => { window.open(thumbnails.url, '_blank') }}
    />
    <InformationsFilesGroupStyle>
      <Typography sx={{ fontWeight: 600 }}>{thumbnails.name}</Typography>
      <Typography sx={{ fontSize: 13 }} >{`${sizeFormated} MB`}</Typography>
    </InformationsFilesGroupStyle>
    <IconButton
      color="error"
      children={<Icon src={String(DeleteIcon)} />}
      onClick={() => { setThumbnails(InitialStateThumbnaisl) }}
    />
  </FilesUploadedGroupStyle>
}
