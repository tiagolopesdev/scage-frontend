import styled from "styled-components";

interface ITextStyle {
  fontSize: number;
  isBold?: boolean;
}

export const InformationContainerStyle = styled.div`
  background-color: #4dac79;
  border-radius: 8px;
  padding: 1px 8px;
  width: 100%;
  margin: 5px 10px;
`

export const InformationStyle = styled.div`
  display: flex;
`

export const InformationGroupStyle = styled.div`
 display: flex;
 justify-content: space-around;
 width: 70%;
`

export const TextStyle = styled.p<ITextStyle>`
  font-family: Dosis;
  font-size: ${(props) => props.fontSize}pt;
  font-weight: ${(props => props.isBold ? 'bold' : 'lighter')};
  margin: 5px;
  color: #FFFFFF;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`
