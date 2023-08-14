import { ReactNode, createContext, useEffect, useState } from "react"
import { GetScale } from "../Services/Scale";
import { IScaleMonth } from "../@types/IScaleMonth";


interface IScaleContextProvider {
  children: ReactNode
}

interface IScaleContext {
  scaleId: string;
  setScaleId: React.Dispatch<React.SetStateAction<string>>,
  scaleContext: IScaleMonth | undefined
}

export const ScaleContext = createContext({} as IScaleContext)

export const ScaleProvider = ({ children }: IScaleContextProvider) => {

  const [scaleId, setScaleId] = useState('');
  const [scaleContext, setScaleContext] = useState<IScaleMonth>();

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
    <ScaleContext.Provider value={{ scaleId, setScaleId, scaleContext }} >
      {children}
    </ScaleContext.Provider>
  )
}
