import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  TextField
} from "@mui/material";
import { Icon } from "../Img";
import { ModalDay } from "../ModalDay";
import { useContext, useEffect, useState } from "react";
import { IUser } from "../../@types/IUser";
import { getAllUsersService } from "../../Services/Users";
import { GenerationPreviewScale } from "../../Services/Scale";
import { IScaleMonthPreview } from "../../@types/IScaleMonthPreview";
import { CustomToast } from "../CustomToast";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { IDay, IScaleMonth } from "../../@types/IScaleMonth";
import { initialStateDay } from "../../@types/InitialStateDay";
import { ScaleContext } from "../../Context/scale";
import { IsNewDay } from "../../Utils/isNewDay";

import { ContainerNewDay, DataGenerationScaleStyle, DateGroupStyle } from "./style";
import IconEdit from '../../Assets/icon_user_edit.svg'
import IconError from '../../Assets/icon_error.svg'
import IconWarning from '../../Assets/icon_warning.svg'
import IconDelete from '../../Assets/icon_trash.svg'
import { Input } from "../Input";
import { ModalAutomaticDay } from "../ModalAutomaticDay";
import { ActionButtons } from "../ActionButtons";
import { ITableRowProps, TableComponent } from "../Table";


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
  setScalePreview: React.Dispatch<React.SetStateAction<IScaleMonth>>
}

export const ModalGenerationScale = (props: IModalGenerationScale) => {

  const { openModal, openModalState } = props
  const { scaleContext, setScaleContext, setDisplayScale } = useContext(ScaleContext);

  const [openModalNewDay, setOpenModalNewDay] = useState(false);
  const [openModalAutomaticDay, setOpenModalAutomaticDay] = useState(false);
  const [daysList, setDaysList] = useState<IDay[]>([]);
  const [dayToEdit, setDayToEdit] = useState<IDay>(initialStateDay);
  const [isGenerationScale, setIsGenerationScale] = useState(false)
  const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>(dayjs(scaleContext.start) ?? null);
  const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(dayjs(scaleContext.end) ?? null);
  const [scaleMonth, setScaleMonth] = useState<IScaleMonth>({
    id: scaleContext.id ?? '',
    name: scaleContext.name ?? '',
    end: '',
    start: '',
    days: [],
    isEnable: true
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

      const filterNewDays = scaleContext.days.filter((item) => {
        if (IsNewDay(item)) return item.name
      })

      const onlyNameDay = filterNewDays.map((item: IDay) => { return item.name })

      const scalePreviewToSend = {
        name: scaleMonth.name,
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
            dateTime: `${filterNewDays[index].dateTime}Z`,
            name: filterNewDays[index].name,
            isEnable: true
          }
        )
      })

      setIsGenerationScale(false)

      const filterNotNewDay = scaleContext.days.filter((item) => { if (!IsNewDay(item)) return item })

      daysToReturn.map((item) => { filterNotNewDay.push(item) })

      setScaleContext({
        id: scaleMonth.id,
        name: scaleMonth.name,
        end: selectedEndDate?.format('YYYY-MM-DD') as string,
        start: selectedStartDate?.format('YYYY-MM-DD') as string,
        days: filterNotNewDay,
        isEnable: true
      })

      setDisplayScale(true)

      HandlerClose()
    } catch (error: any) {
      CustomToast({ duration: 2000, message: error.message, icon: String(IconError) })
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
    const newListDay = scaleContext.days?.filter((item) => { return item !== dayToRemove });
    setScaleContext({
      ...scaleContext, ...{
        id: scaleContext.id,
        name: scaleContext.name,
        start: scaleContext.start,
        end: scaleContext.end,
        isEnable: scaleContext.isEnable,
        days: newListDay
      }
    })
  }

  const EditDay = (day: IDay) => {
    setDayToEdit(day);
    setOpenModalNewDay(true)
  }

  const listDays = (): ITableRowProps[] => {

    let row: ITableRowProps[] = []

    scaleContext.days.map((item) => {
      row.push({
        rows: [
          { name: item.name, align: "left", style: { paddingLeft: '15px' } },
          { name: dayjs(item.dateTime).format('DD/MM/YYYY'), align: "center" },
          { name: dayjs(item.dateTime).format('hh:mm:ss'), align: "center" },
          {
            name: '', align: "right", actions: <>
              <IconButton onClick={() => { EditDay(item) }}>
                <Icon src={String(IconEdit)} />
              </IconButton>
              <IconButton onClick={() => { DeleteDay(item) }}>
                <Icon src={String(IconDelete)} />
              </IconButton>
            </>
          }
        ]
      })
    })
    return row
  }

  useEffect(() => { listDays() }, [scaleContext.days])

  return (
    <>
      <Modal
        open={openModal}
        onClose={() => { HandlerClose() }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DataGenerationScaleStyle>
            <Input
              value={scaleMonth.name}
              label='Mês'
              onChange={(event: any) => {
                setScaleMonth({ ...scaleMonth, name: event.target.value as string })
              }}
            />
            <DateGroupStyle>
              <DatePicker
                inputFormat="DD/MM/YYYY"
                label="Inicio do mês"
                value={selectedStartDate}
                onChange={(newValue) => { setSelectedStartDate(newValue) }}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    error={params.focused}
                    style={{ width: '200px', margin: '0px 10px' }}
                  />
                }
              />
              <DatePicker
                inputFormat="DD/MM/YYYY"
                label="Fim do mês"
                value={selectedEndDate}
                onChange={(newValue) => { setSelectedEndDate(newValue) }}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    error={params.focused}
                    style={{ width: '200px', marginRight: '10px' }}
                  />
                }
              />
            </DateGroupStyle>
          </DataGenerationScaleStyle>
          <ContainerNewDay>
            <Button
              size='small'
              variant="contained"
              onClick={() => {
                if (!dayjs(selectedStartDate).isValid() || !dayjs(selectedEndDate).isValid()) {
                  CustomToast({
                    message: 'Insira a data de início de fim da escala',
                    duration: 1000,
                    icon: String(IconWarning)
                  })
                  return
                }
                setOpenModalAutomaticDay(!openModalAutomaticDay)
              }}
              style={ButtonStyleCustom({ backgroundColor: 'rgb(14, 202, 101)', marginBottom: '4%', marginRight: '15px' })}
            >Adição automática</Button>
            <Button
              size='small'
              variant="contained"
              onClick={() => { setOpenModalNewDay(!openModalNewDay) }}
              style={ButtonStyleCustom({ backgroundColor: 'rgb(14, 202, 101)', marginBottom: '4%' })}
            >Adicionar novo dia</Button>
          </ContainerNewDay>
          <TableComponent
            tableCell={[
              { name: 'Nome', align: 'left' },
              { name: 'Data', align: 'center' },
              { name: 'Horário', align: 'center' },
              { name: 'Ações', align: 'right' }
            ]}
            tableRows={listDays()}
          />
          <ActionButtons
            nameLeft="Cancelar"
            nameRight={isGenerationScale ?
              <CircularProgress style={{ color: 'white', width: '20px', height: '20px' }} color="secondary" />
              : 'Gerar escala'
            }
            actionLeft={() => { HandlerClose() }}
            actionRight={() => { GenerationScale() }}
          />
        </Box>
      </Modal>
      {
        openModalAutomaticDay ?
          <ModalAutomaticDay
            openModal={openModalAutomaticDay}
            openModalState={setOpenModalAutomaticDay}
            periodEnd={dayjs(selectedEndDate).format()}
            periodStart={dayjs(selectedStartDate).format()}
          /> : ''
      }
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
