import { IGenerationAutomaticDays } from "../../@types/IGenerationAutomaticDays"
import { IScaleMonthSendApi } from "../../@types/IScaleMonthSendApi"
import { scaleChannel } from "../Bases/api"


export const GenerationAutomaticDays = async (props: IGenerationAutomaticDays) => {
  try {
    const response = await scaleChannel.post('/api/Scale/generationDays', props)
    return response.data.data
  } catch (error) {
    return error
  }
}

export const GetScale = (scaleId: string) => {
  return scaleChannel.get(`api/Scale/${scaleId}`)
    .then((response) => response.data.data)
    .catch((error) => error)  
}

export const GetSingleScales = (filter?: string) => {
  return scaleChannel.get('api/Scale/singleScales', { params: { filter } })
    .then((response) => response.data.data)
    .catch((error) => error)  
}

export const UpdateScaleService = async (scale: IScaleMonthSendApi) => {
  try {
    const response = await scaleChannel.put('api/Scale/updateScale', scale)
    return response.data.data
  } catch (error) {
    return error
  }
}

export const SaveScaleService = (scale: IScaleMonthSendApi) => {
  return scaleChannel.post('api/Scale/createScale', scale)
    .then((response) => response.data.data)
    .catch((error) => error)
}

export const GenerationPreviewScale = async (scale: any) => {
  try {
    const response = await scaleChannel.post('api/Scale/generationScale', scale)
    return response.data.data
  } catch (error: any) {
    throw Error(error.response.data) 
  } 
}
