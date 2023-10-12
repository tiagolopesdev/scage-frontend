import styled from "styled-components";

interface ITextStyle {
  fontSize: number;
  color: string
  isBold?: boolean;
}

export const TextBaseStyle = styled.div<ITextStyle>`
  font-family: Dosis;
  font-size: ${(props) => props.fontSize}pt;
  font-weight: ${(props => props.isBold ? 'bold' : 'lighter')};
  margin: 2px;
  color: ${(props) => props.color};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

export const ScroolCustom = styled.div`
  scroll-behavior: smooth;
  overflow-y: scroll;

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
