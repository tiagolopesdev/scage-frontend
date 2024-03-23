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


export const ScaleListFloating = () => {

  const { scaleContext, isNotDisplayScale } = useContext(ScaleContext);
  const [scales, setScales] = useState<ISingleScale[]>([]);
  const [selectedMonth, setSelectedMonth] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const managementFindScales = async () => {
    try {
      setIsLoading(!isLoading)
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
    if (!isNotDisplayScale) managementFindScales()
  }, [selectedMonth, scaleContext])

  const managerScaleRender = manageFeedbackDisplay({
    elements: <div id="group-scales-single">
      {([] as ISingleScale[]).concat(scales ?? [])?.map((scale) => {
        return <div key={scale.id}>
          <Scale scale={scale} />
        </div>
      })}
    </div>,
    typeElement: Element.SCALE,
    showSkeleton: isLoading,
    showElement: !isLoading && scales.length > 0,
    showFilter: selectedMonth
  })

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
