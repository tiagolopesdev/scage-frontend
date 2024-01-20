import { Button, Popover } from "@mui/material";
// import IconEye from '../../Assets/icon_eye_scale.svg'
// import IconCalendar from '../../Assets/icon_white_calendar.svg'

import { IconEye } from "./Icons/icon-eye";
import { IconCalendar } from "./Icons/icon-calendar";
import { IconTrash } from "./Icons/icon-trash";

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
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: 'center',
                margin: "20px 20px 20px 20px",
            }}>
                <Button
                    // onClick=
                    startIcon={<IconEye />}
                    variant="contained"
                    size='small'
                    sx={styleButtons}
                    style={{
                        marginBottom: '10px',
                        backgroundColor: 'rgb(14, 202, 101)'
                    }}
                >Visualizar</Button>
                <Button
                    // onClick=
                    startIcon={<IconCalendar />}
                    variant="contained"
                    size='small'
                    sx={styleButtons}
                    style={{
                        marginBottom: '10px',
                        backgroundColor: 'rgb(14, 202, 101)'
                    }}
                >Notificar em agenda</Button>
                <Button
                    // onClick=
                    variant="contained"
                    size='small'
                    sx={styleButtons}
                    style={{
                        marginBottom: '10px',
                        backgroundColor: 'rgb(14, 202, 101)'
                    }}
                >Criar eventos no YouTube</Button>
                <Button
                    // onClick=
                    startIcon={<IconTrash />}
                    variant="outlined"
                    color="error"
                    size='small'
                    sx={styleButtons}
                    style={{
                        marginBottom: '10px',
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
            </div>
        </Popover>
    );
}