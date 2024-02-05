import { Button, Popover } from "@mui/material";
import { Icon } from "../../Img";

import CalendarIcon from "../../../Assets/icon_white_calendar.svg"
import EyeIcon from "../../../Assets/icon_eye_scale.svg"
import TrashIcon from "../../../Assets/icon_trash.svg"
import YoutubeIcon from "../../../Assets/icon_youtube.svg"
import styled from "styled-components";


const GroupButtonsStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 20px 20px 20px;
`

interface IScaleEventsProps {
  id: string | undefined,
  open: boolean,
  anchorEl: HTMLButtonElement | null,
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
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

export const ScaleEvents = (props: IScaleEventsProps) => {
  const { id, anchorEl, open, setAnchorEl } = props

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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
  );
}