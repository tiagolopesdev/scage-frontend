import styled from "styled-components";

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
  margin-right: 25%;
`

export const ButtonGroupContainer = styled.div`
  position: absolute;
  bottom: 0px;
  background-color: #CBCBCB;
  width: 100%;
  box-shadow: 0px -6px 15px rgba(0, 0, 0, 0.3);
`;

export const CardDayContainer = styled.div`
  margin: 1% 31% 0% 0%;
  position: fixed;
  left: 0;
  height: 38rem;
  display: flex;
`
