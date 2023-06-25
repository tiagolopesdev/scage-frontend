import { Box, Button, ButtonGroup, Modal, TextField } from "@mui/material"
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { ContainerElementsStyle, DateTimeGroupStyle } from "./style";
import { Dayjs } from "dayjs";
import { Icon } from "../Img";
import SelectIcon from "../../Assets/icon_success_white.svg"
import CloseIcon from "../../Assets/icon_user_delete.svg"

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
  openModal: boolean;
  openModalState: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalDay = (props: IModalGenerationScale) => {

  const { openModal, openModalState } = props

  const [selectedDate, setHandleDateChange] = useState<Dayjs | null>();
  const [selectedTime, setHandleTimeChange] = useState<Dayjs | null>();

  const HandlerClose = () => {
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

  // console.log('Date ', dayjs(selectedDate).format('DD/MM/YYYY'))
  // console.log('Time ', dayjs(selectedTime).format('h:mm A'))

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
            style={{ marginTop: '20px' }}
          />
          <DateTimeGroupStyle>
            <DatePicker
              inputFormat="DD/MM/YYYY"
              label="Data do evento"
              value={selectedDate}
              onChange={(newValue) => { setHandleDateChange(newValue) }}
              renderInput={(params) => <TextField style={{ width: '200px', marginRight: '10px' }} {...params} />}
              />
            <TimePicker
              label="Hora do evento"
              value={selectedTime}
              onChange={(newValue) => { setHandleTimeChange(newValue) }}
              renderInput={(params) => <TextField style={{ width: '200px', marginLeft: '10px' }} {...params} />}
            />
          </DateTimeGroupStyle>
          <ButtonGroup style={{ marginTop: '40px' }}>
            <Button
              style={ButtonStyleCustom({ marginRight: '10px', backgroundColor: 'rgb(14, 202, 101)', border: '1px solid rgb(14, 202, 101)' })}
              variant="outlined"
              size='small'
              fullWidth
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
