import { ReactNode, createContext, useState } from "react"
import { IDay } from "../@types/IScaleMonth";
import { IUser } from "../@types/IUser";


interface IChangeDaySerfContextProvider {
  children: ReactNode
}

interface IChangeDaySerfContext {
  toDay: IDay,
  setToDay: React.Dispatch<React.SetStateAction<IDay>>,
  fromDay: IDay,
  setFromDay: React.Dispatch<React.SetStateAction<IDay>>
}

const InitialStateUser: IUser = {
  id: '',
  name: '',
  email: '',
  sex: '',
  isEnable: false
}
const InitialStateDay: IDay = {
  id: '',
  name: '',
  dateTime: '',
  isEnable: false,
  cameraOne: InitialStateUser,
  cameraTwo: InitialStateUser,
  cutDesk: InitialStateUser
}

export const ChangeDaySerfContext = createContext({} as IChangeDaySerfContext)

export const ChangeDaySerfProvider = ({ children }: IChangeDaySerfContextProvider) => {

  const [fromDay, setFromDay] = useState<IDay>(InitialStateDay);
  const [toDay, setToDay] = useState<IDay>(InitialStateDay);

  return (
    <ChangeDaySerfContext.Provider value={{
      fromDay, 
      setFromDay,
      toDay, 
      setToDay
    }} >
      {children}
    </ChangeDaySerfContext.Provider>
  )
}
