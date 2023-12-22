import { Icon } from "../Img"
import IconCalendar from "../../Assets/icon_calendar_dark.svg"
import IconClock from "../../Assets/icon_clock_dark.svg"
import IconChange from "../../Assets/icon_changed.svg"
import { InformationContainerStyle, InformationGroupStyle, InformationStyle, TextStyle } from "./style"
import { IconButton } from "@mui/material"
import React, { useContext, useState } from "react"
import dayjs from "dayjs"
import { ChangeSerfPopover } from "./ModalConfirmation"
import { IDay } from "../../@types/IScaleMonth"
import { IUser } from "../../@types/IUser"
import { ScaleContext } from "../../Context/scale"


interface IEventSerf {
  day: IDay,
  user: IUser,
  isNotChange?: boolean
}

export const EventSerf = ({ day, user, isNotChange }: IEventSerf) => {

  const date = dayjs(day.dateTime).format('DD/MM/YYYY')
  const hour = dayjs(day.dateTime).format('HH:mm')

  const { setToDay } = useContext(ScaleContext);

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false)

  return <div key={`${day.id}-${user.id}`} style={{ display: 'flex', width: '100%' }}>
    <InformationContainerStyle>
      <TextStyle fontSize={15} isBold={true} >{day.name}</TextStyle>
      <InformationGroupStyle>
        <InformationStyle>
          <Icon src={String(IconCalendar)} />
          <TextStyle fontSize={12}>{date}</TextStyle>
        </InformationStyle>
        <InformationStyle>
          <Icon src={String(IconClock)} />
          <TextStyle fontSize={12}>{hour}</TextStyle>
        </InformationStyle>
      </InformationGroupStyle>
    </InformationContainerStyle>
    <IconButton
      style={isNotChange ? { display: 'none' } : undefined}
      onClick={() => {
        setToDay({
          day: day,
          serf: user
        })
        setOpenConfirmationModal(!openConfirmationModal)
      }}
    >
      <Icon src={String(IconChange)} />
    </IconButton>
    {
      openConfirmationModal ?
        <ChangeSerfPopover
          openModal={openConfirmationModal}
          openModalState={setOpenConfirmationModal}
        /> : ''
    }
  </div>
}
