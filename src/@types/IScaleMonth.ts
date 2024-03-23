import { IUser } from "./IUser"
import { IYoutube } from "./Youtube/IYoutube"
import { IThumbnails } from "./Youtube/Thumbnails"

/*
  TODO => A interface abaixo deve ser mudada, pois o thumbnails deve estar dentro do youtube e não fora como está abaixo
*/
export interface IDay {
  id?: string,
  name: string
  dateTime: string
  liveStreamId?: string
  cameraOne?: IUser
  cameraTwo?: IUser
  cutDesk?: IUser
  isEnable?: boolean,
  thumbnails?: IThumbnails
  youtube?: IYoutube
}

export interface IScaleMonth {
  id?: string
  name: string
  start: string
  end: string
  days: IDay[]
  isEnable?: boolean
}
