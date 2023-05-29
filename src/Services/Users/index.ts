import { IUser } from "../../@types/IUser";
import { userChannel } from "../Bases/api"


export const createUser = (user: IUser) => {
  return userChannel.post('api/User/createUser', user)
  .then((response) => response.data.message)
  .catch((error) => error)
}

export const updateUser = (user: IUser) => {
  return userChannel.put('api/User/updateUser', user)
    .then((response) => response.data.message)
    .catch((error) => error.response.data)
}

export const getAllUsersByFiltersService = (name?: string, sex?: string) => {
  return userChannel.get('api/User/filters', { params: { name, sex } })
    .then((response) => response.data.data)
    .catch((response) => response.message);
}

export const getAllUsersService = () => {  
  return userChannel.get("api/User")
    .then((response) => response.data.data)
    .catch((response) => { return response });
}
