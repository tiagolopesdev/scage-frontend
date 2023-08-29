import { Box, Button, ButtonGroup, Modal, TextField } from "@mui/material"
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { ContainerElementsStyle, DateTimeGroupStyle } from "./style";
import dayjs, { Dayjs } from "dayjs";
import { Icon } from "../Img";
import SelectIcon from "../../Assets/icon_success_white.svg"
import CloseIcon from "../../Assets/icon_user_delete.svg"
import { IScaleMonthPreview } from "../../@types/IScaleMonthPreview";
import IconWarning from '../../Assets/icon_warning.svg'
import { CustomToast } from "../CustomToast";
import { IDay } from "../../@types/IScaleMonth";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};

interface IModalGenerationScale {
  openModal: boolean,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  manipulationDay: IDay,
  setManipulationDay: React.Dispatch<React.SetStateAction<IDay>>
  listManipulationDay: IDay[]
  setListManipulationDay: React.Dispatch<React.SetStateAction<IDay[]>>
}

export const ModalDay = (props: IModalGenerationScale) => {

  const { openModal, setOpenModal, manipulationDay, setManipulationDay, listManipulationDay, setListManipulationDay } = props

  const [eventName, setEventName] = useState(manipulationDay ? manipulationDay.name : '');
  const [selectedDateTime, setSelectedDateTime] = useState<Dayjs | null>(manipulationDay?.dateTime ? dayjs(manipulationDay?.dateTime) : null)



  const HandlerClose = () => {
    // if (manipulationDay) setManipulationDay(undefined)
    setOpenModal(!openModal)
  }

  const ButtonStyleCustom = (customStyle: any) => ({
    borderRadius: '12px',
    fontFamily: 'Dosis',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    padding: '5px 0px',
    ...customStyle
  })

  return (
    <Modal
      open={openModal}
      onClose={() => { HandlerClose() }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ContainerElementsStyle>
          <TextField
            label="Nome"
            variant="standard"
            id="standard-basic"
            value={eventName}
            onChange={(event: any) => { setEventName(event.target.value) }}
            style={{ marginTop: '20px' }}
          />
          <DateTimeGroupStyle>
            <DatePicker
              inputFormat="DD/MM/YYYY"
              label="Data do evento"
              value={selectedDateTime}
              onChange={(newValue) => {
                newValue ? setSelectedDateTime(newValue) : setSelectedDateTime(newValue)
              }}
              renderInput={(params) => <TextField style={{ width: '200px', marginRight: '10px' }} {...params} />}
            />
            <TimePicker
              label="Hora do evento"
              value={selectedDateTime}
              onChange={(newValue) => {
                newValue ? setSelectedDateTime(newValue) : setSelectedDateTime(newValue)
              }}
              renderInput={(params) => <TextField style={{ width: '200px', marginLeft: '10px' }} {...params} />}
            />
          </DateTimeGroupStyle>
          <ButtonGroup style={{ marginTop: '40px' }}>
            <Button
              style={ButtonStyleCustom({ marginRight: '10px', backgroundColor: 'rgb(14, 202, 101)', border: '1px solid rgb(14, 202, 101)' })}
              variant="outlined"
              size='small'
              fullWidth
              onClick={() => {
                if (!eventName || !selectedDateTime?.format('DD/MM/YYYY') || !selectedDateTime?.format('h:mm A')) {
                  CustomToast({ duration: 2000, message: 'Preencha todos os campos', icon: String(IconWarning) })
                  return
                }

                console.log('Mani ', manipulationDay)

                if (manipulationDay.name !== '' && manipulationDay.dateTime !== '') {
                  // if (manipulationDay) {
                  const day = listManipulationDay.filter((item) => { return item !== manipulationDay })

                  //     day.push(newEventToInsert)

                  //     manipulationDay(day)
                  //   } else {
                  //     manipulationDay([...stateDay, newEventToInsert])
                  //   }
                  setManipulationDay({
                    name: eventName,
                    dateTime: selectedDateTime.format('YYYY-MM-DDTHH:mm:ss'),
                    cameraOne: manipulationDay.cameraOne,
                    cameraTwo: manipulationDay.cameraTwo,
                    cutDesk: manipulationDay.cutDesk
                  })
                } else {
                  setListManipulationDay([{
                    name: eventName,
                    dateTime: selectedDateTime.format('YYYY-MM-DDTHH:mm:ss')
                  }])
                  console.log('New element')
                }

                // const newEventToInsert: IScaleMonthPreview = {
                //   name: eventName,
                //   date: dayjs(selectedDateTime).format('DD/MM/YYYY'),
                //   time: dayjs(selectedDateTime).format('h:mm A'),
                //   dateTime: selectedDateTime.format('YYYY-MM-DDTHH:mm:ss')
                // }
                // if (manipulationDay !== undefined) {
                //   if (manipulationDay) {
                //     const day = stateDay.filter((item) => { return item !== manipulationDay })

                //     day.push(newEventToInsert)

                //     manipulationDay(day)
                //   } else {
                //     manipulationDay([...stateDay, newEventToInsert])
                //   }
                // } else {
                //   manipulationDay([newEventToInsert])
                // }
                HandlerClose()
              }}
            ><Icon src={String(SelectIcon)} /></Button>
            <Button
              style={ButtonStyleCustom({ marginLeft: '10px', color: '#CA0E0E', border: '1px solid #CA0E0E' })}
              variant="outlined"
              size='small'
              fullWidth
              onClick={() => { HandlerClose() }}
            ><Icon src={String(CloseIcon)} /></Button>
          </ButtonGroup>
        </ContainerElementsStyle>
      </Box>
    </Modal >
  )
}
