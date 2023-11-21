import { Button, Card, CardContent, Chip } from "@mui/material"
import { Icon } from "../../Img"
import { Reorder, motion, useDragControls } from "framer-motion"
import { useContext, useEffect, useState } from "react"
import { ModalDay } from "../../ModalDay"
import { ScaleContext } from "../../../Context/scale"
import { GenerationPreviewScale } from "../../../Services/Scale"
import { getAllUsersService } from "../../../Services/Users"
import { ModalChangedSerf } from "../../ModalChangedSerf"
import { CustomToast } from "../../CustomToast"
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
import IconWarning from '../../../Assets/icon_warning.svg'
import CameraIcon from '../../../Assets/camera_icon.svg'
import DeskIcon from '../../../Assets/desk_icon.svg'
import IconSave from '../../../Assets/icon_success_white.svg'


interface ICardDay {
  day: IDay
}

export const CardDay = ({ day }: ICardDay) => {

  const controls = useDragControls()
  const { scaleContext, setScaleContext, setFromDay } = useContext(ScaleContext);

  const [dayToEdit, setDayToEdit] = useState<IDay>(day);
  const [openModalNewDay, setOpenModalNewDay] = useState(false);
  const [elements, setElements] = useState<IUser[]>([]);
  const [dateTimeFormated, setDateTimeFormated] = useState(`Dia ${dayjs(day.dateTime).format('DD/MM/YYYY')} às ${dayjs(day.dateTime).format('HH:mm')}`)
  const [daysList, setDaysList] = useState<IDay[]>([day]);
  const [isReorder, setIsReorder] = useState(false)
  const [modalIsVisible, setModalIsVisible] = useState(false);

  useEffect(() => {
    setElements([
      day.cameraOne as IUser,
      day.cameraTwo as IUser,
      day.cutDesk as IUser
    ])
    setDateTimeFormated(`Dia ${dayjs(day.dateTime).format('DD/MM/YYYY')} às ${dayjs(day.dateTime).format('HH:mm')}`)
    setDayToEdit(day)
    setIsReorder(false)
  }, [daysList, day.cameraOne, day.cameraTwo, day.cutDesk, day.dateTime])

  const ButtonActions = (isOutlined: boolean, iconToDisplay: string, onClick: () => void, customStyle?: any) => {
    return <Button
      style={{
        borderRadius: '10px',
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

  const Actions = () => {
    return <>
      {ButtonActions(false, String(PeopleEditIconWhite), () => { setOpenModalNewDay(!openModalNewDay) }, { backgroundColor: '#0966BB' })},
      {ButtonActions(false, String(IconReloadPeople),
        async () => {

          let responseUserApi: IUser[] = await getAllUsersService();

          let onlyUserId: any = []

          responseUserApi.filter((item) => {
            if (item.id !== day.cameraOne?.id && item.id !== day.cameraTwo?.id && item.id !== day.cutDesk?.id) {
              onlyUserId.push(item.id as string)
            }
          })

          const scalePreviewToSend = {
            users: onlyUserId,
            days: [day.name],
            name: scaleContext.name
          }

          const responseScalePreviewApi = await GenerationPreviewScale(scalePreviewToSend);

          var index = scaleContext.days.findIndex((item) => { return item === day })

          let daysInContext = scaleContext.days;

          daysInContext[index].cameraOne = responseScalePreviewApi[0].cameraOne
          daysInContext[index].cameraTwo = responseScalePreviewApi[0].cameraTwo
          daysInContext[index].cutDesk = responseScalePreviewApi[0].cutDesk
          daysInContext[index].isEnable = true

          setScaleContext({
            id: scaleContext.id,
            name: scaleContext.name,
            start: scaleContext.start,
            end: scaleContext.end,
            days: daysInContext,
            isEnable: scaleContext.isEnable
          })
        },
        { backgroundColor: 'rgb(14, 202, 101)' })
      }
      {ButtonActions(true, String(PeopleDeleteIconWhite),
        () => {
          const days = scaleContext.days.filter((item) => { return item.id !== day.id });

          days.push({
            id: day.id,
            name: day.name,
            dateTime: day.dateTime,
            cameraOne: day.cameraOne,
            cameraTwo: day.cameraTwo,
            cutDesk: day.cutDesk,
            isEnable: false
          })

          setScaleContext({
            id: scaleContext.id,
            name: scaleContext.name,
            start: scaleContext.start,
            end: scaleContext.end,
            days: days,
            isEnable: scaleContext.isEnable
          })
        },
        { border: '1px solid rgba(211, 47, 47, 0.5)' })
      }
    </>
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
          label={dateTimeFormated}
          color="success"
          variant="outlined"
        />
        <Reorder.Group values={elements}
          onReorder={(newReorder: any[]) => {
            setIsReorder(true)
            setElements(newReorder)
          }}
          style={{ listStyle: "none", paddingInlineStart: "0px" }}
        >
          {
            elements.map((item, index) => (
              <Reorder.Item value={item} key={item.id} >
                <PeopleContainer onPointerDown={(e) => controls.start(e)} >
                  <InformationPeopleContainer>
                    <Icon
                      src={
                        index === 2 ?
                        String(DeskIcon) :
                        String(CameraIcon)
                      }
                      style={{ width: '25px' }}
                      className="action-icon-indication"
                    />
                    <NamePeopleStyle>{item.name}</NamePeopleStyle>
                  </InformationPeopleContainer>
                  <IconSelectUserStyle >
                    <motion.div
                      className="box"
                      whileHover={{ scale: 1.07 }}
                      whileTap={{ scale: 1.0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Icon
                        className="change-collaborator"
                        src={String(SelectNewUserIcon)}
                        onClick={() => {
                          if (!day.id) {
                            CustomToast({ duration: 3000, message: "Salve a escala para mudar os servos", icon: String(IconWarning) })
                            return
                          }
                          setModalIsVisible(!modalIsVisible)
                          setFromDay({
                            day: day,
                            serf: item
                          })
                        }}
                      />
                    </motion.div>
                  </IconSelectUserStyle>
                </PeopleContainer>
              </Reorder.Item>
            ))
          }
        </Reorder.Group>
        <GroupButtonsStyle className="actions-card-event">
          {
            !isReorder ?
              Actions() :
              ButtonActions(false, String(IconSave),
                () => {

                  let daysContextToUpdate = scaleContext.days

                  let indexToInsertDay = scaleContext.days.findIndex((item) => { return item.id === day.id });

                  daysContextToUpdate.splice(indexToInsertDay, 1,
                    {
                      id: day.id,
                      dateTime: day.dateTime,
                      name: day.name,
                      isEnable: day.isEnable,
                      cameraOne: elements[0],
                      cameraTwo: elements[1],
                      cutDesk: elements[2]
                    })

                  setScaleContext({
                    id: scaleContext.id,
                    name: scaleContext.name,
                    start: scaleContext.start,
                    end: scaleContext.end,
                    isEnable: scaleContext.isEnable,
                    days: daysContextToUpdate
                  })

                  setIsReorder(false)
                },
                { backgroundColor: 'rgb(14, 202, 101)', width: '70%' }
              )
          }
        </GroupButtonsStyle>
      </CardContent>
      {
        openModalNewDay ?
          <ModalDay
            openModal={openModalNewDay}
            setOpenModal={setOpenModalNewDay}
            manipulationDay={day}
            setManipulationDay={setDayToEdit}
            listManipulationDay={daysList}
            setListManipulationDay={setDaysList}
          /> : ''
      }
      {
        modalIsVisible ?
          <ModalChangedSerf
            openModal={modalIsVisible}
            openModalState={setModalIsVisible}
          /> : ''
      }
    </Card >
  )
}
