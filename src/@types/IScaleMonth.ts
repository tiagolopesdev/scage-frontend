import { IUser } from "./IUser"

export interface IDay {
  id?: string,
  name: string
  dateTime: string
  cameraOne?: IUser
  cameraTwo?: IUser
  cutDesk?: IUser
  isEnable?: boolean
}

export interface IScaleMonth {
  id?: string
  name: string
  start: string
  end: string
  days: IDay[]
  isEnable?: boolean
}
