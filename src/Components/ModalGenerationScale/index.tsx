import { Box, Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Icon } from "../Img";
import IconEdit from '../../Assets/icon_user_edit.svg'
import IconDelete from '../../Assets/icon_trash.svg'

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

export const ModalGenerationScale = (props: IModalGenerationScale) => {

  const { openModal, openModalState } = props

  console.log('MOdal open')

  const HandlerClose = () => {
    openModalState(!openModal)
  }

  return (
    <Modal
      open={openModal}
      onClose={() => { HandlerClose() }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            style={{
              borderRadius: '12px',
              fontFamily: 'Dosis',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: 'rgb(14, 202, 101)',
              marginBottom: '4%'
            }}
            variant="contained"
            size='small'
          >Adicionar novo dia</Button>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontFamily: 'Dosis' }}>{<strong>Nome</strong>}</TableCell>
                <TableCell align="right">{<strong>Data</strong>}</TableCell>
                <TableCell align="right">{<strong>Horário</strong>}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                // key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Missa dominical dsdsdsds dsdsdsd
                </TableCell>
                <TableCell align="right">00/00/000</TableCell>
                <TableCell align="right">00:00</TableCell>
                <TableCell align="right" style={{ padding: '0rem 0.5rem 0rem 0.5rem' }}>
                  <IconButton>
                    <Icon src={String(IconEdit)}/>
                  </IconButton>
                  <IconButton>
                    <Icon src={String(IconDelete)}/>
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '50px 0px 0px 0px'
          }}
        >
          <Button
            style={{
              borderRadius: '12px',
              fontFamily: 'Dosis',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              color: '#CA0E0E',
              border: '1px solid #CA0E0E'
            }}
            variant="outlined"
            size='small'
            fullWidth
          >Cancelar</Button>
          <Button
            style={{
              borderRadius: '12px',
              fontFamily: 'Dosis',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: 'rgb(14, 202, 101)',
              marginLeft: '30px'
            }}
            variant="contained"
            size='small'
            fullWidth
          >Gerar escala</Button>
        </div>
      </Box>
    </Modal >
  )
}
