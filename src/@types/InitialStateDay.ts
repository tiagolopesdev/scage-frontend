import { IDay } from "./IScaleMonth"
import { IUser } from "./IUser"

const initialStateUser: IUser = {
  email: '',
  name: '',
  sex: ''
}
export const initialStateDay: IDay = {
  name: '',
  dateTime: '',
  cameraOne: initialStateUser,
  cameraTwo: initialStateUser,
  cutDesk: initialStateUser
}