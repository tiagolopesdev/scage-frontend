
export function conditionHandling(condition: boolean, component: JSX.Element): JSX.Element | "" {
  return condition ? component : ''
}
