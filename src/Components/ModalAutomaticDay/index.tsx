import { Autocomplete, Box, Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { Input } from "../Input"
import React, { useEffect, useState } from "react"
import { TimePicker } from "@mui/x-date-pickers"
import { CustomToast } from "../CustomToast"
import { ActionButtons } from "../ActionButtons"
import { Icon } from "../Img"
import { GenerationAutomaticDays } from '../../Services/Scale'
import dayjs from "dayjs"

import IconDelete from '../../Assets/icon_trash.svg'
import IconEdit from '../../Assets/icon_user_edit.svg'
import IconWarning from '../../Assets/icon_warning.svg'
import { DayOfWeekOptions } from "../../@types/DayOfWeekOptions"
import { InformationsDayStyle } from "./style"
import { IGeneratedDays } from "../../@types/IGeneratedDays"
import { IAutomaticDays } from "../../@types/IAutomaticDays"
import { DayOfWeek } from "../../@types/DayOfWeek"


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

interface IModalAutomaticDay {
  openModal: boolean,
  openModalState: React.Dispatch<React.SetStateAction<boolean>>,
  periodStart: string,
  periodEnd: string,
  generatedDays: React.Dispatch<React.SetStateAction<IGeneratedDays[]>> 
}

export const ModalAutomaticDay = (props: IModalAutomaticDay) => {

  const { openModal, openModalState, generatedDays } = props

  const initialStateDay: IAutomaticDays = {
    day: '',
    nameEvent: null,
    time: null,
    isNew: false
  }
  const [days, setDays] = useState<IAutomaticDays[]>([]);
  const [day, setDay] = useState<IAutomaticDays>(initialStateDay);
  const [removeDay, setRemoveDay] = useState(false)
  const [positionEdit, setPositionEdit] = useState<IAutomaticDays | null>(null)

  const HandlerClose = () => {
    openModalState(!openModal)
  }

  const displayDaysAdded = (): JSX.Element[] => {
    return days.map((item: IAutomaticDays, index: number) => {
      return <TableRow>
        <TableCell sx={{ fontWeight: 400 }} align="left">{item.day}</TableCell>
        <TableCell sx={{ fontWeight: 400 }} align="left">{item.nameEvent}</TableCell>
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
              options={DayOfWeekOptions}
              value={{ label: day.day }}
              isOptionEqualToValue={(option, value) => value.label === option.label}
              renderInput={(params) => <TextField {...params} label="Dia da semana" />}
              onChange={(event: any) => { setDay({ ...day, day: event.target.innerText as string }) }}
            />
            <Input
              style={{ margin: '0px 5px', minWidth: '40%', width: '100%' }}
              value={day.nameEvent ?? ''}
              label='Nome do evento'
              onChange={(event: any) => {
                setDay({ ...day as IAutomaticDays, nameEvent: event.target.value })
              }}
            />
            <TimePicker
              label="Hora do evento"
              value={day?.time}
              onChange={(event) => {
                event !== null ?
                  setDay({ ...day as IAutomaticDays, time: event as string }) :
                  setDay({ ...day as IAutomaticDays, time: '' })
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
              if ((day.nameEvent === null || day.nameEvent === null) || day.time === null || day.day === null) {
                CustomToast({ message: 'Preencha todos os campos para adicionar um dia.', duration: 1000, icon: String(IconWarning) })
              } else {
                day.isNew = true

                if (days.length === 0) {
                  setDays([day])
                } else if (positionEdit !== null) {
                  let positionToRemove = days.findIndex((item: IAutomaticDays) => { return item === positionEdit })
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
        <ActionButtons
          nameLeft="Cancelar"
          nameRight="Gerar inclusão de dias"
          actionLeft={() => { HandlerClose() }}
          actionRight={async () => {
            const dayToSend: IAutomaticDays[] = days.map((item) => {
              
              delete item.isNew
              
              item.time = dayjs(item.time).format('hh:mm:ss')

              const indexNameDay = Object.values(DayOfWeek).indexOf(item.day as unknown as DayOfWeek)

              item.day = Object.keys(DayOfWeek)[indexNameDay]
              
              return item
            })

            const responseApi: IGeneratedDays[] = await GenerationAutomaticDays({
              periodStart: props.periodStart,
              periodEnd: props.periodEnd,
              days: dayToSend
            })

            generatedDays(responseApi)
            HandlerClose()
          }}
        />
      </Box>
    </Modal>
  )
}
