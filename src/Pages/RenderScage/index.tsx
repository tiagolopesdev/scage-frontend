import { Button, ButtonGroup } from '@mui/material';
import { CardDay } from '../../Components/Cards/Day/index';
import { NavBar } from '../../Components/Navbar';
import { UserListFloating } from '../../Components/Users/user-list-floating';
import { ScroolCustom } from '../../Styles';
import { ButtonGroupContainer, CardDayContainer } from './style';
import { CSSProperties, useState } from 'react';
import { ModalGenerationScale } from '../../Components/ModalGenerationScale';

export const RenderScale = () => {

  const [openModalGenerationScale, setOpenModalGenerationScale] = useState(false);

  const ButtonStyle = (backgroundColorProp: string): CSSProperties => ({
    borderRadius: '12px',
    fontFamily: 'Dosis',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    backgroundColor: backgroundColorProp,
    margin: '0% 2% 0% 3%'
  })

  return (
    <>
      <NavBar />
      <div>
        <CardDayContainer>
          <ScroolCustom
            style={{
              margin: '0% 25rem 2% 2%',
              display: 'flex',
              flexWrap: 'wrap',
              right: '40%'
            }}
          >
            <CardDay />
            <CardDay />
            <CardDay />
            <CardDay />
            <CardDay />
            <CardDay />
          </ScroolCustom>
        </CardDayContainer>
        <ButtonGroupContainer>
          <ButtonGroup
            style={{ padding: '15px 0px 20px 0px', minWidth: '60%' }}
          >
            <Button
              onClick={() => { setOpenModalGenerationScale(!openModalGenerationScale) }}
              style={ButtonStyle('rgb(14, 202, 101)')}
              variant="contained"
              size='small'
              fullWidth
            >Gerar nova escala</Button>
            <Button
              style={ButtonStyle('rgb(14, 202, 101)')}
              variant="contained"
              size='small'
              fullWidth
            >Adicionar novo dia</Button>
            <Button
              style={ButtonStyle('#30B2DB')}
              variant="contained"
              size='small'
              fullWidth
            >Exportar escala em PDF</Button>
          </ButtonGroup>
        </ButtonGroupContainer>
      </div>
      <UserListFloating />
      {openModalGenerationScale ?
        <ModalGenerationScale 
          openModal={openModalGenerationScale}
          openModalState={setOpenModalGenerationScale}
        /> : ''
      }
    </>
  );
}
