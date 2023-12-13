import { FormControlLabel, Popover, Radio, RadioGroup } from "@mui/material";
import { TextFieldContainer } from "./style";
import { Sex } from "../../../@types/Sex";
import { useState } from "react";
import { ActionButtons } from "../../ActionButtons";

interface IFilterUserProps {
  id: string | undefined,
  open: boolean,
  anchorEl: HTMLButtonElement | null,
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
  setSexSelected: React.Dispatch<React.SetStateAction<string>>
}

export const FilterUser = (props: IFilterUserProps) => {

  const { id, anchorEl, open, setAnchorEl, setSexSelected } = props

  const [sexMasc, setSexMasc] = useState(false);
  const [sexFem, setSexFem] = useState(false);

  const applyingFilter = () => {

    const sexSelected: string = sexMasc ? Sex.MASCULINO.toString() : Sex.FEMININO.toString()

    setSexSelected(sexSelected)
  }

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={() => { setAnchorEl(null) }}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
    >
      <div style={{ minWidth: '17rem' }}>
        <TextFieldContainer>
          <RadioGroup
            style={{
              marginTop: '10px',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <FormControlLabel
              label={Sex.MASCULINO.toString()}
              control={
                <Radio
                  checked={sexMasc}
                  onClick={() => {
                    setSexMasc(!sexMasc)
                    setSexFem(false)
                  }}
                />
              }
            />
            <FormControlLabel
              label={Sex.FEMININO.toString()}
              control={
                <Radio
                  checked={sexFem}
                  onClick={() => {
                    setSexFem(!sexFem)
                    setSexMasc(false)
                  }}
                />
              }
            />
          </RadioGroup>
        </TextFieldContainer>
        <div style={{ margin: '20px' }}>
          <ActionButtons
            nameLeft="Cancelar"
            nameRight="Aplicar"
            actionLeft={() => { setAnchorEl(null) }}
            actionRight={() => { applyingFilter() }}
          />
        </div>
      </div>
    </Popover>
  );
}
