import { Autocomplete, Box, Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { Input } from "../Input"
import { useEffect, useState } from "react"
import { TimePicker } from "@mui/x-date-pickers"
import { CustomToast } from "../CustomToast"
import { Icon } from "../Img"
import dayjs from "dayjs"

import IconDelete from '../../Assets/icon_trash.svg'
import IconEdit from '../../Assets/icon_user_edit.svg'
import IconWarning from '../../Assets/icon_warning.svg'
import { DayOfWeek } from "../../@types/DayOfWeek"
import { InformationsDayStyle } from "./style"


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  p: 3,
  width: 750
}


interface IDay {
  day: string,
  name: string | null,
  time: string | null,
  isNew: boolean
}

interface IModalAutomaticDay {
  openModal: boolean,
  openModalState: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalAutomaticDay = (props: IModalAutomaticDay) => {

  const { openModal, openModalState } = props

  const initialStateDay: IDay = {
    day: '',
    name: null,
    time: null,
    isNew: false
  }
  const [days, setDays] = useState<IDay[]>([]);
  const [day, setDay] = useState<IDay>(initialStateDay);
  const [removeDay, setRemoveDay] = useState(false)
  const [positionEdit, setPositionEdit] = useState<IDay | null>(null)

  const HandlerClose = () => {
    openModalState(!openModal)
  }

  const displayDaysAdded = (): JSX.Element[] => {
    return days.map((item: IDay, index: number) => {
      return <TableRow>
        <TableCell sx={{ fontWeight: 400 }} align="left">{item.day}</TableCell>
        <TableCell sx={{ fontWeight: 400 }} align="left">{item.name}</TableCell>
        <TableCell sx={{ fontWeight: 400 }} align="center">{dayjs(item.time).format('hh:mm:ss')}</TableCell>
        <TableCell align="right" style={{ padding: '0rem 0.4rem 0rem 0.4rem' }}>
          <IconButton onClick={() => {
            setDay(item)
            setPositionEdit(item)
          }}>
            <Icon src={String(IconEdit)} />
          </IconButton>
          <IconButton onClick={() => {
            days.splice(index, 1)
            setRemoveDay(!removeDay)
          }}>
            <Icon src={String(IconDelete)} />
          </IconButton>
        </TableCell>
      </TableRow>
    })
  }

  useEffect(() => {
    if (days.length === 0) return
    displayDaysAdded()
    if (removeDay) setRemoveDay(!removeDay)
  }, [days, removeDay])

  return (
    <Modal
      open={openModal}
      onClose={() => { HandlerClose() }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <InformationsDayStyle>
          <InformationsDayStyle>
            <Autocomplete
              disablePortal
              sx={{ minWidth: 170 }}
              id="combo-box-demo-two"
              options={DayOfWeek}
              value={{ label: day.day }}
              isOptionEqualToValue={(option, value) => value.label === option.label}
              renderInput={(params) => <TextField {...params} label="Dia da semana" />}
              onChange={(event: any) => { setDay({ ...day, day: event.target.innerText as string }) }}
            />
            <Input
              style={{ margin: '0px 5px', minWidth: '40%', width: '100%' }}
              value={day?.name ?? ''}
              label='Nome do evento'
              onChange={(event: any) => {
                setDay({ ...day as IDay, name: event.target.value })
              }}
            />
            <TimePicker
              label="Hora do evento"
              value={day?.time}
              onChange={(event) => {
                event !== null ?
                  setDay({ ...day as IDay, time: event as string }) :
                  setDay({ ...day as IDay, time: '' })
              }}
              renderInput={(params) =>
                <TextField
                  style={{ width: '300px', margin: '0px 5px' }}
                  {...params}
                  error={false}
                />
              }
            />
          </InformationsDayStyle>
          <Button
            sx={{
              borderRadius: '10px',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              minWidth: 50,
              maxWidth: 80
            }}
            variant="contained"
            size='small'
            color="success"
            onClick={() => {
              if ((day.name === '' || day.name === null) || day.time === null || day.day === null) {
                CustomToast({ message: 'Preencha todos os campos para adicionar um dia.', duration: 1000, icon: String(IconWarning) })
              } else {
                day.isNew = true

                if (days.length === 0) {
                  setDays([day])
                } else if (positionEdit !== null) {
                  let positionToRemove = days.findIndex((item: IDay) => { return item === positionEdit })
                  days.splice(positionToRemove, 1, day)
                  setDays(days)
                } else {
                  setDays([...days, ...[day]])
                }
              }
              setDay(initialStateDay)
              setPositionEdit(null)
            }}
          >{!day.isNew ? 'Adicionar' : 'Atualizar'}</Button>
        </InformationsDayStyle>
        <TableContainer component={Paper} sx={{ maxHeight: 300, marginTop: '5%' }} >
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, fontSize: 'larger', width: '20%' }} >Dia</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: 'larger' }} align="left">Nome do evento</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: 'larger', width: '40px' }} align="center">Horário</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: 'larger', width: '80px' }} align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayDaysAdded()}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '50px 0px 0px 0px'
        }}>
          <Button
            sx={{
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '10px',
              marginRight: '10px'
            }}
            variant="outlined"
            size='small'
            color='error'
            fullWidth
            onClick={() => { HandlerClose() }}
          >Cancelar</Button>
          <Button
            style={{
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '10px',
              marginLeft: '10px'
            }}
            // onClick={() => { GenerationScale() }}
            variant="contained"
            color="success"
            size='small'
            fullWidth
          >
            Gerar inclusão de dias
          </Button>
        </div>
      </Box>
    </Modal>
  )
}
