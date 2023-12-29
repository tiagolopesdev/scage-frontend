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

export const getAllUsersByFiltersService = async (name?: string, sex?: string) => {
  try {
    const response = await userChannel.get('api/User/filters', { params: { name, sex } });
    return response.data.data;
  } catch (error: any) {
    if (error.code === "ERR_NETWORK") {
      throw "Não foi possível se comunicar com o recurso de colaboradores"
    } else {
      throw error.response.data
    }
  }
}

export const getAllUsersService = async () => {  
  try {
    const response = await userChannel.get("api/User");
    return response.data.data;
  } catch (error: any) {
    if (error.code === "ERR_NETWORK") {
      throw "Não foi possível se comunicar com o recurso de colaboradores"
    } else {
      throw error.response.data
    }
  }
}
