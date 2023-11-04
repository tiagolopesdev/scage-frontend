import styled from "styled-components";


export const SidebarContainer = styled.div`
  background-color: #d1d1d1;
  min-height: 90vh;
  max-height: 90vh;
  height: 100%;
  width: 100%;
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

interface ISizeText {
  size: number;
}

export const TextStyle = styled.p<ISizeText>`
  font-size: ${(props) => props.size}pt;
  font-family: Dosis; 
  color: #606060;
  font-weight: 600;
`

export const NotFoundContainerStyle = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center;
  height: 100%;
  min-height: 80vh;
  max-height: 80vh;
  width: 100%;
`

export const ButtonGroupContainer = styled.div`
  height: 100%;
  min-height: 10vh;
  max-height: 10vh;
  flex: 1;
  background-color: #CBCBCB;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  box-shadow: 0px -6px 15px rgba(0, 0, 0, 0.3);
`;

export const CardDayContainer = styled.div`
  display: flex;
  flex: 2;
  height: 100%;
  min-height: 80vh;
  max-height: 80vh;
`
