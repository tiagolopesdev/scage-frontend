import {
  Alert,
  Box,
  Modal
} from "@mui/material";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { ActionButtons } from "../../ActionButtons";
import { ScroolCustom } from "../../../Styles";
import { InputStyle } from "../../ModalChangedSerf/style";
import { Input } from "../../Input";
import { YoutubeAccordion } from "../../Scales/YoutubeEvent";
import { IUser } from "../../../@types/IUser";

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
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const YoutubeEvent = (props: IModalGenerationScale) => {

  const { openModal, setOpenModal } = props

  // const [openModalNewDay, setOpenModalNewDay] = useState(false);
  // const [daysList, setDaysList] = useState<IDay[]>([]);
  // const [dayToEdit, setDayToEdit] = useState<IDay>(initialStateDay);
  // const [nameSerfToFind, setNameSerfToFind] = useState('');

  const HandlerClose = () => {
    setOpenModal(!openModal)
  }

  // const findUsers = async () => {
  //   try {
  //     const users: IUser[] = nameSerfToFind ?
  //       await getAllUsersByFiltersService(nameSerfToFind) :
  //       await getAllUsersService();

  //     users.map((item) => { item.isEnable = true })

  //     setUsers(users)

  //   } catch (error) {
  //   }
  // }

  // useEffect(() => { findUsers() }, [nameSerfToFind])

  const ManagerInformations = () => {
    return <YoutubeAccordion 
      users={[] as IUser[]}      
    />
    // return users.length !== 0 ?
    //   <Serving users={users} /> :
    //   <WarningGroupStyle>
    //     <Alert severity="warning"
    //       style={{
    //         width: '100%',
    //         display: 'flex',
    //         justifyContent: 'center'
    //       }}
    //     >{
    //         <strong>Colaborador não encontrado no sistema.</strong>}
    //     </Alert>
    //   </WarningGroupStyle>
  }

  useEffect(() => {
    ManagerInformations()
  }, [])

  return <div>
    <Modal
      open={openModal}
      onClose={() => { HandlerClose() }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <InputStyle>
          <Input
            label="Digite o nome do colaborador"
            style={{ width: '55%' }}
            // onChange={(event: any) => { setNameSerfToFind(event.target.value) }}
          />
        </InputStyle>
        <ScroolCustom style={{ height: '22rem' }}>
          {ManagerInformations()}
        </ScroolCustom>
        <ActionButtons
          nameLeft="Cancelar"
          nameRight="Concluir"
          actionLeft={() => { HandlerClose() }}
          actionRight={() => { HandlerClose() }}
        />
        <Toaster
          position="bottom-center"
          reverseOrder={false}
        />
      </Box>
    </Modal>
    {/* {conditionHandling(openModalNewDay, <ModalDay
      openModal={openModalNewDay}
      setOpenModal={setOpenModalNewDay}
      manipulationDay={dayToEdit}
      setManipulationDay={setDayToEdit}
      listManipulationDay={daysList}
      setListManipulationDay={setDaysList} />
    )} */}
  </div>
}
