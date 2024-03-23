import { TextField } from "@mui/material"
import React from "react"

interface IInputProps {
  label: string,
  value?: string,
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  style?: React.CSSProperties | undefined
}

export const Input = (props: IInputProps) => {

  return (
    <TextField
      size="medium"
      id="standard-basic"
      variant="outlined"
      label={props.label}
      style={{ ...props.style }}
      fullWidth
      onClick={props.onClick}
      onChange={props.onChange}
      defaultValue={props.value}
    />
  )
}
