import { IconButton, Typography } from "@mui/material"
import { Icon } from "../Img"
import { ScaleContext } from "../../Context/scale"
import { useContext, useEffect, useState } from "react"
import { FilesUploadedGroupStyle, InformationsFilesGroupStyle } from "./styles"

import DeleteIcon from '../../Assets/icon_trash.svg'
import { IDay } from "../../@types/IScaleMonth"


interface IFileUploaded {
  day: IDay
}
export const FileUploaded = ({ day }: IFileUploaded) => {

  const { scaleContext, setScaleContext } = useContext(ScaleContext)

  const [thumbnailsOfTheDay, setThumbnailsOfTheDay] = useState<IDay>()


  useEffect(() => {
    const thumbnailsFounded = scaleContext.days.find((item: IDay) => { return item.id === day.id })
    if (thumbnailsFounded) setThumbnailsOfTheDay(thumbnailsFounded)
  }, [])

  const sizeFormated = (thumbnailsOfTheDay?.thumbnails?.size as number / 1048576).toFixed(2)

  return <FilesUploadedGroupStyle>
    <Icon
      src={thumbnailsOfTheDay?.thumbnails?.url ?? ''}
      style={{
        width: '100px',
        height: '50px',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
      onClick={() => { window.open(thumbnailsOfTheDay?.thumbnails?.url ?? '', '_blank') }}
    />
    <InformationsFilesGroupStyle>
      <Typography sx={{ fontWeight: 600 }}>{thumbnailsOfTheDay?.thumbnails?.name ?? ''}</Typography>
      <Typography sx={{ fontSize: 13 }} >{`${sizeFormated} MB`}</Typography>
    </InformationsFilesGroupStyle>
    <IconButton
      color="error"
      children={<Icon src={String(DeleteIcon)} />}
      onClick={() => {

        let dayWithoutThumbnails: IDay[] = scaleContext.days

        let indexToRemove = dayWithoutThumbnails.findIndex((item) => { return item === day })

        dayWithoutThumbnails.splice(indexToRemove, 1, {
          name: day.name,
          dateTime: day.dateTime,
          cameraOne: day.cameraOne,
          cameraTwo: day.cameraTwo,
          cutDesk: day.cutDesk,
          id: day.id,
          isEnable: day.isEnable,
          liveStreamId: day.liveStreamId,
        })

        setScaleContext({
          ...scaleContext, ...{
            id: scaleContext.id,
            name: scaleContext.name,
            start: scaleContext.start,
            end: scaleContext.end,
            days: dayWithoutThumbnails,
            isEnable: scaleContext.isEnable
          }
        })
      }}
    />
  </FilesUploadedGroupStyle>
}
