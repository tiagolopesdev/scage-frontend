import { Icon } from "../Img"
import IconCalendar from "../../Assets/icon_calendar_dark.svg"
import IconClock from "../../Assets/icon_clock_dark.svg"
import IconChange from "../../Assets/icon_changed.svg"
import { InformationContainerStyle, InformationGroupStyle, InformationStyle, TextStyle } from "./style"
import { IconButton } from "@mui/material"
import React, { useState } from "react"
import dayjs from "dayjs"
import { FilterDUser } from "./Popover"


interface IEventSerf {
  name: string,
  dateTime: string
}

export const EventSerf = ({ name, dateTime}: IEventSerf) => {

  const date = dayjs(dateTime).format('DD/MM/YYYY')
  const hour = dayjs(dateTime).format('HH:mm')

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover-day' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return <div style={{ display: 'flex' }}>
    <InformationContainerStyle>
      <TextStyle fontSize={15} isBold={true} >{name}</TextStyle>
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
    <IconButton aria-describedby={id}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        handleClick(event)
      }}
    >
      <Icon src={String(IconChange)} />
    </IconButton>
    {
      <FilterDUser
        id={id}
        open={open}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    }
  </div>
}
