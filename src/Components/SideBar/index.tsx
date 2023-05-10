import { ScroolCustom, Search, SidebarContainer } from "./style"
import { Input } from "../Input"
import { IconButton } from "@mui/material"
import IconFilter from "../../Assets/filter_search.svg"
import { Icon } from "../Img"
import { User } from "../Users"
import { useEffect, useState } from "react"
import { getAllUsersByFiltersService, getAllUsersService } from "../../Services/Users"
import { IUser } from "../../@types/IUser"


export const SideBar = () => {

  const [users, setUsers] = useState<IUser[]>([]);
  const [nameToFilter, setNameToFilter] = useState('');

  const getAllUsers = async () => {
    try {

      const responseApi: IUser[] = await getAllUsersService();

      setUsers(responseApi);

    } catch (exception) {
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const getUsersByFilter = async () => {
    try {

      const responseApi: IUser[] = await getAllUsersByFiltersService(nameToFilter);

      setUsers(responseApi);      

    } catch (expection) {

    }
  }

  useEffect(() => {
    nameToFilter ? getUsersByFilter() : getAllUsers()
  }, [nameToFilter])

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
      <div
        style={{
          marginTop: '15%',
          scrollBehavior: 'smooth',
          overflowY: 'scroll',
          height: '60%'
        }}
      >
        <User users={users} />
      </div>
    </SidebarContainer>
  )
}
