import { IUser } from "../@types/IUser";
import { CustomToast } from "../Components/CustomToast";
import { getAllUsersByFiltersService, getAllUsersService } from "../Services/Users";

import IconError from '../Assets/icon_error.svg'


interface IManagerFindUsers {
  sex: string,
  name: string,
}

export const managementFindUsers = async (props: IManagerFindUsers) => {
  try {

    const responseApi: IUser[] = props.name === '' && props.sex === '' ?
      await getAllUsersService() :
      await getAllUsersByFiltersService(props.name, props.sex)

    return responseApi;

  } catch (exception) {
    throw CustomToast({
      duration: 2000,
      icon: String(IconError),
      message: exception as string
    })    
  }
}
