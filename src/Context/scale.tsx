import { ReactNode, createContext, useState } from "react"


interface IScaleContextProvider {
  children: ReactNode
}

interface IScaleContext {
  scaleId: string;
  setScaleId: React.Dispatch<React.SetStateAction<string>>
}

export const ScaleContext = createContext({} as IScaleContext)

export const ScaleProvider = ({ children }: IScaleContextProvider) => {

  const [scaleId, setScaleId] = useState('');

  return (
    <ScaleContext.Provider value={{ scaleId, setScaleId }} >
      {children}
    </ScaleContext.Provider>
  )
}
