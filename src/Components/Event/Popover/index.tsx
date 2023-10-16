import { Button, Popover } from "@mui/material";

interface IFilterUserProps {
  id?: string | undefined,
  open: boolean,
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
  anchorEl?: HTMLButtonElement | null
}

export const FilterDUser = (props: IFilterUserProps) => {

  const { id, anchorEl, open, setAnchorEl } = props

  const StyleButtonCustom = (styleCustom?: any) => ({
    borderRadius: '15px',
    fontFamily: 'Dosis',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    padding: '0px',
    ...styleCustom
  })

  console.log(anchorEl)

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
        </div>
        <div style={{ display: 'flex', paddingTop: '5%'  }}>
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
            // onClick={() => { handlerUser() }}
            fullWidth
          >Salvar</Button>
        </div>
      </div>
    </Popover>
  );
}
