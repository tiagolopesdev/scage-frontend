import {
  Box,
  Modal
} from "@mui/material";
import { Toaster } from "react-hot-toast";
import { ActionButtons } from "../../ActionButtons";
import { ScroolCustom } from "../../../Styles";
import { InputStyle } from "../../ModalChangedSerf/style";
import { Input } from "../../Input";
import { LiveStreamList } from "../../Scales/YoutubeEvent/livestream-list";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  minWidth: 450,
  minHeight: 450,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  p: 5,
};

interface IModalGenerationScale {
  openModal: boolean,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const YoutubeModalEvent = (props: IModalGenerationScale) => {

  const { openModal, setOpenModal } = props

  const HandlerClose = () => {
    setOpenModal(!openModal)
  }

  return <Modal
    open={openModal}
    // onClose={() => { HandlerClose() }}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <InputStyle>
        <Input
          label="Digite o nome do evento"
          style={{ width: '55%' }}
        />
      </InputStyle>
      <ScroolCustom style={{ height: '22rem' }}>
        <LiveStreamList />
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
}
