import { ReactNode, createContext, useEffect, useState } from "react"
import { GetScale } from "../Services/Scale";
import { IScaleMonth } from "../@types/IScaleMonth";
import { initialStateDay, initialStateUser } from "../@types/InitialStateDay";
import { ISerfHandler } from "../@types/IFromDay";
import { InitialStateScaleMonth } from "../@types/InitialStateScaleMonth";


const InitialState: ISerfHandler = {
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
  toDay: ISerfHandler,
  setToDay: React.Dispatch<React.SetStateAction<ISerfHandler>>,
  fromDay: ISerfHandler,
  setFromDay: React.Dispatch<React.SetStateAction<ISerfHandler>>
  isNotDisplayScale: boolean
  setIsNotDisplayScale: React.Dispatch<React.SetStateAction<boolean>>
}

export const ScaleContext = createContext({} as IScaleContext)

export const ScaleProvider = ({ children }: IScaleContextProvider) => {

  const [fromDay, setFromDay] = useState<ISerfHandler>(InitialState);
  const [toDay, setToDay] = useState<ISerfHandler>(InitialState);
  const [scaleId, setScaleId] = useState('');
  const [scaleContext, setScaleContext] = useState<IScaleMonth>(InitialStateScaleMonth);
  const [displayScale, setDisplayScale] = useState(false)
  const [isNotDisplayScale, setIsNotDisplayScale] = useState(false)

  const getScale = async () => {
    try {
      const responseApi = await GetScale(scaleId)
      setScaleContext(responseApi)
    } catch (error) {
    }
  }

  useEffect(() => {
    if (scaleId && scaleId !== '') getScale()
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
      setToDay,
      isNotDisplayScale,
      setIsNotDisplayScale
    }} >
      {children}
    </ScaleContext.Provider>
  )
}
