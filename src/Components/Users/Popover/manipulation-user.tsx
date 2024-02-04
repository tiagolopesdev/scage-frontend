import Popover from '@mui/material/Popover';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { TextFieldContainer } from './style';
import { IUser } from '../../../@types/IUser';
import { SexEnum } from '../../../@types/SexEnum';
import { Dispatch, useState } from 'react';
import { createUser, updateUser } from '../../../Services/Users';
import { Toaster } from 'react-hot-toast';
import { CustomToast } from '../../CustomToast';
import IconError from '../../../Assets/icon_error.svg'
import IconSuccess from '../../../Assets/icon_success.svg'
import { ActionButtons } from '../../ActionButtons';
import { Input } from '../../Input';

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

  const [optionMasc, setOptionMasc] = useState(user?.sex === SexEnum.MASCULINO ? true : false);
  const [optionFem, setOptionFem] = useState(user?.sex === SexEnum.FEMININO ? true : false);
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
        sex: optionMasc ? SexEnum.MASCULINO : SexEnum.FEMININO,
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

  return <Popover
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
            label={SexEnum.MASCULINO.toString()}
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
            label={SexEnum.FEMININO.toString()}
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
        <Input
          label="E-mail"
          value={user?.email}
          onChange={(event: any) => { setUserManipulation({ ...userManipulation, email: event.target.value }) }}
          style={{ marginTop: '20px' }}
        />
        <Input
          label="Nome"
          value={user?.name}
          onChange={(event: any) => { setUserManipulation({ ...userManipulation, name: event.target.value }) }}
          style={{ marginTop: '20px' }}
        />
      </TextFieldContainer>
      <div style={{ margin: '10px 20px' }}>
        <ActionButtons
          nameLeft="Cancelar"
          nameRight="Salvar"
          actionLeft={() => { setAnchorEl(null) }}
          actionRight={() => { handlerUser() }}
        />
      </div>
    </div>
    <Toaster
      position="bottom-center"
      reverseOrder={false}
    />
  </Popover>
}