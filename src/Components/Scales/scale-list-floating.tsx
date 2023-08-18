import { ContainerUserList, ContainerComboBoxStyle } from "./style"
import { Alert, Autocomplete, TextField } from "@mui/material"
import { Scale } from "./scale"
import { useEffect, useState } from "react"
import { CustomToast } from "../CustomToast"
import { ScroolCustom } from "../../Styles/index"
import IconError from '../../Assets/icon_error.svg'
import { GetSingleScales } from "../../Services/Scale"
import { ISingleScale } from "../../@types/ISingleScale"
import { Months } from "../../@types/Months"


export const ScaleListFloating = () => {

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
  }, [selectedMonth])

  const managerScaleRender = () => {
    return !isLoading ?
      <div id="group-scales-single">
        {scales.map((scale) => {
          return <div key={scale.id}>
            <Scale scale={scale} />
          </div>
        })}
      </div> : <Alert severity="info">Escala de <strong>{selectedMonth}</strong> não encontrada</Alert>
  }

  return (
    <ContainerUserList>
      <ContainerComboBoxStyle>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={Months}
          sx={{ width: 300 }}
          isOptionEqualToValue={(option, value) => value.label === option.label}
          renderInput={(params) => <TextField {...params} label="Selecione o mês" />}
          onChange={(event: any) => { setSelectedMonth(event.target.innerText) }}
        />
      </ContainerComboBoxStyle>
      <ScroolCustom
        style={{
          marginTop: '8%',
          maxHeight: '55.5%',
          paddingRight: '2%'
        }}
      >
        {managerScaleRender()}
      </ScroolCustom>
    </ContainerUserList>
  )
}
