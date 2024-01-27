import { useContext, useEffect, useState } from "react";
import { Serving } from "../Users/Serving";
import { managementFindUsers } from "../../Handlers/users";
import { IUser } from "../../@types/IUser";
import { ScroolCustom } from "../../Styles";
import { Chip, IconButton } from "@mui/material";
import { Input } from "../Input";
import { BadgeSizeFixedStyle, ContainerFiltersStyle, SearchStyle } from "./style";
import { FilterUser } from "../Users/Popover/filter-user";
import { Icon } from "../Img";
import { ScaleContext } from "../../Context/scale";
import { conditionHandling } from "../../Utils/conditionHandling";
import { manageFeedbackDisplay, Element } from "../../Utils/manageFeedbackDisplay";

import IconFilter from "../../Assets/filter_search.svg"


export const StatisticsList = () => {

  const { scaleContext } = useContext(ScaleContext);

  const [isLoading, setIsLoading] = useState(false)
  const [nameFilter, setNameFilter] = useState('')
  const [sexFilter, setSexFilter] = useState('')
  const [users, setUsers] = useState<IUser[]>([])

  const [anchorFilterPopover, setAnchorFilterPopover] = useState<HTMLButtonElement | null>(null);
  const openFilterPopover = Boolean(anchorFilterPopover);
  const idFilter = openFilterPopover ? 'simple-popover-filter' : undefined;

  const usersFounded = async () => {
    try {
      setIsLoading(!isLoading)
      const result = await managementFindUsers({ name: nameFilter, sex: sexFilter })
      setUsers(result)
      setIsLoading(!isLoading)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorFilterPopover(event.currentTarget);
  };

  useEffect(() => {
    usersFounded()
  }, [nameFilter, sexFilter])

  const managerDisplayStatistics = manageFeedbackDisplay({
    elements: <Serving users={users} isStatistics={true} />,
    typeElement: Element.STATISTICS,
    showSkeleton: isLoading,
    showElement: !isLoading && users.length > 0,
    showFilter: nameFilter
  })

  return <div style={{ width: '25vw' }}>
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
        {conditionHandling(sexFilter !== '', <Chip
          size="small"
          label={sexFilter}
          sx={{ marginTop: '8px', fontWeight: 600 }}
          onDelete={() => { setSexFilter('') }} />
        )}
      </BadgeSizeFixedStyle>
    </ContainerFiltersStyle>
    <ScroolCustom style={scaleContext.days.length !== 0 ? { width: '25vw', height: '60vh' } : undefined}>
      {managerDisplayStatistics}
    </ScroolCustom>
    {conditionHandling(openFilterPopover, <FilterUser
      id={idFilter}
      anchorEl={anchorFilterPopover}
      open={openFilterPopover}
      setAnchorEl={setAnchorFilterPopover}
      setSexSelected={setSexFilter} />
    )}
  </div>
}
