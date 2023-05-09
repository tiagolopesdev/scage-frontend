import { userChannel } from "../Bases/api"


export const getAllUsersService = async () => {
  return await userChannel.get("api/User")
    .then((response) => response.data.data)
    .catch((response) => response.message);
}
