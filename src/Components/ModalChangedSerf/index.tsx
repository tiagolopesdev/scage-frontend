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
import { useContext, useEffect, useState } from "react";
import { IUser } from "../../@types/IUser";
import { getAllUsersService } from "../../Services/Users";
import { GenerationPreviewScale } from "../../Services/Scale";
import { IScaleMonthPreview } from "../../@types/IScaleMonthPreview";
import { CustomToast } from "../CustomToast";
import { Toaster } from "react-hot-toast";
import IconError from '../../Assets/icon_error.svg'
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { IDay, IScaleMonth } from "../../@types/IScaleMonth";
import { Months } from "../../@types/Months";
import IconWarning from '../../Assets/icon_warning.svg'
import { initialStateDay } from "../../@types/InitialStateDay";
import { ScaleContext } from "../../Context/scale";
import { Input } from "../Input";
import { Serving } from "../Users/Serving";
// import { Serving } from "../Users/Serving";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  minWidth: 650,
  p: 4,
};

interface IModalGenerationScale {
  openModal: boolean,
  openModalState: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalChangedSerf = (props: IModalGenerationScale) => {

  const { openModal, openModalState } = props
  // const { scaleContext, setScaleContext, setDisplayScale } = useContext(ScaleContext);

  const [openModalNewDay, setOpenModalNewDay] = useState(false);
  const [daysList, setDaysList] = useState<IDay[]>([]);
  const [dayToEdit, setDayToEdit] = useState<IDay>(initialStateDay);
  const [isGenerationScale, setIsGenerationScale] = useState(false)
  const [nameSerfToFind, setNameSerfToFind] = useState('');
  // const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>(dayjs(scaleContext.start) ?? null);
  // const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(dayjs(scaleContext.end) ?? null);
  // const [scaleMonth, setScaleMonth] = useState<IScaleMonth>({
  //   name: scaleContext.name ?? '',
  //   end: '',
  //   start: '',
  //   days: [],
  //   isEnable: true
  // })

  const HandlerClose = () => {
    openModalState(!openModal)
  }

  // const GenerationScale = async () => {
  //   try {
  //     setIsGenerationScale(true)

  //     if (!daysList || !scaleMonth.name || !selectedEndDate?.format('DD/MM/YYYY') || !selectedStartDate?.format('DD/MM/YYYY')) {
  //       CustomToast({ duration: 2000, message: 'Preencha todos os campos', icon: String(IconWarning) })
  //       setIsGenerationScale(false)
  //       return
  //     }

  //     let responseUserApi: IUser[] = await getAllUsersService();

  //     const onlyUserId = responseUserApi.map((item) => { return item.id })

  //     const onlyNameDay = scaleContext.days.map((item) => { return item.name })

  //     const scalePreviewToSend = {
  //       users: onlyUserId,
  //       days: onlyNameDay
  //     }

  //     const responseScalePreviewApi = await GenerationPreviewScale(scalePreviewToSend);

  //     let daysToReturn: IDay[] = [];

  //     responseScalePreviewApi.map((item: any, index: number) => {
  //       daysToReturn.push(
  //         {
  //           cameraOne: item.cameraOne,
  //           cameraTwo: item.cameraTwo,
  //           cutDesk: item.cutDesk,
  //           dateTime: `${scaleContext.days[index].dateTime}Z`,
  //           name: scaleContext.days[index].name
  //         }
  //       )
  //     })

  //     setIsGenerationScale(false)

  //     setScaleContext({
  //       name: scaleMonth.name,
  //       end: selectedEndDate?.format('YYYY-MM-DD') as string,
  //       start: selectedStartDate?.format('YYYY-MM-DD') as string,
  //       days: daysToReturn,
  //       isEnable: true
  //     })

  //     setDisplayScale(true)

  //     HandlerClose()
  //   } catch (error) {
  //     CustomToast({ duration: 2000, message: 'Não foi possível obter a pré-visualização das escalas', icon: String(IconError) })
  //     setIsGenerationScale(false)
  //   }
  // }

  const ButtonStyleCustom = (customStyle: any) => ({
    borderRadius: '12px',
    fontFamily: 'Dosis',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    ...customStyle
  })

  const DeleteDay = (dayToRemove: IScaleMonthPreview) => {
    const newListDay = daysList?.filter((item) => { return item !== dayToRemove });
    setDaysList(newListDay)
  }

  const EditDay = (day: IDay) => {
    setDayToEdit(day);
    setOpenModalNewDay(true)
  }

  const listDays = () => {
    // return scaleContext.days?.map((item, index) => {
    return (
      <TableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row">
          item.name
        </TableCell>
        <TableCell align="center">DD/MM/YYYY</TableCell>
        {/* <TableCell align="center">{dayjs(item.dateTime).format('DD/MM/YYYY')}</TableCell> */}
        <TableCell align="center">hh:mm:ss</TableCell>
        {/* <TableCell align="center">{dayjs(item.dateTime).format('hh:mm:ss')}</TableCell> */}
        <TableCell align="right" style={{ padding: '0rem 0.5rem 0rem 0.5rem' }}>
          <IconButton onClick={() => { }}>
            <Icon src={String(IconInclusion)} />
          </IconButton>
        </TableCell>
      </TableRow>
    )
    // })
  }

  // useEffect(() => {
  //   listDays()
  //   setDayToEdit(initialStateDay)
  // }, [scaleContext.days])

  const ManagerInformations = () => {
    if (!nameSerfToFind) {
      return <Serving />
      // return <div style={{
      //   margin: '2%',
      //   display: 'flex',
      //   justifyContent: 'center'
      // }}>
      //   <Alert style={{ width: '100%', display: 'flex', justifyContent: 'center' }} severity="info">{<strong>Insira o nome do servo.</strong>}</Alert>
      // </div>
    } else if (nameSerfToFind && 2 > 0) {
      return <div style={{
        margin: '2%',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Alert style={{ width: '100%', display: 'flex', justifyContent: 'center' }} severity="warning">{<strong>Servo não encontrado na escala.</strong>} Adicione-o clicando no botão abaixo.</Alert>
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
            { ManagerInformations() }
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
              onClick={() => {
                // scaleContext.id ?
                //   CustomToast({ duration: 2000, message: 'A escala já foi gerada', icon: String(IconWarning) }) :
                //   GenerationScale()
              }}
            >
              {isGenerationScale ?
                <CircularProgress style={{ color: 'white', width: '20px', height: '20px' }} color="secondary" />
                : 'Gerar escala'
              }
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