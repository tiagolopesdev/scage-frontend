import styled, { createGlobalStyle } from "styled-components";

interface ITextStyle {
  fontSize: number;
  color: string;
  margin?: number;
  isBold?: boolean;
}

export const TextBaseStyle = styled.div<ITextStyle>`
  font-family: Dosis;
  font-size: ${(props) => props.fontSize}pt;
  font-weight: ${(props => props.isBold ? 'bold' : 'lighter')};
  margin: ${(props) => props.margin ? props.margin : 0 }px;
  color: ${(props) => props.color};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

interface IScrollCustom {
  width?: number
}

export const ScroolCustom = styled.div<IScrollCustom>`
  scroll-behavior: smooth;
  overflow-y: auto;
  width: ${(props) => props.width}vw;
  height: 100%;

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(159 159 159);
    border-radius : 10px;
  }
`;

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`
