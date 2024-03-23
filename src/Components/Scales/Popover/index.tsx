import { Button, Popover } from "@mui/material";
import { Icon } from "../../Img";

import CalendarIcon from "../../../Assets/icon_white_calendar.svg"
import EyeIcon from "../../../Assets/icon_eye_scale.svg"
import TrashIcon from "../../../Assets/icon_trash.svg"
import YoutubeIcon from "../../../Assets/icon_youtube.svg"
import styled from "styled-components";
import { useContext, useState } from "react";
import { conditionHandling } from "../../../Utils/conditionHandling";
import { YoutubeModalEvent } from "../../ModalEvents/Youtube";
import { ISingleScale } from "../../../@types/ISingleScale";
import { ScaleContext } from "../../../Context/scale";


const GroupButtonsStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 20px 20px 20px;
`

interface IScaleEventsPopoverProps {
  id: string | undefined,
  open: boolean,
  anchorEl: HTMLButtonElement | null,
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
  scale: ISingleScale
}

const styleButtons = {
  display: 'flex',
  justifyContent: 'start',
  width: '250px',
  maxHeight: '50px',
  fontSize: '1rem',
  fontWeight: '600',
  textTransform: 'none',
  borderRadius: '12px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
}

export const ScaleEventsPopover = (props: IScaleEventsPopoverProps) => {

  const { id, anchorEl, open, setAnchorEl, scale } = props

  const [isOpenModal, setIsOpenModal] = useState(false)

  const { scaleId, setScaleId, setIsNotDisplayScale } = useContext(ScaleContext)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return <div>
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
    >
      <GroupButtonsStyle>
        <Button
          onClick={() => { setScaleId(scale.id) }}
          startIcon={<Icon src={String(EyeIcon)} />}
          variant="contained"
          size='small'
          sx={styleButtons}
          style={{
            marginBottom: '5px',
            backgroundColor: 'rgb(14, 202, 101)'
          }}
        >Visualizar</Button>
        <Button
          startIcon={<Icon src={String(CalendarIcon)} />}
          variant="contained"
          size='small'
          sx={styleButtons}
          style={{
            marginBottom: '5px',
            backgroundColor: 'rgb(14, 202, 101)'
          }}
        >Notificar em agenda</Button>
        <Button
          onClick={() => { 
            setIsNotDisplayScale(true)
            setScaleId(scale.id)
            setIsOpenModal(true) 
          }}
          startIcon={<Icon src={String(YoutubeIcon)} />}
          variant="contained"
          size='small'
          sx={styleButtons}
          style={{
            marginBottom: '5px',
            backgroundColor: 'rgb(14, 202, 101)'
          }}
        >Criar eventos no YouTube</Button>
        <Button
          startIcon={<Icon src={String(TrashIcon)} style={{ width: '18px' }} />}
          variant="outlined"
          color="error"
          size='small'
          sx={styleButtons}
          style={{
            marginBottom: '5px',
          }}
        >Excluir</Button>
        <Button
          onClick={handleClose}
          variant="outlined"
          color="error"
          size='small'
          sx={styleButtons}
          style={{
            justifyContent: 'center',
            width: '100px',
            marginTop: '20px'
          }}
        >Cancelar</Button>
      </GroupButtonsStyle>
    </Popover>
    {conditionHandling(isOpenModal,
      <YoutubeModalEvent
        openModal={isOpenModal}
        setOpenModal={setIsOpenModal} />
    )}
  </div>
}