
export interface IDaySendApi {
  id?: string,
  name: string
  dateTime: string
  cameraOne?: string
  cameraTwo?: string
  cutDesk?: string
  isEnable?: boolean
}

export interface IScaleMonthSendApi {
  id?: string
  name: string
  start: string
  end: string
  days: IDaySendApi[]
  isEnable?: boolean
}
