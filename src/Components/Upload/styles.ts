import styled, { css } from "styled-components";


interface IUploadMessage {
  type?: string
} 

export const UploadMessage = styled.p<IUploadMessage>`
  display: flex;
  color: ${props => props.type || '#999'};
  justify-content: center;
  align-items: center;
  padding: 0px 8px;
  font-family: Dosis;
`

const dragActive = css`
  border-color: #00C667;
`
const dragReject = css`
  border-color: #CA0E0E;
`

interface IActionsDropContainer {
  isDragActive: boolean
  isDragReject: boolean
}

export const DropContainer = styled.div.attrs({ className: "dropzone" }) <IActionsDropContainer>`
  border: 1px dashed #ddd;  
  border-radius: 4px;
  cursor: pointer;
  width: 100%;

  transition: height 0.2s ease;

  ${props => props.isDragActive && dragActive}
  ${props => props.isDragReject && dragReject}
`
