import { useEffect, useState } from "react";
import { Serving } from "../Users/Serving";
import { managementFindUsers } from "../../Handlers/users";
import { initialStateUser } from "../../@types/InitialStateDay";
import { IUser } from "../../@types/IUser";
import { ScroolCustom } from "../../Styles";
import { Chip, IconButton } from "@mui/material";
import { Input } from "../Input";
import { BadgeSizeFixedStyle, ContainerFiltersStyle, SearchStyle } from "./style";
import { FilterUser } from "../Users/Popover/filter-user";
import IconFilter from "../../Assets/filter_search.svg"
import { Icon } from "../Img";


export const StatisticsList = () => {

  const [nameFilter, setNameFilter] = useState('')
  const [sexFilter, setSexFilter] = useState('')
  const [users, setUsers] = useState([initialStateUser])

  const [anchorFilterPopover, setAnchorFilterPopover] = useState<HTMLButtonElement | null>(null);
  const openFilterPopover = Boolean(anchorFilterPopover);
  const idFilter = openFilterPopover ? 'simple-popover-filter' : undefined;

  const usersFounded = async () => {
    const result = await managementFindUsers({ name: nameFilter, sex: sexFilter })
    setUsers(result as IUser[])
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorFilterPopover(event.currentTarget);
  };

  useEffect(() => {
    usersFounded()
  }, [nameFilter, sexFilter])

  return <>
    <ContainerFiltersStyle >
      <SearchStyle>
        <Input
          label="Digite o nome do colaborador"
          onChange={(event: any) => { setNameFilter(event.target.value) }}
        />
        <IconButton onClick={(event: any) => { handleClick(event) }} >
          <Icon src={String(IconFilter)} />
        </IconButton>
      </SearchStyle>
      <BadgeSizeFixedStyle>
        {sexFilter ?
          <Chip
            size="small"
            label={sexFilter}
            sx={{ marginTop: '8px', fontWeight: 600 }}
            onDelete={() => { setSexFilter('') }} /> :
          ''
        }
      </BadgeSizeFixedStyle>
    </ContainerFiltersStyle>
    <ScroolCustom style={{ width: '25vw', height: '60vh' }}>
      <Serving users={users} isStatistics={true} />
    </ScroolCustom>
    {
      openFilterPopover ?
        <FilterUser
          id={idFilter}
          anchorEl={anchorFilterPopover}
          open={openFilterPopover}
          setAnchorEl={setAnchorFilterPopover}
          setSexSelected={setSexFilter}
        /> : ''
    }
  </>
}
