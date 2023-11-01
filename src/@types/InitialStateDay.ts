import { IDay } from "./IScaleMonth"
import { IUser } from "./IUser"

export const initialStateUser: IUser = {
  email: '',
  name: '',
  sex: '',
  isEnable: true
}
export const initialStateDay: IDay = {
  name: '',
  dateTime: '',
  cameraOne: initialStateUser,
  cameraTwo: initialStateUser,
  cutDesk: initialStateUser,
  isEnable: true
}