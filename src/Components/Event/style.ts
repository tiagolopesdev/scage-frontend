import styled from "styled-components";

interface ITextStyle {
  fontSize: number;
  isBold?: boolean;
}

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
