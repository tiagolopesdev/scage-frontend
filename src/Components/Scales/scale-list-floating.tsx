import { BadgeSizeFixed, ContainerUserList, Search } from "./style"
import { Input } from "../Input"
import { Button, Chip, IconButton, Skeleton } from "@mui/material"
import IconFilter from "../../Assets/filter_search.svg"
import { Icon } from "../Img"
import { Scale } from "./scale"
import { useEffect, useState } from "react"
import { getAllUsersByFiltersService, getAllUsersService, updateUser } from "../../Services/Users"
import { IUser } from "../../@types/IUser"
import { CustomToast } from "../CustomToast"
import toast from "react-hot-toast"
import { ScroolCustom } from "../../Styles/index"
import IconError from '../../Assets/icon_error.svg'
import { GetSingleScales } from "../../Services/Scale"
import { ISingleScale } from "../../@types/ISingleScale"


export const ScaleListFloating = () => {

  const [scales, setScales] = useState<ISingleScale[]>([]);
  const [nameToFilter, setNameToFilter] = useState('');
  const [sexFilter, setSexFilter] = useState('');
  const [userWasManipuled, setUserWasManipuled] = useState(false);

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

  console.log('Scales -> ', scales)

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
      <Search>
        <Input
          label="Digite o nome do servo"
          onChange={(event: any) => { setNameToFilter(event.target.value) }}
        />
        <IconButton onClick={(event: any) => { handleClick(event, false) }} >
          <Icon src={String(IconFilter)} />
        </IconButton>
      </Search>
      <BadgeSizeFixed>
        {sexFilter ?
          <Chip
            style={{ marginTop: '10px' }}
            label={sexFilter}
            onDelete={() => { setSexFilter('') }} /> :
          ''
        }
      </BadgeSizeFixed>
      <ScroolCustom
        style={{
          marginTop: '1%',
          maxHeight: '51.5%',
          paddingRight: '2%'
        }}
      >
        {managerUserRender()}
      </ScroolCustom>
    </ContainerUserList>
  )
}
