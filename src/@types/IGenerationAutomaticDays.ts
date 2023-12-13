import { IAutomaticDays } from "./IAutomaticDays";


export interface IGenerationAutomaticDays {
  periodStart: string,
  periodEnd: string,
  days: IAutomaticDays[]
}