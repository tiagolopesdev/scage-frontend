import { Button } from "@mui/material"
import { GroupButtonStyle } from "./style"


interface IActionButtons {
  nameLeft: string | JSX.Element,
  actionLeft: () => void
  nameRight: string | JSX.Element,
  actionRight: () => void
}

export const ActionButtons = (props: IActionButtons) => {

  const styleButton = (margin: any) => ({
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '10px',
    ...margin
  })

  return <GroupButtonStyle>
    <Button
      sx={styleButton({ marginRight: '10px' })}
      variant="outlined"
      size='small'
      color='error'
      fullWidth
      onClick={props.actionLeft}
    >{props.nameLeft}</Button>
    <Button
      sx={styleButton({ marginLeft: '10px' })}
      onClick={props.actionRight}
      variant="contained"
      color="success"
      size='small'
      fullWidth
    >
      {props.nameRight}
    </Button>
  </GroupButtonStyle>
}
