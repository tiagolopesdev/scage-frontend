import { Sex } from "../../@types/Sex";
import { userChannel } from "../Bases/api"


export const getAllUsersByFiltersService = async (name: string, sex?: Sex) => {

  const uri = sex ? `name=${name}&sex=${sex}` : `name=${name}`

  return await userChannel.get(`apiUser/filters?${uri}`)
    .then((response) => response.data.data)
    .catch((response) => response.message);
}

export const getAllUsersService = async () => {
  return await userChannel.get("api/User")
    .then((response) => response.data.data)
    .catch((response) => response.message);
}
