import { BadgeSizeFixed, ContainerUserList, ContainerComboBoxStyle } from "./style"
import { Input } from "../Input"
import { Autocomplete, Button, Chip, IconButton, Skeleton, TextField } from "@mui/material"
import IconFilter from "../../Assets/filter_search.svg"
import { Icon } from "../Img"
import { Scale } from "./scale"
import { useEffect, useState } from "react"
import { IUser } from "../../@types/IUser"
import { CustomToast } from "../CustomToast"
import toast from "react-hot-toast"
import { ScroolCustom } from "../../Styles/index"
import IconError from '../../Assets/icon_error.svg'
import { GetSingleScales } from "../../Services/Scale"
import { ISingleScale } from "../../@types/ISingleScale"
import { Months } from "../../@types/Months"


export const ScaleListFloating = () => {

  const [scales, setScales] = useState<ISingleScale[]>([]);
  const [nameToFilter, setNameToFilter] = useState('');
  const [sexFilter, setSexFilter] = useState('');
  const [userWasManipuled, setUserWasManipuled] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('')

  const [anchorManipulationPopover, setAnchorManipulationPopover] = useState<HTMLButtonElement | null>(null);
  const openManipulationPopover = Boolean(anchorManipulationPopover);
  const idManipulation = openManipulationPopover ? 'simple-popover-manipulation' : undefined;

  const [anchorFilterPopover, setAnchorFilterPopover] = useState<HTMLButtonElement | null>(null);
  const openFilterPopover = Boolean(anchorFilterPopover);
  const idFilter = openFilterPopover ? 'simple-popover-filter' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, popoverManipulation: boolean) => {
    popoverManipulation ?
      setAnchorManipulationPopover(event.currentTarget) :
      setAnchorFilterPopover(event.currentTarget);
  };

  const managementFindScales = async () => {
    try {

      let responseApi: ISingleScale[] = [];

      if (nameToFilter === '' && sexFilter === '') {
        responseApi = await GetSingleScales();
      } else {
        // responseApi = await getAllScalesByFiltersService(nameToFilter, sexFilter)
      }

      setScales(responseApi);

    } catch (exception) {
      CustomToast({
        duration: 2000,
        icon: String(IconError),
        message: 'Não foi possível obter usuários'
      })
    }
  }

  useEffect(() => {
    managementFindScales()
    if (userWasManipuled) setUserWasManipuled(false)
  }, [nameToFilter, userWasManipuled, sexFilter])

  const managerUserRender = () => {
    if (scales.length > 0) {
      return <>
        {scales.map((scale) => {
          return <div key={scale.id}>
            <Scale scale={scale} />
          </div>
        })}
      </>
    } else {
      return (
        <Skeleton variant="rounded" width={330} height='100%' />
      )
    }
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
          maxHeight: '51.5%',
          paddingRight: '2%'
        }}
      >
        {managerUserRender()}
      </ScroolCustom>
    </ContainerUserList>
  )
}
