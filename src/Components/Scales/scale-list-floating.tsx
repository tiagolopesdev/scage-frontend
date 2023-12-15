import { ContainerComboBoxStyle, ContainerScaleList } from "./style"
import { Alert, Autocomplete, Skeleton, TextField } from "@mui/material"
import { Scale } from "./scale"
import { useContext, useEffect, useState } from "react"
import { CustomToast } from "../CustomToast"
import { ScroolCustom } from "../../Styles/index"
import IconError from '../../Assets/icon_error.svg'
import { GetSingleScales } from "../../Services/Scale"
import { ISingleScale } from "../../@types/ISingleScale"
import { Months } from "../../@types/Months"
import { ScaleContext } from "../../Context/scale"
import { Input } from "../Input"
import { CustomMessageError } from "../CustomMessageError"


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
    }
  }

  useEffect(() => {
    managementFindScales()
  }, [selectedMonth, scaleContext])

  const managerScaleRender = () => {
    if (scales.length === 0) {
      return <Skeleton variant="rounded" width="100%" height='50rem' />
    } else if (!isLoading && scales.length > 0) {
      return <div id="group-scales-single">
        {scales.map((scale) => {
          return <div key={scale.id}>
            <Scale scale={scale} />
          </div>
        })}
      </div>
    }
    // else {
    //   return selectedMonth === '' ?
    //     <CustomMessageError message="Não foi possível exibir as escalas" /> :
    //     <Alert severity="info">Escala de <strong>{selectedMonth}</strong> não encontrada</Alert>
    // }
  }

  return (
    <ContainerScaleList>
      <ContainerComboBoxStyle>
        <Input
          value={selectedMonth}
          label='Mês'
          onChange={(event: any) => {
            setSelectedMonth(event.target.value ?? '')
          }}
        />
      </ContainerComboBoxStyle>
      <ScroolCustom style={scales.length === 0 && isLoading ? undefined : {
        display: 'flex', alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
      }} >
        {
          scales.length !== 0 && !isLoading ?
            <CustomMessageError message="Não foi possível exibir as escalas." /> :
            managerScaleRender()
        }
      </ScroolCustom>
    </ContainerScaleList>
  )
}
