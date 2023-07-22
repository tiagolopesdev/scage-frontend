import { Box, Button, ButtonGroup, Modal, TextField } from "@mui/material"
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { ContainerElementsStyle, DateTimeGroupStyle } from "./style";
import dayjs, { Dayjs } from "dayjs";
import { Icon } from "../Img";
import SelectIcon from "../../Assets/icon_success_white.svg"
import CloseIcon from "../../Assets/icon_user_delete.svg"
import { IScaleMonthPreview } from "../../@types/IScaleMonthPreview";

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
  openModalState: React.Dispatch<React.SetStateAction<boolean>>,
  stateDay: IScaleMonthPreview[] | undefined,
  manipulationDay: React.Dispatch<React.SetStateAction<IScaleMonthPreview[] | undefined>>
  dayToEdit?: IScaleMonthPreview,
  setManipulationDay: React.Dispatch<React.SetStateAction<IScaleMonthPreview | undefined>>
}

export const ModalDay = (props: IModalGenerationScale) => {

  const { openModal, openModalState, manipulationDay, dayToEdit, stateDay, setManipulationDay } = props

  const [eventName, setEventName] = useState(dayToEdit ? dayToEdit.name : '');
  const [selectedDate, setHandleDateChange] = useState<Dayjs | null>(dayToEdit ? dayjs(dayToEdit.date, 'DD/MM/YYYY') : null);
  const [selectedTime, setHandleTimeChange] = useState<Dayjs | null>(dayToEdit ? dayjs(dayToEdit.time, 'h:mm A') : null);
  const [selectedDateTime, setSelectedDateTime] = useState<Dayjs>(dayjs(new Date()))

  const HandlerClose = () => {
    if (dayToEdit) setManipulationDay(undefined)
    openModalState(!openModal)
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
              value={selectedDate}
              onChange={(newValue) => {
                if (!newValue) return

                const newDate = selectedDateTime
                  .set('date', newValue?.get('date'))
                  .set('month', newValue?.get('month'))
                  .set('year', newValue?.get('year'))

                setSelectedDateTime(newDate)
                setHandleDateChange(newValue)
              }}
              renderInput={(params) => <TextField style={{ width: '200px', marginRight: '10px' }} {...params} />}
            />
            <TimePicker
              label="Hora do evento"
              value={selectedTime}
              onChange={(newValue) => {
                if (!newValue) return

                const newHour = selectedDateTime
                  .set('hour', newValue?.get('hour'))
                  .set('minute', newValue?.get('minute'))
                  .set('second', newValue?.get('second'))

                setSelectedDateTime(newHour)
                setHandleTimeChange(newValue)
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
                const newEventToInsert: IScaleMonthPreview = {
                  name: eventName,
                  date: dayjs(selectedDate).format('DD/MM/YYYY'),
                  time: dayjs(selectedTime).format('h:mm A'),
                  dateTime: selectedDateTime.format('YYYY-MM-DDTHH:mm:ss')
                }
                if (stateDay !== undefined) {
                  if (dayToEdit) {
                    const day = stateDay.filter((item) => { return item !== dayToEdit })

                    day.push(newEventToInsert)

                    manipulationDay(day)
                  } else {
                    manipulationDay([...stateDay, newEventToInsert])
                  }
                } else {
                  manipulationDay([newEventToInsert])
                }
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
