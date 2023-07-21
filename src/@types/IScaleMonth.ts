import { IUser } from "./IUser"


export interface IDay {
  name: string
  dateTime: string
  cameraOne: any
  cameraTwo: any
  cutDesk: any
}

export interface IScaleMonth {
  name: string
  start: string
  end: string
  days: IDay[]
}
