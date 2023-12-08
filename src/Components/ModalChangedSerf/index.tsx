import {
  Alert,
  Box,
  Button,
  Modal,
  Paper,
  TableContainer
} from "@mui/material";
import { ButtonGroup, InputStyle, WarningGroupStyle } from "./style";
import { ModalDay } from "../ModalDay";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { IDay } from "../../@types/IScaleMonth";
import { initialStateDay } from "../../@types/InitialStateDay";
import { Input } from "../Input";
import { Serving } from "../Users/Serving";
import { IUser } from "../../@types/IUser";
import { getAllUsersByFiltersService, getAllUsersService } from "../../Services/Users";

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

  const [users, setUsers] = useState<IUser[]>([]);
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

  const findUsers = async () => {
    try {
      const users: IUser[] = nameSerfToFind ?
        await getAllUsersByFiltersService(nameSerfToFind) :
        await getAllUsersService();

      users.map((item) => { item.isEnable = true })

      setUsers(users)

    } catch (error) {
    }
  }

  useEffect(() => { findUsers() }, [nameSerfToFind])

  const ManagerInformations = () => {
    return users.length !== 0 ?
      <Serving users={users} /> :
      <WarningGroupStyle>
        <Alert severity="warning"
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >{
            <strong>Servo não encontrado no sistema.</strong>}
        </Alert>
      </WarningGroupStyle>
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
          <InputStyle>
            <Input
              label="Digite o nome do servo"
              style={{ width: '55%' }}
              onChange={(event: any) => { setNameSerfToFind(event.target.value) }}
            />
          </InputStyle>
          <TableContainer component={Paper} sx={{ maxHeight: 350 }} >
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
              color="primary"
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
