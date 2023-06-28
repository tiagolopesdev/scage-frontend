import { scaleChannel } from "../Bases/api"


export const GenerationPreviewScale = (scale: any) => {
  return scaleChannel.post('api/Scale/generationScale', scale)
  .then((response) => response.data.data)
  .catch((error) => error)
}
