import { Search, SidebarContainer } from "./style"
import { Input } from "../Input"
import { IconButton } from "@mui/material"
import IconFilter from "../../Assets/filter_search.svg"
import { Icon } from "../Img"


export const SideBar = () => {

  return (
    <SidebarContainer>
      <Search>
        <Input
          label="Digite o nome do servo"
        />
        <IconButton>
          <Icon src={String(IconFilter)} />
        </IconButton>
      </Search>
    </SidebarContainer>
  )
}
