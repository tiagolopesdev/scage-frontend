import { ScroolCustom, Search, SidebarContainer } from "./style"
import { Input } from "../Input"
import { IconButton } from "@mui/material"
import IconFilter from "../../Assets/filter_search.svg"
import { Icon } from "../Img"
import { User } from "../Users/user"
import { useEffect, useState } from "react"
import { getAllUsersByFiltersService, getAllUsersService } from "../../Services/Users"
import { IUser } from "../../@types/IUser"


export const UserListFloating = () => {

  const [users, setUsers] = useState<IUser[]>([]);
  const [nameToFilter, setNameToFilter] = useState('');
  const [userWasManipuled, setUserWasManipuled] = useState(false);

  const managementFindUsers = async () => {
    try {

      const responseApi: IUser[] = nameToFilter ?
        await getAllUsersByFiltersService(nameToFilter) :
        await getAllUsersService();

      setUsers(responseApi);

    } catch (exception) {
    }
  }

  useEffect(() => {
    managementFindUsers()
  }, [])

  useEffect(() => {
    managementFindUsers()
    if (userWasManipuled) setUserWasManipuled(false)
  }, [nameToFilter, userWasManipuled])

  return (
    <SidebarContainer>
      <Search>
        <Input
          label="Digite o nome do servo"
          onChange={(event: any) => { setNameToFilter(event.target.value) }}
        />
        <IconButton>
          <Icon src={String(IconFilter)} />
        </IconButton>
      </Search>
      <ScroolCustom>
        {users.map((user) => {
          return <>
            <User user={user} setUserWasManipuled={setUserWasManipuled} />
          </>
        })}
      </ScroolCustom>
    </SidebarContainer>
  )
}
