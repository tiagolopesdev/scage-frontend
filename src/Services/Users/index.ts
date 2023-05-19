import { IUser } from "../../@types/IUser";
import { Sex } from "../../@types/Sex";
import { userChannel } from "../Bases/api"

export const createUser = async (user: IUser) => {
  return await userChannel.post('api/User/createUser', user)
    .then((response) => response.data.message)
    .catch((error) => error.response.data)
}

export const updateUser = async (user: IUser) => {
  return await userChannel.put('api/User/updateUser', user)
    .then((response) => response.data.message)
    .catch((error) => error.response.data)
}

export const getAllUsersByFiltersService = async (name: string, sex?: Sex) => {

  const uri = sex ? `name=${name}&sex=${sex}` : `name=${name}`

  return await userChannel.get(`api/User/filters?${uri}`)
    .then((response) => response.data.data)
    .catch((response) => response.message);
}

export const getAllUsersService = async () => {
  return await userChannel.get("api/User")
    .then((response) => response.data.data)
    .catch((response) => response.message);
}
