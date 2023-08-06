import { BadgeSizeFixed, ContainerUserList, Search } from "./style"
import { Input } from "../Input"
import { Button, Chip, IconButton, Skeleton } from "@mui/material"
import IconFilter from "../../Assets/filter_search.svg"
import { Icon } from "../Img"
import { User } from "../Users/user"
import { useEffect, useState } from "react"
import { getAllUsersByFiltersService, getAllUsersService, updateUser } from "../../Services/Users"
import { IUser } from "../../@types/IUser"
import { ManipulationUser } from "./Popover/manipulation-user"
import { FilterUser } from "./Popover/filter-user"
import { CustomToast } from "../CustomToast"
import toast from "react-hot-toast"
import { ScroolCustom } from "../../Styles/index"
import IconError from '../../Assets/icon_error.svg'


export const UserListFloating = () => {

  const [users, setUsers] = useState<IUser[]>([]);
  const [nameToFilter, setNameToFilter] = useState('');
  const [sexFilter, setSexFilter] = useState('');
  const [userWasManipuled, setUserWasManipuled] = useState(false);

  const [anchorManipulationPopover, setAnchorManipulationPopover] = useState<HTMLButtonElement | null>(null);
  const openManipulationPopover = Boolean(anchorManipulationPopover);
  const idManipulation = openManipulationPopover ? 'simple-popover-manipulation' : undefined;

  const [anchorFilterPopover, setAnchorFilterPopover] = useState<HTMLButtonElement | null>(null);
  const openFilterPopover = Boolean(anchorFilterPopover);
  const idFilter = openFilterPopover ? 'simple-popover-filter' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, popoverManipulation: boolean) => {
    popoverManipulation ?
      setAnchorManipulationPopover(event.currentTarget) :
      setAnchorFilterPopover(event.currentTarget);
  };

  const managementFindUsers = async () => {
    try {

      let responseApi: IUser[] = [];

      if (nameToFilter === '' && sexFilter === '') {
        responseApi = await getAllUsersService();
      } else {
        responseApi = await getAllUsersByFiltersService(nameToFilter, sexFilter)
      }

      setUsers(responseApi);

    } catch (exception) {
      CustomToast({
        duration: 2000,
        icon: String(IconError),
        message: 'Não foi possível obter usuários'
      })
    }
  }

  useEffect(() => {
    managementFindUsers()
    if (userWasManipuled) setUserWasManipuled(false)
  }, [nameToFilter, userWasManipuled, sexFilter])

  const deleteUser = async (user: IUser) => {
    try {

      const userToEdit: IUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        sex: user.sex,
        isEnable: false,
      }

      const responseApi = await updateUser(userToEdit);

      toast.success(responseApi)

      setAnchorManipulationPopover(null)
      setUserWasManipuled(true);

    } catch (error: any) {
      toast.error(error)
    }
  }

  const managerUserRender = () => {
    if (users.length > 0) {
      return <>
        {users.map((user) => {
          return <div key={user.id}>
            <User
              user={user}
              setUserWasManipuled={setUserWasManipuled}
              onDelete={deleteUser}
            />
          </div>
        })}
      </>
    } else {
      return (
        <Skeleton variant="rounded" width={360} height='50rem' />
      )
    }
  }

  return (
    <ContainerUserList>
      <Search>
        <Input
          label="Digite o nome do servo"
          onChange={(event: any) => { setNameToFilter(event.target.value) }}
        />
        <IconButton onClick={(event: any) => { handleClick(event, false) }} >
          <Icon src={String(IconFilter)} />
        </IconButton>
      </Search>
      <BadgeSizeFixed>
        {sexFilter ?
          <Chip
            style={{ marginTop: '10px' }}
            label={sexFilter}
            onDelete={() => { setSexFilter('') }} /> :
          ''
        }
      </BadgeSizeFixed>
      <ScroolCustom
        style={{
          marginTop: '1%',
          maxHeight: '51.5%',
          paddingRight: '2%'
        }}
      >
        {managerUserRender()}
      </ScroolCustom>
      <Button
        style={{
          borderRadius: '12px',
          fontFamily: 'Dosis',
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: '600',
          padding: '3px',
          marginTop: '15px',
          backgroundColor: 'rgb(14, 202, 101)'
        }}
        variant="contained"
        size='small'
        onClick={(event: any) => { handleClick(event, true) }}
        fullWidth
      >Adicionar novo servo</Button>
      {
        openManipulationPopover ?
          <ManipulationUser
            id={idManipulation}
            anchorEl={anchorManipulationPopover}
            open={openManipulationPopover}
            setAnchorEl={setAnchorManipulationPopover}
            setUserWasManipuled={setUserWasManipuled}
          /> : ''
      }
      {
        openFilterPopover ?
          <FilterUser
            id={idFilter}
            anchorEl={anchorFilterPopover}
            open={openFilterPopover}
            setAnchorEl={setAnchorFilterPopover}
            setSexSelected={setSexFilter}
          /> : ''
      }
    </ContainerUserList>
  )
}
