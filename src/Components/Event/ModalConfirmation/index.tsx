import { Box, Button, Modal, Popover, Typography } from "@mui/material";
import { useContext } from "react";
import { ScaleContext } from "../../../Context/scale";
import { ObjectIsEquals } from "../../../Utils/objectIsEquals";
import { IUser } from "../../../@types/IUser";
import { CustomToast } from "../../CustomToast";

import IconChangeSerf from "../../../Assets/icon_changed.svg"
import IconWarning from "../../../Assets/icon_warning.svg"
import { ISerfHandler } from "../../../@types/IFromDay";
import { EventSerf } from "..";
import { ActionButtons } from "../../ActionButtons";
import { Icon } from "../../Img";


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

  const managerDisplayUserAndEvent = (serfAndDay: ISerfHandler): JSX.Element => {
    return <div style={{ display: 'flex', width: '100%', flexDirection: "column", justifyItems: "left", alignItems: "flex-start" }}>
      <Typography style={{ fontWeight: 500, fontSize: 17, paddingLeft: '10px' }} >{serfAndDay.serf.name}</Typography>
      <EventSerf
        day={serfAndDay.day}
        user={serfAndDay.serf}
        isNotChange={true}
      />
    </div>
  }

  return <Modal
    open={openModal}
    onClose={() => { HandlerClose() }}
    aria-labelledby="modal-confirmation-title"
    aria-describedby="modal-confirmation-description"
  >
    <Box sx={style}>
      <div style={{ minWidth: '18rem' }}>
        <Typography style={{ fontWeight: 600, fontSize: 20 }} >Confirmar mudança de servo?</Typography>
        <div style={{ marginTop: '5%', display: 'flex', flexDirection: "row", width: '100%' }}>
          {managerDisplayUserAndEvent(fromDay)}
          <Icon src={String(IconChangeSerf)} style={{ margin: '0px 8px', width: '4%' }} />
          {managerDisplayUserAndEvent(toDay)}
        </div>
      </div>
      <ActionButtons
        nameLeft="Cancelar"
        nameRight="Confirmar"
        actionLeft={() => { HandlerClose() }}
        actionRight={() => {
          changeSerf()
          HandlerClose()
        }}
      />
    </Box>
  </Modal>
}
