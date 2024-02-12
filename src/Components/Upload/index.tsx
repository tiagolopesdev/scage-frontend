
import { useDropzone } from "react-dropzone";
import { DropContainer, UploadMessage } from "./styles";
import { useCallback } from "react";


const acceptFormats = {
  'image/png': [],
  'image/jpg': [],
  'image/jpeg': [],
}

export const UploadFile = () => {

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({ accept: acceptFormats });

  const renderDragMessage = useCallback(() => {
    if (!isDragActive) {
      return <UploadMessage>Arraste imagens aqui...</UploadMessage>;
    }
    if (isDragReject) {
      return (
        <UploadMessage type="#CA0E0E">
          Tipo de arquivo não suportado
        </UploadMessage>
      );
    }
    return <UploadMessage type="#00C667">Solte as imagens aqui</UploadMessage>;
  }, [isDragActive, isDragReject]);

  return <DropContainer
    {...getRootProps()}
    isDragActive={isDragActive}
    isDragReject={isDragReject}
  >
    <input {...getInputProps()} />
    {renderDragMessage()}
  </DropContainer>
}
