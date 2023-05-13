import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { ButtonContainer, TextFieldContainer } from './style';
import { IUser } from '../../../@types/IUser';

interface IManipulationUserProps {
  id: string | undefined,
  open: boolean,
  anchorEl: HTMLButtonElement | null,
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
  user: IUser
}

export const ManipulationUser = (props: IManipulationUserProps) => {

  const { id, anchorEl, open, setAnchorEl, user } = props

  console.log('User ', user)

  const StyleButtonCustom = (styleCustom?: any) => ({
    borderRadius: '15px',
    fontFamily: 'Dosis',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    padding: '0px',
    ...styleCustom
  })

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
        <TextFieldContainer>
          <TextField defaultValue={user.sex}  style={{ marginTop: '20px' }} id="standard-basic" label="Sexo" variant="standard" />
          <TextField defaultValue={user.email} style={{ marginTop: '20px' }} id="standard-basic" label="E-mail" variant="standard" />
          <TextField defaultValue={user.name} style={{ marginTop: '20px' }} id="standard-basic" label="Nome" variant="standard" />
        </TextFieldContainer>
        <ButtonContainer>
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
            onClick={() => { setAnchorEl(null) }}
            fullWidth
          >Salvar</Button>
        </ButtonContainer>
      </div>
    </Popover>
  );
}