import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

interface IManipulationUserProps {
  id: string | undefined,
  open: boolean,
  anchorEl: HTMLButtonElement | null,
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
}

export const ManipulationUser = (props: IManipulationUserProps) => {

  const { id, anchorEl, open, setAnchorEl } = props

  return (
    <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => { setAnchorEl(null) }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <div style={{ minWidth: '17rem' }}>
          <div
            style={{
              margin: '0px 20px 15px 20px',
              display: 'flex',
              flexDirection: 'column-reverse'
            }}
          >
            <TextField style={{ marginTop: '20px' }} id="standard-basic" label="Sexo" variant="standard" />
            <TextField style={{ marginTop: '20px' }} id="standard-basic" label="E-mail" variant="standard" />
            <TextField style={{ marginTop: '20px' }} id="standard-basic" label="Nome" variant="standard" />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '30px 20px 15px 20px',
            }}
          >
            <Button
              variant="outlined"
              size='small'
              color='error'
              onClick={() => { setAnchorEl(null) }}
              fullWidth
            >Cancelar</Button>
            <Button
              style={{
                marginLeft: '20px'
              }}
              variant="contained"
              color='primary'
              size='small'
              onClick={() => { setAnchorEl(null) }}
              fullWidth
            >Salvar</Button>
          </div>
        </div>
      </Popover>
  );
}