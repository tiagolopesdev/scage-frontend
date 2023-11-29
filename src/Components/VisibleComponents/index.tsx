
interface IVisibleComponents {
  condition: boolean,
  componentToDisplay: JSX.Element
}

export const IsVisibleComponents = ({componentToDisplay, condition }: IVisibleComponents) => {
  
  return condition ? componentToDisplay : ''
}
