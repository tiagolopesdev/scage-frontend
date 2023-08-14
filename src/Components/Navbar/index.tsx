import { useContext } from "react";
import { Container, ReferencyMonthNameStyle } from "./style"
import { ScaleContext } from "../../Context/scale";


export const NavBar = () => {

  const { scale } = useContext(ScaleContext);

  return (
    <Container>
      {
        scale?.name ?
          <ReferencyMonthNameStyle>
            <p style={{ color: '#FFFFFF', fontFamily: 'Dosis' }}>Escala referente à </p>
            <p style={{
              color: '#FFFFFF',
              marginLeft: '6px',
              fontWeight: 'bold',
              fontFamily: 'Dosis'
            }}>{scale?.name}</p>
          </ReferencyMonthNameStyle> : ""
      }
      {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Title>Pascom</Title>
      </div> */}
    </Container>
  )
}
