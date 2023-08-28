import { Button, Card, CardContent, Chip } from "@mui/material"
import { Icon } from "../../Img"
import { Reorder, useDragControls } from "framer-motion"
import { useEffect, useState } from "react"
import { IUser } from "../../../@types/IUser"
import { IDay } from "../../../@types/IScaleMonth"
import dayjs from "dayjs"

import {
  GroupButtonsStyle,
  IconSelectUserStyle,
  InformationPeopleContainer,
  NameDayStyle,
  NamePeopleStyle,
  PeopleContainer
} from "./style"
import PeopleDeleteIconWhite from "../../../Assets/icon_user_delete.svg"
import PeopleEditIconWhite from "../../../Assets/icon_edit_day.svg"
import IconReloadPeople from "../../../Assets/icon_refresh.svg"
import SelectNewUserIcon from '../../../Assets/render_user.svg'
import CameraIcon from '../../../Assets/camera_icon.svg'
import DeskIcon from '../../../Assets/desk_icon.svg'
import { ModalDay } from "../../ModalDay"
import { IScaleMonthPreview } from "../../../@types/IScaleMonthPreview"

interface ICardDay {
  day: IDay
}

export const CardDay = ({ day }: ICardDay) => {

  const controls = useDragControls()
  
  const [daysList, setDaysList] = useState<IScaleMonthPreview[] | undefined>();
  const [dayToEdit, setDayToEdit] = useState<IDay>(day);
  const [openModalNewDay, setOpenModalNewDay] = useState(false);
  const [elements, setElements] = useState<IUser[]>([]);
  const [dataTimeFormated] = useState(`Dia ${dayjs(day.dateTime).format('DD/MM/YYYY')} às ${dayjs(day.dateTime).format('HH:mm')}`)

  useEffect(() => {
    let elementsToList: IUser[] = []

    elementsToList.push(day.cameraOne as IUser)
    elementsToList.push(day.cameraTwo as IUser)
    elementsToList.push(day.cutDesk as IUser)

    setElements(elementsToList)
  }, [])

  const ButtonActions = (isOutlined: boolean, iconToDisplay: string, onClick: () => void, customStyle?: any) => {
    return <Button
      style={{
        borderRadius: '15px',
        padding: '2px',
        margin: '0px 5px',
        ...customStyle
      }}
      variant={isOutlined ? 'outlined' : 'contained'}
      size='small'
      onClick={onClick}
      fullWidth
    ><Icon src={iconToDisplay} /></Button>
  }

  return (
    <Card style={{ width: '280px', height: '310px', margin: '1%' }}>
      <CardContent style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }} >
        <NameDayStyle>
          {day.name}
        </NameDayStyle>
        <Chip style={{
          width: '80%',
          height: '19px',
          backgroundColor: "rgb(14, 202, 101)",
          color: 'white',
          border: '0px'
        }}
          label={dataTimeFormated}
          color="success"
          variant="outlined"
        />
        <Reorder.Group values={elements} onReorder={setElements}
          style={{ listStyle: "none", paddingInlineStart: "0px" }}
        >
          {
            elements.map((item, index) => (
              <Reorder.Item value={item} key={item.id} >
                <PeopleContainer onPointerDown={(e) => controls.start(e)}>
                  <InformationPeopleContainer>
                    <Icon src={index === 2 ? String(DeskIcon) : String(CameraIcon)} style={{ width: '25px' }} />
                    <NamePeopleStyle>{item.name}</NamePeopleStyle>
                  </InformationPeopleContainer>
                  <IconSelectUserStyle>
                    <Icon src={String(SelectNewUserIcon)} />
                  </IconSelectUserStyle>
                </PeopleContainer>
              </Reorder.Item>
            ))
          }
        </Reorder.Group>
        <GroupButtonsStyle>
          {ButtonActions(false, String(IconReloadPeople), () => { }, { backgroundColor: 'rgb(14, 202, 101)' })}
          {ButtonActions(false, String(PeopleEditIconWhite), () => { setOpenModalNewDay(!openModalNewDay) }, { backgroundColor: '#0966BB' })}
          {ButtonActions(true, String(PeopleDeleteIconWhite), () => { }, { border: '1px solid rgba(211, 47, 47, 0.5)' })}
        </GroupButtonsStyle>
      </CardContent>
      {
        openModalNewDay ?
          <ModalDay
            openModal={openModalNewDay}
            setOpenModal={setOpenModalNewDay}
            dayToEdit={day}
            setManipulationDay={setDayToEdit}
            // manipulationDay={setDaysList}
            // stateDay={undefined}
          /> : ''
      }
    </Card >
  )
}
