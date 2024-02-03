import { Box, Modal, TextField } from "@mui/material"
import { IDay } from "../../@types/IScaleMonth";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { CustomToast } from "../CustomToast";
import dayjs, { Dayjs } from "dayjs";
import { useContext, useState } from "react";
import { ScaleContext } from "../../Context/scale";
import { Icon } from "../Img";
import { initialStateDay } from "../../@types/InitialStateDay";
import { ActionButtons } from "../ActionButtons";

import { ContainerElementsStyle, DateTimeGroupStyle } from "./style";
import SelectIcon from "../../Assets/icon_success_white.svg"
import CloseIcon from "../../Assets/icon_user_delete.svg"
import IconWarning from '../../Assets/icon_warning.svg'
import { Input } from "../Input";
import { HoursAndMinutes } from "../../@types/HoursFormat";

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
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  manipulationDay: IDay,
  setManipulationDay: React.Dispatch<React.SetStateAction<IDay>>
  listManipulationDay: IDay[]
  setListManipulationDay: React.Dispatch<React.SetStateAction<IDay[]>>
}

export const ModalDay = (props: IModalGenerationScale) => {

  const { openModal, setOpenModal, manipulationDay, setManipulationDay } = props
  const { scaleContext, setScaleContext } = useContext(ScaleContext);

  const [eventName, setEventName] = useState(manipulationDay ? manipulationDay.name : '');
  const [selectedDateTime, setSelectedDateTime] = useState<Dayjs | null>(manipulationDay?.dateTime ? dayjs(manipulationDay?.dateTime) : null)

  const HandlerClose = () => {
    setOpenModal(!openModal)
    setManipulationDay(initialStateDay)
  }

  return <Modal
    open={openModal}
    onClose={() => { HandlerClose() }}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <ContainerElementsStyle>
        <Input
          label="Nome"
          value={eventName}
          onChange={(event: any) => { setEventName(event.target.value) }}
        />
        <DateTimeGroupStyle>
          <DatePicker
            inputFormat="DD/MM/YYYY"
            label="Data do evento"
            value={selectedDateTime}
            onChange={(newValue) => {
              newValue ? setSelectedDateTime(newValue) : setSelectedDateTime(newValue)
            }}
            renderInput={(params) => <TextField style={{ width: '200px', marginRight: '10px' }} {...params} />}
          />
          <TimePicker
            label="Horário do evento"
            value={selectedDateTime}
            onChange={(newValue) => {
              newValue ? setSelectedDateTime(newValue) : setSelectedDateTime(newValue)
            }}
            renderInput={(params) => <TextField style={{ width: '200px', marginLeft: '10px' }} {...params} />}
          />
        </DateTimeGroupStyle>
        <ActionButtons
          nameLeft={<Icon src={String(CloseIcon)} />}
          nameRight={<Icon src={String(SelectIcon)} />}
          actionLeft={() => { HandlerClose() }}
          actionRight={() => {
            if (!eventName || !selectedDateTime?.format('DD/MM/YYYY') || !selectedDateTime?.format(HoursAndMinutes)) {
              CustomToast({ duration: 2000, message: 'Preencha todos os campos', icon: String(IconWarning) })
            } else {
              const elementExist = scaleContext.days.findIndex((item: IDay) => { return item === manipulationDay });
              if (elementExist >= 0) {

                const days = scaleContext.days;

                days.splice(elementExist, 1, {
                  id: manipulationDay.id,
                  name: eventName,
                  dateTime: selectedDateTime.format('YYYY-MM-DDTHH:mm:ss'),
                  cameraOne: manipulationDay.cameraOne,
                  cameraTwo: manipulationDay.cameraTwo,
                  cutDesk: manipulationDay.cutDesk,
                  isEnable: manipulationDay.isEnable
                });

                setScaleContext({
                  ...scaleContext, ...{
                    id: scaleContext.id,
                    name: scaleContext.name,
                    start: scaleContext.start,
                    end: scaleContext.end,
                    days: days,
                    isEnable: scaleContext.isEnable
                  }
                })
              } else {

                let daysToInclude: IDay[] = [...scaleContext.days, ...[{
                  name: eventName,
                  dateTime: selectedDateTime.format('YYYY-MM-DDTHH:mm:ss'),
                  cameraOne: manipulationDay.cameraOne,
                  cameraTwo: manipulationDay.cameraTwo,
                  cutDesk: manipulationDay.cutDesk,
                  isEnable: manipulationDay.isEnable
                }]]

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
              }
            }
            HandlerClose()
          }}
        />
      </ContainerElementsStyle>
    </Box>
  </Modal>
}
