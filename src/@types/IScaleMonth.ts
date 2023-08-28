import { IUser } from "./IUser"

export interface IDay {
  name: string
  dateTime: string
  cameraOne?: IUser
  cameraTwo?: IUser
  cutDesk?: IUser
}

export interface IScaleMonth {
  id?: string
  name: string
  start: string
  end: string
  days: IDay[]
}
