import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { ButtonContainer, TextFieldContainer } from './style';
import { IUser } from '../../../@types/IUser';
import { Sex } from '../../../@types/Sex';
import { useState } from 'react';

interface IManipulationUserProps {
  id: string | undefined,
  open: boolean,
  anchorEl: HTMLButtonElement | null,
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
  user: IUser
}

export const ManipulationUser = (props: IManipulationUserProps) => {

  const { id, anchorEl, open, setAnchorEl, user } = props

  const [optionMasc, setOptionMasc] = useState(user.sex === 0 ? true : false);
  const [optionFem, setOptionFem] = useState(user.sex === 1 ? true : false);

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
          <RadioGroup
            style={{ marginTop: '10px' }}
          >
            <FormControlLabel
              label={Sex.MASCULINO.toString()}
              control={
                <Radio
                  checked={optionMasc}
                  onClick={() => { 
                    setOptionMasc(!optionMasc) 
                    setOptionFem(!optionFem)
                  }}
                />
              }
            />
            <FormControlLabel
              label={Sex.FEMININO.toString()}
              control={
                <Radio
                  checked={optionFem}
                  onClick={() => { 
                    setOptionFem(!optionFem) 
                    setOptionMasc(!optionMasc)
                  }}
                />
              }
            />
          </RadioGroup>
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