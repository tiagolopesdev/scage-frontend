import { IconButton } from "@mui/material"
import { Container, ContainerHamburguer, Title } from "./style"
import { Icon } from "../Img"
import HamburguerIcon from '../../Assets/icon_hamburguer.svg'
import { SetStateAction } from "react"


interface INavBar {
  isOpenMenu: boolean
  setOpenMenu: React.Dispatch<SetStateAction<boolean>>
}

export const NavBar = ({ isOpenMenu, setOpenMenu }: INavBar) => {

  return (
    <Container>
      <Title>Pascom</Title>
      <ContainerHamburguer>
        <IconButton>
          <Icon src={String(HamburguerIcon)} style={{ width: '55%' }} onClick={() => { setOpenMenu(!isOpenMenu) }} />
        </IconButton>
      </ContainerHamburguer>
    </Container>
  )
}
