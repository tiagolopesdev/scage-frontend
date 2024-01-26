import { Alert, Skeleton } from "@mui/material"
import { CustomMessageError } from "../Components/CustomMessageError"

export enum Element {
  SCALE = "Escalas",
  COLLABORATORS = "Colaboradores",
  STATISTICS = "Estatisticas"
}

export function manageFeedbackDisplay(
  conditionDisplaySkeleton: boolean,
  conditionDisplayElement: boolean,
  conditionFilter: string,
  typeElement: Element,
  elements: JSX.Element[]
) {
  if (conditionDisplaySkeleton) {
    return <Skeleton variant="rounded" width="100%" height='50rem' />
  } else if (conditionDisplayElement) {
    return <div id={`group-${typeElement.toString()}-single`}>
      {elements}
    </div>
  } else {
    return conditionFilter === '' ?
      <CustomMessageError message={`${typeElement} não foram possíveis serem exibidas`} /> :
      <Alert severity="info">{`${typeElement}, {conditionFilter} não encontrada!`}</Alert>
  }
}
