import { useEffect, useState } from "react";
import { Serving } from "../Users/Serving";
import { managementFindUsers } from "../../Handlers/users";
import { initialStateUser } from "../../@types/InitialStateDay";
import { IUser } from "../../@types/IUser";
import { ScroolCustom } from "../../Styles";


export const StatisticsList = () => {

  const [nameFilter, setNameFilter] = useState('')
  const [sexFilter, setSexFilter] = useState('')
  const [users, setUsers] = useState([initialStateUser])

  const usersFounded = async () => {
    const result = await managementFindUsers({ name: nameFilter, sex: sexFilter })
    setUsers(result as IUser[])
  }

  useEffect(() => {
    usersFounded()
  }, [])

  return <ScroolCustom style={{ width: '25vw', height: '75vh' }}>
    <Serving users={users} isStatistics={true} />
  </ScroolCustom>
}
