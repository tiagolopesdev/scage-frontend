
import { useDropzone } from "react-dropzone";
import { DropContainer, UploadMessage } from "./styles";
import { useCallback, useContext } from "react";
import { ScaleContext } from "../../Context/scale";
import { AcceptFormats } from "../../@types/Youtube/AcceptedFormats";


export const UploadFile = () => {

  const { setThumbnails } = useContext(ScaleContext)

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject
  } = useDropzone({
    accept: AcceptFormats,
    onDrop: acceptedFiles => {
      setThumbnails({
        name: acceptedFiles[0].name,
        size: acceptedFiles[0].size,
        type: acceptedFiles[0].type,
        url: URL.createObjectURL(acceptedFiles[0])
      })
    }
  });

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
    return <UploadMessage type="#00C667">Solte a imagem aqui</UploadMessage>;
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
