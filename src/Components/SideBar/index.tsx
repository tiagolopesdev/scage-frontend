import { Search, SidebarContainer } from "./style"
import { Input } from "../Input"
import { IconButton } from "@mui/material"
import IconFilter from "../../Assets/filter_search.svg"
import { Icon } from "../Img"
import { User } from "../Users"
import { useEffect, useState } from "react"
import { getAllUsersService } from "../../Services/Users"
import { IUser } from "../../@types/IUser"


export const SideBar = () => {

  const [users, setUsers] = useState<IUser[]>([]);

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

  return (
    <SidebarContainer>      
      <Search>
        <Input
          label="Digite o nome do servo"
        />
        <IconButton>
          <Icon src={String(IconFilter)} />
        </IconButton>
      </Search>
      <div
        style={{
          marginTop: '15%',
        }}
      >
        <User/>
      </div>
    </SidebarContainer>
  )
}
