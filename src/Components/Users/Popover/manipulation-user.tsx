import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { ButtonContainer, TextFieldContainer } from './style';
import { IUser } from '../../../@types/IUser';
import { Sex } from '../../../@types/Sex';
import { Dispatch, useState } from 'react';
import { createUser, updateUser } from '../../../Services/Users';
import { Toaster } from 'react-hot-toast';
import { CustomToast } from '../../CustomToast';
import IconError from '../../../Assets/icon_error.svg'
import IconSuccess from '../../../Assets/icon_success.svg'

interface IManipulationUserProps {
  id: string | undefined,
  open: boolean,
  anchorEl: HTMLButtonElement | null,
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
  user?: IUser,
  setUserWasManipuled: Dispatch<React.SetStateAction<boolean>>
}

export const ManipulationUser = (props: IManipulationUserProps) => {

  const { id, anchorEl, open, setAnchorEl, user, setUserWasManipuled } = props

  const [optionMasc, setOptionMasc] = useState(user?.sex === Sex.MASCULINO ? true : false);
  const [optionFem, setOptionFem] = useState(user?.sex === Sex.FEMININO ? true : false);
  const [userManipulation, setUserManipulation] = useState<IUser>({
    id: user?.id ?? '',
    email: user?.email ?? '',
    name: user?.name ?? '',
    sex: user?.sex ?? '',
    isEnable: true
  });

  const handlerUser = async () => {
    try {

      const userToEdit: IUser = {
        id: userManipulation.id,
        name: userManipulation.name,
        email: userManipulation.email,
        sex: optionMasc ? Sex.MASCULINO : Sex.FEMININO,
        isEnable: userManipulation.isEnable,
      }

      const responseApi = user ?
        await updateUser(userToEdit) :
        await createUser(userToEdit);

      CustomToast({
        duration: 2000,
        message: responseApi,
        icon: String(IconSuccess)
      });
      
      setAnchorEl(null)
      setUserWasManipuled(true);
      
    } catch (error: any) {
      CustomToast({
        duration: 2000,
        message: error,
        icon: String(IconError)
      });
    }
  }

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
                    if (!optionMasc && !optionFem) {
                      setOptionMasc(!optionMasc)
                      return
                    }
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
                    if (!optionMasc && !optionFem) {
                      setOptionFem(!optionFem)
                      return
                    }
                    setOptionFem(!optionFem)
                    setOptionMasc(!optionMasc)
                  }}
                />
              }
            />
          </RadioGroup>
          <TextField
            label="E-mail"
            variant="standard"
            id="standard-basic"
            defaultValue={user?.email}
            style={{ marginTop: '20px' }}
            onChange={(event: any) => { setUserManipulation({ ...userManipulation, email: event.target.value }) }}
          />
          <TextField
            label="Nome"
            variant="standard"
            id="standard-basic"
            defaultValue={user?.name}
            style={{ marginTop: '20px' }}
            onChange={(event: any) => { setUserManipulation({ ...userManipulation, name: event.target.value }) }}
          />
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
            onClick={() => { handlerUser() }}
            fullWidth
          >Salvar</Button>
        </ButtonContainer>
      </div>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </Popover>
  );
}