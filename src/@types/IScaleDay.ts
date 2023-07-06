import { IScaleMonthPreview } from "./IScaleMonthPreview";
import { IUser } from "./IUser";

export interface IScaleDay {
  event: IScaleMonthPreview,
  peoples: IUser[],
}
