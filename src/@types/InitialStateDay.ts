import { IDay, IScaleMonth } from "./IScaleMonth"
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

export const initialStateScale: IScaleMonth = {
  id: '',
  start: '',
  end: '',
  name: '',
  isEnable: false,
  days: []
}