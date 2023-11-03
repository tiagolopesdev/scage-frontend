import { IDay } from "../@types/IScaleMonth";
import { IUser } from "../@types/IUser";
import { initialStateUser } from "../@types/InitialStateDay";
import { ObjectIsEquals } from "./objectIsEquals";

export function IsNewDay(day: IDay) {
  return ObjectIsEquals(day.cameraOne as IUser, initialStateUser) &&
    ObjectIsEquals(day.cameraTwo as IUser, initialStateUser) &&
    ObjectIsEquals(day.cutDesk as IUser, initialStateUser) ?
    true : false
}
