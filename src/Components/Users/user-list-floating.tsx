import { Input } from "../Input"
import { Box, Button, Chip, IconButton, Skeleton } from "@mui/material"
import { Icon } from "../Img"
import { User } from "../Users/user"
import { useEffect, useState } from "react"
import { updateUser } from "../../Services/Users"
import { ManipulationUser } from "./Popover/manipulation-user"
import { FilterUser } from "./Popover/filter-user"
import toast from "react-hot-toast"
import { CustomMessageError } from "../CustomMessageError"
import { managementFindUsers } from "../../Handlers/users"

import { BadgeSizeFixed, ContainerUserList, Search } from "./style"
import { ScroolCustom } from "../../Styles/index"
import { IUser } from "../../@types/IUser"
import IconFilter from "../../Assets/filter_search.svg"


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

  const usersFounded = async () => {
    try {
      const result = await managementFindUsers({ name: nameToFilter, sex: sexFilter })
      setUsers(result as IUser[])      
    } catch (error) {    
    }
  }

  useEffect(() => {
    usersFounded()
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
      return users.map((user) => {
        return <div key={user.id} style={{ maxWidth: '25vw' }}>
          <User
            user={user}
            setUserWasManipuled={setUserWasManipuled}
            onDelete={deleteUser}
          />
        </div>
      })
    } else {
      return (
        <Skeleton variant="rounded" width='100%' height='60vh' />
      )
    }
  }

  return (
    <ContainerUserList>
      <Box sx={{
        maxWidth: '25vw',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        marginBottom: '25px'
      }}>
        <Search>
          <Input
            label="Digite o nome do colaborador"
            onChange={(event: any) => { setNameToFilter(event.target.value) }}
          />
          <IconButton onClick={(event: any) => { handleClick(event, false) }} >
            <Icon src={String(IconFilter)} />
          </IconButton>
        </Search>
        <BadgeSizeFixed>
          {sexFilter ?
            <Chip
              size="small"
              label={sexFilter}
              sx={{ marginTop: '8px', fontWeight: 600 }}
              onDelete={() => { setSexFilter('') }} /> :
            ''
          }
        </BadgeSizeFixed>
      </Box>
      <ScroolCustom style={users.length > 0 || users.length !== undefined ? undefined : {
        display: 'flex', alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
      }}>
        {
          users.length <= 0 || users.length === undefined ?
            <CustomMessageError message="Não foi possível exibir os colaboradores." /> :
            managerUserRender()
        }
      </ScroolCustom>
      <Button
        style={{
          borderRadius: '12px',
          fontFamily: 'Dosis',
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: '600',
          padding: '3px',
          backgroundColor: 'rgb(14, 202, 101)',
          position: 'sticky',
          left: 10,
          bottom: 10
        }}
        variant="contained"
        size='small'
        onClick={(event: any) => { handleClick(event, true) }}
        fullWidth
      >Adicionar novo colaborador</Button>
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
