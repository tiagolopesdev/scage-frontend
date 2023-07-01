import {
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
  TableRow
} from "@mui/material";
import { Icon } from "../Img";
import IconEdit from '../../Assets/icon_user_edit.svg'
import IconDelete from '../../Assets/icon_trash.svg'
import { ButtonGroup, ContainerNewDay } from "./style";
import { ModalDay } from "../ModalDay";
import { useState } from "react";
import { IUser } from "../../@types/IUser";
import { getAllUsersService } from "../../Services/Users";
import { GenerationPreviewScale } from "../../Services/Scale";
import { IScaleMonthPreview } from "../../@types/IScaleMonthPreview";
import { IScaleDay } from "../../@types/IScaleDay";

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
  setScalePreview: React.Dispatch<React.SetStateAction<IScaleDay[]>>
}

export const ModalGenerationScale = (props: IModalGenerationScale) => {

  const { openModal, openModalState, setScalePreview } = props

  const [openModalNewDay, setOpenModalNewDay] = useState(false);
  const [scaleMonthList, setScaleMonthList] = useState<IScaleMonthPreview[] | undefined>();
  const [dayToEdit, setDayToEdit] = useState<IScaleMonthPreview | undefined>();
  const [isGenerationScale, setIsGenerationScale] = useState(false)

  const HandlerClose = () => {
    openModalState(!openModal)
  }

  const GenerationScale = async () => {
    try {
      setIsGenerationScale(true)

      if (!scaleMonthList) return 

      let responseUserApi: IUser[] = await getAllUsersService();

      const onlyUserId = responseUserApi.map((item) => { return item.id })

      const onlyNameDay = scaleMonthList.map((item) => { return item.name })

      const scalePreviewToSend = {
        users: onlyUserId,
        days: onlyNameDay
      }

      const responseScalePreviewApi = await GenerationPreviewScale(scalePreviewToSend);

      let scaleReturn: IScaleDay[] = [];
      let scalePreview: IUser[] = [];

      responseScalePreviewApi.map((item: any, index: number) => {
        scalePreview.push(item.cameraOne)
        scalePreview.push(item.cameraTwo)
        scalePreview.push(item.cutDesk)

        scaleReturn.push(
          {
            event: scaleMonthList[index] as IScaleMonthPreview,
            peoples: scalePreview
          }
        )
        scalePreview = []
      })

      setScalePreview(scaleReturn)

      setIsGenerationScale(false)

      HandlerClose()
    } catch (error) {
      //TODO -> Colocar o toast
      setIsGenerationScale(false)
    }
  }

  const ButtonStyleCustom = (customStyle: any) => ({
    borderRadius: '12px',
    fontFamily: 'Dosis',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    ...customStyle
  })

  const DeleteDay = (dayToRemove: IScaleMonthPreview) => {
    const newListDay = scaleMonthList?.filter((item) => { return item !== dayToRemove });
    setScaleMonthList(newListDay)
  }

  const EditDay = (day: IScaleMonthPreview) => {
    setDayToEdit(day);
    setOpenModalNewDay(true)
  }

  return (
    <>
      <Modal
        open={openModal}
        onClose={() => { HandlerClose() }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ContainerNewDay>
            <Button
              size='small'
              variant="contained"
              onClick={() => { setOpenModalNewDay(!openModalNewDay) }}
              style={ButtonStyleCustom({ backgroundColor: 'rgb(14, 202, 101)', marginBottom: '4%' })}
            >Adicionar novo dia</Button>
          </ContainerNewDay>
          <TableContainer component={Paper} sx={{ maxHeight: 300 }} >
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontFamily: 'Dosis', fontSize: 'larger' }} >{<strong>Nome</strong>}</TableCell>
                  <TableCell style={{ fontFamily: 'Dosis', fontSize: 'larger' }} align="center">{<strong>Data</strong>}</TableCell>
                  <TableCell style={{ fontFamily: 'Dosis', fontSize: 'larger' }} align="center">{<strong>Horário</strong>}</TableCell>
                  <TableCell style={{ fontFamily: 'Dosis', fontSize: 'larger' }} align="right">{<strong>Ações</strong>}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  scaleMonthList?.map((item, index) => {
                    return (
                      <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell component="th" scope="row">
                          {item.name}
                        </TableCell>
                        <TableCell align="center">{item.date}</TableCell>
                        <TableCell align="center">{item.time}</TableCell>
                        <TableCell align="right" style={{ padding: '0rem 0.5rem 0rem 0.5rem' }}>
                          <IconButton onClick={() => { EditDay(item) }}>
                            <Icon src={String(IconEdit)} />
                          </IconButton>
                          <IconButton onClick={() => { DeleteDay(item) }}>
                            <Icon src={String(IconDelete)} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
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
              onClick={() => { GenerationScale() }}
            >
              {isGenerationScale ?
                <CircularProgress style={{ color: 'white', width: '20px', height: '20px' }} color="secondary" />
                : 'Gerar escala'
              }
            </Button>
          </ButtonGroup>
        </Box>
      </Modal>
      {
        openModalNewDay ?
          <ModalDay
            openModal={openModalNewDay}
            openModalState={setOpenModalNewDay}
            dayToEdit={dayToEdit}
            setManipulationDay={setDayToEdit}
            manipulationDay={setScaleMonthList}
            stateDay={scaleMonthList}
          /> : ''
      }
    </>
  )
}
