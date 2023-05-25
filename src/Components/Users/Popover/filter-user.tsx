import { Button, FormControlLabel, Popover, Radio, RadioGroup } from "@mui/material";
import { ButtonContainer, TextFieldContainer } from "./style";
import { Sex } from "../../../@types/Sex";
import { useState } from "react";

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

  const StyleButtonCustom = (styleCustom?: any) => ({
    borderRadius: '15px',
    fontFamily: 'Dosis',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    padding: '0px',
    ...styleCustom
  })

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
        <ButtonContainer>
          <Button
            variant="outlined"
            size='small'
            color='error'
            onClick={() => { setAnchorEl(null) }}
            fullWidth
            style={StyleButtonCustom()}
          >Cancelar</Button>
          <Button
            style={StyleButtonCustom({
              marginLeft: '20px',
              backgroundColor: 'rgb(14, 202, 101)',
            })}
            variant="contained"
            size='small'
            onClick={() => { applyingFilter() }}
            fullWidth
          >Aplicar</Button>
        </ButtonContainer>
      </div>
    </Popover>
  );
}
