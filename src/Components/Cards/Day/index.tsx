import { Button, Card, CardContent, Chip, Typography } from "@mui/material"
import SelectNewUserIcon from '../../../Assets/render_user.svg'
import CameraIcon from '../../../Assets/camera_icon.svg'
import DeskIcon from '../../../Assets/desk_icon.svg'
import { Icon } from "../../Img"
import { Reorder, useDragControls } from "framer-motion"
import { useEffect, useState } from "react"
import { IUser } from "../../../@types/IUser"
import { IDay } from "../../../@types/IScaleMonth"
import {
  IconSelectUserStyle,
  InformationPeopleContainer,
  NamePeopleStyle,
  PeopleContainer
} from "./style"


interface ICardDay {
  day: IDay
}

export const CardDay = ({ day }: ICardDay) => {

  const controls = useDragControls()

  const [elements, setElements] = useState<IUser[]>([]);
  const [dataTimeFormated] = useState(`${day.dateTime}`)

  useEffect(() => {
    let elementsToList: IUser[] = []

    elementsToList.push(day.cameraOne)
    elementsToList.push(day.cameraTwo)
    elementsToList.push(day.cutDesk)

    setElements(elementsToList)
  }, [])

  return (
    <Card style={{ width: '280px', height: '300px', margin: '1%' }}>
      <CardContent style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }} >
        <Typography gutterBottom variant="h5" component="div" color='#005AAC'
          style={{
            fontFamily: 'Dosis',
            fontWeight: 'bold'
          }}
        >
          {day.name}
        </Typography>
        <Chip style={{ width: '80%', height: '25px' }} label={dataTimeFormated} color="success" variant="outlined" />
        <Reorder.Group values={elements}
          onReorder={setElements}
          style={{
            listStyle: "none",
            paddingInlineStart: "0px"
          }}
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
        <Button
          style={{
            backgroundColor: 'rgb(14, 202, 101)',
            borderRadius: '15px',
            fontFamily: 'Dosis',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: '600',
            padding: '0px',
          }}
          variant="contained"
          size='small'
          onClick={() => { }}
          fullWidth
        >Salvar</Button>
      </CardContent>
    </Card>
  )
}
