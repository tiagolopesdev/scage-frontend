import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
import { Icon } from "../Img";
import IconInclusion from '../../Assets/icon_success.svg'
import IconDelete from '../../Assets/icon_trash.svg'
import { ButtonGroup, ContainerNewDay } from "./style";
import { ModalDay } from "../ModalDay";
import { useEffect, useState } from "react";
import { IScaleMonthPreview } from "../../@types/IScaleMonthPreview";
import { CustomToast } from "../CustomToast";
import { Toaster } from "react-hot-toast";
import IconError from '../../Assets/icon_error.svg'
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { IDay, IScaleMonth } from "../../@types/IScaleMonth";
import { initialStateDay } from "../../@types/InitialStateDay";
import { Input } from "../Input";
import { Serving } from "../Users/Serving";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  minWidth: 450,
  minHeight: 400,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  p: 4,
};

interface IModalGenerationScale {
  openModal: boolean,
  openModalState: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalChangedSerf = (props: IModalGenerationScale) => {

  const { openModal, openModalState } = props

  const [openModalNewDay, setOpenModalNewDay] = useState(false);
  const [daysList, setDaysList] = useState<IDay[]>([]);
  const [dayToEdit, setDayToEdit] = useState<IDay>(initialStateDay);
  const [nameSerfToFind, setNameSerfToFind] = useState('');

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

  const listDays = () => {
    return (
      <TableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row">
          item.name
        </TableCell>
        <TableCell align="center">DD/MM/YYYY</TableCell>
        <TableCell align="center">hh:mm:ss</TableCell>
        <TableCell align="right" style={{ padding: '0rem 0.5rem 0rem 0.5rem' }}>
          <IconButton onClick={() => { }}>
            <Icon src={String(IconInclusion)} />
          </IconButton>
        </TableCell>
      </TableRow>
    )
  }

  const ManagerInformations = () => {
    if (!nameSerfToFind) {
      return <Serving />
    } else if (nameSerfToFind && 2 > 0) {
      return <div style={{
        margin: '2%',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Alert style={{ width: '100%', display: 'flex', justifyContent: 'center' }} severity="warning">{<strong>Servo não encontrado no sistema.</strong>}</Alert>
      </div>
    } else {
      return <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontFamily: 'Dosis', fontSize: 'larger' }} >{<strong>Nome</strong>}</TableCell>
            <TableCell style={{ fontFamily: 'Dosis', fontSize: 'larger' }} align="center">{<strong>Data</strong>}</TableCell>
            <TableCell style={{ fontFamily: 'Dosis', fontSize: 'larger' }} align="center">{<strong>Horário</strong>}</TableCell>
            <TableCell style={{ fontFamily: 'Dosis', fontSize: 'larger' }} align="right">{<strong>Ações</strong>}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listDays()}
        </TableBody>
      </Table>
    }
  }

  useEffect(() => {
    ManagerInformations()
  }, [nameSerfToFind])

  return (
    <>
      <Modal
        open={openModal}
        onClose={() => { HandlerClose() }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5%' }}>
            <Input
              label="Digite o nome do servo"
              style={{ width: '55%' }}
              onChange={(event: any) => { setNameSerfToFind(event.target.value) }}
            />
          </div>
          <TableContainer component={Paper} sx={{ maxHeight: 300 }} >
            {ManagerInformations()}
          </TableContainer>
          <ButtonGroup>
            <Button
              style={ButtonStyleCustom({ color: '#CA0E0E', border: '1px solid #CA0E0E' })}
              variant="outlined"
              size='small'
              fullWidth
              onClick={() => { HandlerClose() }}
            >Cancelar</Button>
            <Button
              style={ButtonStyleCustom({ backgroundColor: 'rgb(14, 202, 101)', marginLeft: '30px' })}
              variant="contained"
              size='small'
              fullWidth
              onClick={() => { HandlerClose() }}
            >Concluir
            </Button>
          </ButtonGroup>
          <Toaster
            position="bottom-center"
            reverseOrder={false}
          />
        </Box>
      </Modal>
      {
        openModalNewDay ?
          <ModalDay
            openModal={openModalNewDay}
            setOpenModal={setOpenModalNewDay}
            manipulationDay={dayToEdit}
            setManipulationDay={setDayToEdit}
            listManipulationDay={daysList}
            setListManipulationDay={setDaysList}
          /> : ''
      }
    </>
  )
}
