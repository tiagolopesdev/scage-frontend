import { Box, Button, Modal, Popover, Typography } from "@mui/material";
import { useContext } from "react";
import { ScaleContext } from "../../../Context/scale";
import { ObjectIsEquals } from "../../../Utils/objectIsEquals";
import { IUser } from "../../../@types/IUser";
import { CustomToast } from "../../CustomToast";

import IconWarning from "../../../Assets/icon_warning.svg"
import { ISerfHandler } from "../../../@types/IFromDay";
import { EventSerf } from "..";


function AlocationNewSerf(toDay: ISerfHandler, fromDay: ISerfHandler) {
  if (toDay.day.cameraOne?.id === toDay.serf.id) {
    toDay.day.cameraOne = fromDay.serf
  } else if (toDay.day.cameraTwo?.id === toDay.serf.id) {
    toDay.day.cameraTwo = fromDay.serf
  } else if (toDay.day.cutDesk?.id === toDay.serf.id) {
    toDay.day.cutDesk = fromDay.serf
  }
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  minWidth: 500,
  width: 600,
  minHeight: 200,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  p: 4,
};

interface IChangeSerfPopoverProps {
  openModal: boolean,
  openModalState: React.Dispatch<React.SetStateAction<boolean>>
}


export const ChangeSerfPopover = (props: IChangeSerfPopoverProps) => {

  const { openModal, openModalState } = props

  const { scaleContext, fromDay, toDay, setScaleContext } = useContext(ScaleContext);

  const StyleButtonCustom = (styleCustom?: any) => ({
    borderRadius: '15px',
    fontFamily: 'Dosis',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    padding: '0px',
    ...styleCustom
  })

  const HandlerClose = () => {
    openModalState(!openModal)
  }

  const changeSerf = () => {

    if (
      ObjectIsEquals(fromDay.serf, toDay.day.cameraOne as IUser) ||
      ObjectIsEquals(fromDay.serf, toDay.day.cameraTwo as IUser) ||
      ObjectIsEquals(fromDay.serf, toDay.day.cutDesk as IUser) ||
      ObjectIsEquals(toDay.serf, fromDay.day.cameraOne as IUser) ||
      ObjectIsEquals(toDay.serf, fromDay.day.cameraTwo as IUser) ||
      ObjectIsEquals(toDay.serf, fromDay.day.cutDesk as IUser)
    ) {
      CustomToast({ duration: 3000, message: "Um dos servos já está no evento. Troca não possível!", icon: String(IconWarning) })
      return
    }

    if (fromDay.day.cameraOne?.id === fromDay.serf.id) {
      fromDay.day.cameraOne = toDay.serf
      AlocationNewSerf(toDay, fromDay)
    } else if (fromDay.day.cameraTwo?.id === fromDay.serf.id) {
      fromDay.day.cameraTwo = toDay.serf
      AlocationNewSerf(toDay, fromDay)
    } else if (fromDay.day.cutDesk?.id === fromDay.serf.id) {
      fromDay.day.cutDesk = toDay.serf
      AlocationNewSerf(toDay, fromDay)
    }

    let scaleContextToUpdate = scaleContext.days

    const indexFromDay = scaleContextToUpdate.findIndex((item) => { return item.id === fromDay.day.id })
    const indexToDay = scaleContextToUpdate.findIndex((item) => { return item.id === toDay.day.id })

    scaleContextToUpdate.splice(indexFromDay, 1, fromDay.day)
    scaleContextToUpdate.splice(indexToDay, 1, toDay.day)

    setScaleContext({
      id: scaleContext.id,
      name: scaleContext.name,
      start: scaleContext.start,
      end: scaleContext.end,
      isEnable: scaleContext.isEnable,
      days: scaleContextToUpdate
    })
  }

  return (
    <Modal
      open={openModal}
      onClose={() => { HandlerClose() }}
      aria-labelledby="modal-confirmation-title"
      aria-describedby="modal-confirmation-description"
    >
      <Box sx={style}>
        <div>
          <div style={{ minWidth: '18rem' }}>
            <Typography style={{ fontWeight: 600, fontSize: 19 }} >Confirmar mudança de servo?</Typography>
            <Typography style={{ fontWeight: 500, fontSize: 16 }} >{`${fromDay.serf.name} por ${toDay.serf.name}`}</Typography>
            <div style={{ display: 'flex', flexDirection: "row", width: '100%' }}>
              <EventSerf
                day={fromDay.day}
                user={fromDay.serf}
                isNotChange={true}
                />
              <EventSerf
                day={toDay.day}
                user={toDay.serf}
                isNotChange={true}
              />
            </div>
          </div>
          <div style={{ display: 'flex', paddingTop: '5%' }}>
            {/*

              TODO -> Change estructure below, use the component already created

            */}
            <Button
              variant="outlined"
              size='small'
              color='error'
              onClick={() => { HandlerClose() }}
              fullWidth
              style={StyleButtonCustom()}
            >Cancelar</Button>
            <Button
              style={StyleButtonCustom({
                marginLeft: '20px',
                backgroundColor: 'rgb(14, 202, 101)',
              })}
              variant="contained"
              size='small'
              onClick={() => {
                changeSerf()
                HandlerClose()
              }}
              fullWidth
            >Confirmar</Button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}
