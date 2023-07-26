import { IScaleMonth } from "../../@types/IScaleMonth"
import { scaleChannel } from "../Bases/api"


export const SaveScaleService = (scale: IScaleMonth) => {
  return scaleChannel.post('api/Scale/createScale', scale)
    .then((response) => response.data.data)
    .catch((error) => error)
}

export const GenerationPreviewScale = (scale: any) => {
  return scaleChannel.post('api/Scale/generationScale', scale)
    .then((response) => response.data.data)
    .catch((error) => error)
}
