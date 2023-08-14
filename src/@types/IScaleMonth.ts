
export interface IDay {
  name: string
  dateTime: string
  cameraOne: any
  cameraTwo: any
  cutDesk: any
}

export interface IScaleMonth {
  id?: string
  name: string
  start: string
  end: string
  days: IDay[]
}
