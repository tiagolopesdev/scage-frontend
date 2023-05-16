import { ScroolCustom, Search, SidebarContainer } from "../Users/style"
import { Input } from "../Input"
import { IconButton } from "@mui/material"
import IconFilter from "../../Assets/filter_search.svg"
import { Icon } from "../Img"
import { User } from "../Users/user"
import { useEffect, useState } from "react"
import { getAllUsersByFiltersService, getAllUsersService } from "../../Services/Users"
import { IUser } from "../../@types/IUser"
import { UserListFloating } from "../Users/user-list-floating"


export const SideBar = () => {

  const [users, setUsers] = useState<IUser[]>([]);
  const [nameToFilter, setNameToFilter] = useState('');
  const [userWasManipuled, setUserWasManipuled] = useState(false);

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
  }, [nameToFilter, userWasManipuled])

  return (
    <UserListFloating/>
  )
}
