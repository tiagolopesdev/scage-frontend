import { ReactNode, createContext, useEffect, useState } from "react"
import { GetScale } from "../Services/Scale";
import { IScaleMonth } from "../@types/IScaleMonth";


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
}

export const ScaleContext = createContext({} as IScaleContext)

export const ScaleProvider = ({ children }: IScaleContextProvider) => {

  const [scaleId, setScaleId] = useState('');
  const [scaleContext, setScaleContext] = useState<IScaleMonth>({
    name: '',
    start: '',
    end: '',
    days: []
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
    <ScaleContext.Provider value={{ scaleId, setScaleId, scaleContext, setScaleContext, displayScale, setDisplayScale }} >
      {children}
    </ScaleContext.Provider>
  )
}
