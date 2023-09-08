import {
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
import IconEdit from '../../Assets/icon_user_edit.svg'
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
  setScalePreview: React.Dispatch<React.SetStateAction<IScaleMonth | undefined>>
}

export const ModalGenerationScale = (props: IModalGenerationScale) => {

  const { openModal, openModalState, setScalePreview } = props
  const { scaleContext, setScaleContext, setDisplayScale } = useContext(ScaleContext);

  const [openModalNewDay, setOpenModalNewDay] = useState(false);
  const [daysList, setDaysList] = useState<IDay[]>([]);
  const [dayToEdit, setDayToEdit] = useState<IDay>(initialStateDay);
  const [isGenerationScale, setIsGenerationScale] = useState(false)
  const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>(dayjs(scaleContext.start) ?? null);
  const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(dayjs(scaleContext.end) ?? null);
  const [scaleMonth, setScaleMonth] = useState<IScaleMonth>({
    name: scaleContext.name ?? '',
    end: '',
    start: '',
    days: []
  })

  const HandlerClose = () => {
    openModalState(!openModal)
  }

  const GenerationScale = async () => {
    try {
      setIsGenerationScale(true)

      if (!daysList || !scaleMonth.name || !selectedEndDate?.format('DD/MM/YYYY') || !selectedStartDate?.format('DD/MM/YYYY')) {
        CustomToast({ duration: 2000, message: 'Preencha todos os campos', icon: String(IconWarning) })
        setIsGenerationScale(false)
        return
      }

      let responseUserApi: IUser[] = await getAllUsersService();

      const onlyUserId = responseUserApi.map((item) => { return item.id })

      const onlyNameDay = scaleContext.days.map((item) => { return item.name })

      const scalePreviewToSend = {
        users: onlyUserId,
        days: onlyNameDay
      }

      const responseScalePreviewApi = await GenerationPreviewScale(scalePreviewToSend);

      let daysToReturn: IDay[] = [];

      responseScalePreviewApi.map((item: any, index: number) => {
        daysToReturn.push(
          {
            cameraOne: item.cameraOne,
            cameraTwo: item.cameraTwo,
            cutDesk: item.cutDesk,
            dateTime: `${scaleContext.days[index].dateTime}Z`,
            name: scaleContext.days[index].name
          }
        )
      })

      setIsGenerationScale(false)

      setScalePreview({
        name: scaleMonth.name,
        end: selectedEndDate?.format('YYYY-MM-DD') as string,
        start: selectedStartDate?.format('YYYY-MM-DD') as string,
        days: daysToReturn
      })

      setScaleContext({
        name: scaleMonth.name,
        end: selectedEndDate?.format('YYYY-MM-DD') as string,
        start: selectedStartDate?.format('YYYY-MM-DD') as string,
        days: daysToReturn
      })

      setDisplayScale(true)

      HandlerClose()
    } catch (error) {
      console.log('Error ', error)
      CustomToast({ duration: 2000, message: 'Não foi possível obter a pré-visualização das escalas', icon: String(IconError) })
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
    const newListDay = daysList?.filter((item) => { return item !== dayToRemove });
    setDaysList(newListDay)
  }

  const EditDay = (day: IDay) => {
    setDayToEdit(day);
    setOpenModalNewDay(true)
  }

  console.log('scale -> ', scaleContext.id)

  const listDays = () => {
    return scaleContext.days?.map((item, index) => {
      return (
        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
          <TableCell component="th" scope="row">
            {item.name}
          </TableCell>
          <TableCell align="center">{dayjs(item.dateTime).format('DD/MM/YYYY')}</TableCell>
          <TableCell align="center">{dayjs(item.dateTime).format('hh:mm:ss')}</TableCell>
          <TableCell align="right" style={{ padding: '0rem 0.5rem 0rem 0.5rem' }}>
            <IconButton onClick={() => {
              EditDay(item)
            }}>
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

  useEffect(() => {
    listDays()
    setDayToEdit(initialStateDay)
  }, [scaleContext.days])


  return (
    <>
      <Modal
        open={openModal}
        onClose={() => { HandlerClose() }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: 'flex', margin: '4% 2%' }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={Months}
              sx={{ width: 250 }}
              isOptionEqualToValue={(option, value) => value.label === option.label}
              renderInput={(params) => <TextField {...params} label="Mês" />}
              onChange={(event: any) => { setScaleMonth({ ...scaleMonth, name: event.target.innerText as string }) }}
            />
            <DatePicker
              inputFormat="DD/MM/YYYY"
              label="Inicio do mês"
              value={selectedStartDate}
              onChange={(newValue) => { setSelectedStartDate(newValue) }}
              renderInput={(params) => <TextField style={{ width: '200px', margin: '0px 10px' }} {...params} />}
            />
            <DatePicker
              inputFormat="DD/MM/YYYY"
              label="Fim do mês"
              value={selectedEndDate}
              onChange={(newValue) => { setSelectedEndDate(newValue) }}
              renderInput={(params) => <TextField style={{ width: '200px', marginRight: '10px' }} {...params} />}
            />
          </div>
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
                {listDays()}
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
              onClick={() => {
                scaleContext.id ?
                  CustomToast({ duration: 2000, message: 'A escala já foi gerada', icon: String(IconWarning) }) :
                  GenerationScale()
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
