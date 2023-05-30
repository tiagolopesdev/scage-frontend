import { TextField } from "@mui/material"
import React from "react"

interface IInputProps {
  label: string,
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Input = (props: IInputProps) => {

  return (
    <TextField
      size="medium"
      id="standard-basic"
      label={props.label}
      variant="outlined"
      style={{
        marginRight: '15px',
        width: '100%'
      }}
      onClick={props.onClick}
      onChange={props.onChange}
    />
  )
}
