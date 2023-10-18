import { ReactNode, createContext, useEffect, useState } from "react"
import { GetScale } from "../Services/Scale";
import { IDay, IScaleMonth } from "../@types/IScaleMonth";
import { initialStateDay, initialStateUser } from "../@types/InitialStateDay";
import { IUser } from "../@types/IUser";


interface IFromDay {
  day: IDay,
  serf: IUser
}

const InitialState: IFromDay = {
  day: initialStateDay,
  serf: initialStateUser
}

interface IScaleContextProvider {
  children: ReactNode
}

interface IScaleContext {
  scaleId: string;
  setScaleId: React.Dispatch<React.SetStateAction<string>>,
  scaleContext: IScaleMonth
  setScaleContext: React.Dispatch<React.SetStateAction<IScaleMonth>>
  displayScale: boolean
  setDisplayScale: React.Dispatch<React.SetStateAction<boolean>>
  toDay: IFromDay,
  setToDay: React.Dispatch<React.SetStateAction<IFromDay>>,
  fromDay: IFromDay,
  setFromDay: React.Dispatch<React.SetStateAction<IFromDay>>
}

export const ScaleContext = createContext({} as IScaleContext)

export const ScaleProvider = ({ children }: IScaleContextProvider) => {

  const [fromDay, setFromDay] = useState<IFromDay>(InitialState);
  const [toDay, setToDay] = useState<IFromDay>(InitialState);
  const [scaleId, setScaleId] = useState('');
  const [scaleContext, setScaleContext] = useState<IScaleMonth>({
    name: '',
    start: '',
    end: '',
    days: [],
    isEnable: true
  });
  const [displayScale, setDisplayScale] = useState(false)

  const getScale = async () => {
    try {
      const responseApi = await GetScale(scaleId)
      setScaleContext(responseApi)
    } catch (error) {
    }
  }

  useEffect(() => {
    if (scaleId) getScale()
  }, [scaleId])

  return (
    <ScaleContext.Provider value={{
      scaleId, 
      setScaleId, 
      scaleContext, 
      setScaleContext, 
      displayScale, 
      setDisplayScale,
      fromDay,
      setFromDay,
      toDay,
      setToDay
    }} >
      {children}
    </ScaleContext.Provider>
  )
}
