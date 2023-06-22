import { Box, Button, ButtonGroup, Modal } from "@mui/material"


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

  return (
    <Modal
      open={openModal}
      onClose={() => { HandlerClose() }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ButtonGroup>
          <Button
            style={ButtonStyleCustom({ backgroundColor: 'rgb(14, 202, 101)', marginLeft: '30px' })}
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
      </Box>
    </Modal >
  )
}
