import { Button, Popover } from "@mui/material";
import { useContext } from "react";
import { ScaleContext } from "../../../Context/scale";
import { ObjectIsEquals } from "../../../Handlers/objectIsEquals";
import { IUser } from "../../../@types/IUser";
import { CustomToast } from "../../CustomToast";

import IconWarning from "../../../Assets/icon_warning.svg"

interface IChangeSerfPopoverProps {
  id?: string | undefined,
  open: boolean,
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
  anchorEl?: HTMLButtonElement | null
}

export const ChangeSerfPopover = (props: IChangeSerfPopoverProps) => {

  const { id, anchorEl, open, setAnchorEl } = props

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

      if (toDay.day.cameraOne?.id === toDay.serf.id) {
        toDay.day.cameraOne = fromDay.serf
      } else if (toDay.day.cameraTwo?.id === toDay.serf.id) {
        toDay.day.cameraTwo = fromDay.serf
      } else if (toDay.day.cutDesk?.id === toDay.serf.id) {
        toDay.day.cutDesk = fromDay.serf
      }
    } else if (fromDay.day.cameraTwo?.id === fromDay.serf.id) {
      fromDay.day.cameraTwo = toDay.serf
      if (toDay.day.cameraOne?.id === toDay.serf.id) {
        toDay.day.cameraOne = fromDay.serf
      } else if (toDay.day.cameraTwo?.id === toDay.serf.id) {
        toDay.day.cameraTwo = fromDay.serf
      } else if (toDay.day.cutDesk?.id === toDay.serf.id) {
        toDay.day.cutDesk = fromDay.serf
      }
    } else if (fromDay.day.cutDesk?.id === fromDay.serf.id) {
      fromDay.day.cutDesk = toDay.serf
      if (toDay.day.cameraOne?.id === toDay.serf.id) {
        toDay.day.cameraOne = fromDay.serf
      } else if (toDay.day.cameraTwo?.id === toDay.serf.id) {
        toDay.day.cameraTwo = fromDay.serf
      } else if (toDay.day.cutDesk?.id === toDay.serf.id) {
        toDay.day.cutDesk = fromDay.serf
      }
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
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={() => { setAnchorEl(null) }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <div style={{ padding: '5%' }}>
        <div style={{ minWidth: '18rem' }}>
          <p>Confirmar mudança de servo?</p>
          <p>{`${fromDay.serf.name} por ${toDay.serf.name}`}</p>
          <p>{`Do dia ${fromDay.day.dateTime}, ${fromDay.day.name}. Para o dia ${toDay.day.dateTime}, ${toDay.day.name}`}</p>
        </div>
        <div style={{ display: 'flex', paddingTop: '5%' }}>
          <Button
            variant="outlined"
            size='small'
            color='error'
            onClick={() => { setAnchorEl(null) }}
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
              setAnchorEl(null)
            }}
            fullWidth
          >Confirmar</Button>
        </div>
      </div>
    </Popover>
  );
}
