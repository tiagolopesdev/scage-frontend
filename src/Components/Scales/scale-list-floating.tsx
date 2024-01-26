import { ContainerComboBoxStyle, ContainerScaleList } from "./style"
import { Scale } from "./scale"
import { useContext, useEffect, useState } from "react"
import { CustomToast } from "../CustomToast"
import { ScroolCustom } from "../../Styles/index"
import IconError from '../../Assets/icon_error.svg'
import { GetSingleScales } from "../../Services/Scale"
import { ISingleScale } from "../../@types/ISingleScale"
import { ScaleContext } from "../../Context/scale"
import { Input } from "../Input"
import { Element, manageFeedbackDisplay } from "../../Utils/manageFeedbackDisplay"
import { Alert, Skeleton } from "@mui/material"
import { CustomMessageError } from "../CustomMessageError"
import { conditionHandling } from "../../Utils/conditionHandling"


export const ScaleListFloating = () => {

  const { scaleContext } = useContext(ScaleContext);
  const [scales, setScales] = useState<ISingleScale[]>([]);
  const [selectedMonth, setSelectedMonth] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const managementFindScales = async () => {
    try {
      const responseApi = selectedMonth === '' ?
        await GetSingleScales() :
        await GetSingleScales(selectedMonth)

      setScales(responseApi);
      setIsLoading(responseApi.response && responseApi.response.status === 400 ? true : false)
    } catch (exception) {
      CustomToast({
        duration: 2000,
        icon: String(IconError),
        message: 'Não foi possível obter escalas'
      })
      setIsLoading(false)
    }
  }

  useEffect(() => {
    managementFindScales()
  }, [selectedMonth, scaleContext])

  const managerScaleRender = manageFeedbackDisplay(
    scales.length === 0,
    !isLoading && scales.length > 0,
    selectedMonth,
    Element.SCALE,
    <div id="group-scales-single">
      {scales.map((scale) => {
        return <div key={scale.id}>
          <Scale scale={scale} />
        </div>
      })}
    </div>
  )

  return <ContainerScaleList>
    <ContainerComboBoxStyle>
      <Input
        value={selectedMonth}
        label='Digite o nome do mês'
        onChange={(event: any) => {
          setSelectedMonth(event.target.value ?? '')
        }}
      />
    </ContainerComboBoxStyle>
    <ScroolCustom style={!isLoading && (scales.length === 0 || scales.length === undefined) ? {
      display: 'flex', alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center'
    } : undefined} >
      {managerScaleRender}
    </ScroolCustom>
  </ContainerScaleList>
}
