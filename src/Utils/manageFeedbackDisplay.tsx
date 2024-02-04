import { Alert, Skeleton } from "@mui/material"
import { CustomMessageError } from "../Components/CustomMessageError"

export enum Element {
  SCALE = "Escalas",
  COLLABORATORS = "Colaboradores",
  STATISTICS = "Estatisticas"
}

interface IManagerFeedbackDisplay {
  showSkeleton?: boolean,
  showElement?: boolean,
  showFilter?: string,
  typeElement: Element,
  elements: React.ReactNode
}

export function manageFeedbackDisplay({
  typeElement,
  elements,
  showSkeleton,
  showElement,
  showFilter,
}: IManagerFeedbackDisplay) {
  if (showSkeleton) return <Skeleton variant="rounded" width="100%" height='50rem' />
  if (showElement) return elements  
  return showFilter === '' || showFilter === undefined ?
    <CustomMessageError message={`${typeElement} não foram possíveis serem exibidas`} /> :
    <Alert severity="info">{`${typeElement}, ${showFilter} não encontrada!`}</Alert>
}
