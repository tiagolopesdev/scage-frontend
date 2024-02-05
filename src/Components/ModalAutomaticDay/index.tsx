import { Autocomplete, Box, Button, IconButton, Modal, TextField } from "@mui/material"
import { Input } from "../Input"
import React, { useContext, useEffect, useState } from "react"
import { TimePicker } from "@mui/x-date-pickers"
import { CustomToast } from "../CustomToast"
import { ActionButtons } from "../ActionButtons"
import { Icon } from "../Img"
import { GenerationAutomaticDays } from '../../Services/Scale'
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

import IconDelete from '../../Assets/icon_trash.svg'
import IconEdit from '../../Assets/icon_user_edit.svg'
import IconWarning from '../../Assets/icon_warning.svg'
import { InformationsDayStyle } from "./style"
import { IGeneratedDays } from "../../@types/IGeneratedDays"
import { IAutomaticDays } from "../../@types/IAutomaticDays"
import { DayOfWeekEnum } from "../../@types/DayOfWeekEnum"
import { IDay } from "../../@types/IScaleMonth"
import { initialStateUser } from "../../@types/InitialStateDay"
import { ScaleContext } from "../../Context/scale"
import { TableComponent } from "../Table"
import { ITableRowProps } from "../../@types/TableProps"
import { Hours, HoursAndMinutes } from "../../@types/HoursFormat"
import { DayOfWeekEnumOptions } from "../../@types/DayOfWeekOptions"


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
}

export const ModalAutomaticDay = (props: IModalAutomaticDay) => {

  const { openModal, openModalState } = props

  const { scaleContext, setScaleContext } = useContext(ScaleContext);

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

  const displayDaysAdded = (): ITableRowProps[] => {

    let row: ITableRowProps[] = []

    days.map((item, index) => {
      row.push({
        rows: [
          { name: item.day, align: "left", style: { paddingLeft: '15px' } },
          { name: item.nameEvent as string, align: "left", style: { paddingLeft: '15px' } },
          { name: dayjs(item.time).format(HoursAndMinutes), align: "center" },
          {
            name: '', align: "right", actions: <>
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
            </>
          }
        ]
      })
    })
    return row
  }

  useEffect(() => {
    if (days.length === 0) return
    displayDaysAdded()
    if (removeDay) setRemoveDay(!removeDay)
  }, [days, removeDay])

  return (
    <Modal
      open={openModal}
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
              options={DayOfWeekEnumOptions}
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
        <TableComponent
          style={{ marginTop: '20px' }}
          tableCell={[
            { name: 'Dia', align: 'left' },
            { name: 'Nome do evento', align: 'left' },
            { name: 'Horário', align: 'center' },
            { name: 'Ações', align: 'right' }
          ]}
          tableRows={displayDaysAdded()}
        />
        <ActionButtons
          nameLeft="Cancelar"
          nameRight="Gerar inclusão de dias"
          actionLeft={() => { HandlerClose() }}
          actionRight={async () => {
            const dayToSend: IAutomaticDays[] = days.map((item) => {

              delete item.isNew
              
              item.time = dayjs(item.time).format(Hours)

              const indexNameDay = Object.values(DayOfWeekEnum).indexOf(item.day as unknown as DayOfWeekEnum)

              item.day = Object.keys(DayOfWeekEnum)[indexNameDay]

              return item
            })

            const responseApi: IGeneratedDays[] = await GenerationAutomaticDays({
              periodStart: props.periodStart,
              periodEnd: props.periodEnd,
              days: dayToSend
            })

            let daysToInclude: IDay[] = []

            responseApi.map((item: IGeneratedDays) => {
              daysToInclude.push({
                name: item.name,
                dateTime: item.dateTime,
                cameraOne: initialStateUser,
                cameraTwo: initialStateUser,
                cutDesk: initialStateUser,
                isEnable: true
              })
            })

            daysToInclude = [...daysToInclude, ...scaleContext.days]

            setScaleContext({
              ...scaleContext, ...{
                id: scaleContext.id,
                name: scaleContext.name,
                start: scaleContext.start,
                end: scaleContext.end,
                days: daysToInclude,
                isEnable: scaleContext.isEnable
              }
            })

            HandlerClose()
          }}
        />
      </Box>
    </Modal>
  )
}
