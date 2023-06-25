import { Box, Button, ButtonGroup, Modal, TextField } from "@mui/material"
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { ContainerElementsStyle, DateTimeGroupStyle } from "./style";

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

  const [selectedDate, setHandleDateChange] = useState(new Date());

  const HandlerClose = () => {
    openModalState(!openModal)
  }

  const ButtonStyleCustom = (customStyle: any) => ({
    borderRadius: '12px',
    fontFamily: 'Dosis',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    ...customStyle
  })

  const HandlerDate = (event: Date) => {
    setHandleDateChange(event)
  }

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
              label="Controlled picker"
              value={selectedDate}
              onChange={(newValue) => { }}
              renderInput={(params) => <TextField style={{ width: '200px', marginRight: '10px' }} {...params} />}
            />
            <TimePicker
              label="Basic time picker"
              value={selectedDate}
              onChange={() => { }}
              renderInput={(params) => <TextField style={{ width: '200px', marginLeft: '10px' }} {...params} />}
            />
          </DateTimeGroupStyle>
          <ButtonGroup style={{ marginTop: '40px' }}>
            <Button
              style={ButtonStyleCustom({ backgroundColor: 'rgb(14, 202, 101)' })}
              variant="contained"
              size='small'
              fullWidth
            >Adicionar</Button>
            <Button
              style={ButtonStyleCustom({ color: '#CA0E0E', border: '1px solid #CA0E0E' })}
              variant="outlined"
              size='small'
              fullWidth
              onClick={() => { HandlerClose() }}
            >Fechar</Button>
          </ButtonGroup>
        </ContainerElementsStyle>
      </Box>
    </Modal >
  )
}
