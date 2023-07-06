import { Button, ButtonGroup } from '@mui/material';
import { CardDay } from '../../Components/Cards/Day/index';
import { NavBar } from '../../Components/Navbar';
import { UserListFloating } from '../../Components/Users/user-list-floating';
import { ScroolCustom } from '../../Styles';
import { ButtonGroupContainer, CardDayContainer, NotFoundContainerStyle } from './style';
import { CSSProperties, useState } from 'react';
import { ModalGenerationScale } from '../../Components/ModalGenerationScale';
import { IScaleDay } from '../../@types/IScaleDay';
import { Icon } from '../../Components/Img';
import ScaleNotFoundIcon from '../../Assets/icon_scale_notFound.svg'

export const RenderScale = () => {

  const [openModalGenerationScale, setOpenModalGenerationScale] = useState(false);
  const [scale, setScale] = useState<IScaleDay[]>([]);

  const ButtonStyle = (backgroundColorProp: string): CSSProperties => ({
    borderRadius: '12px',
    fontFamily: 'Dosis',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    backgroundColor: backgroundColorProp,
    margin: '0% 2% 0% 3%'
  })

  const existScale = () => {
    return scale.length <= 0 ?
      <NotFoundContainerStyle>
        <h3 style={{ fontFamily: 'Dosis', color: '#606060' }}>
          Uma escala ainda não foi selecionada para ser exibida
        </h3>
        <Icon src={String(ScaleNotFoundIcon)} style={{ width: '400px' }} />
        <h2 style={{ fontFamily: 'Dosis', color: '#606060' }}>
          Acesse-a na side bar de escalas
        </h2>
      </NotFoundContainerStyle> :
      <CardDayContainer>
        <ScroolCustom
          style={{
            margin: '0% 25rem 2% 2%',
            display: 'flex',
            flexWrap: 'wrap',
            right: '40%',
            minWidth: '98%',
            maxHeight: '87%'
          }}
        >
          {
            scale.length < 0 ?
              '' :
              scale.map((item: IScaleDay, index: number) => {
                return <CardDay key={index} day={item} />
              })
          }
        </ScroolCustom>
      </CardDayContainer>
  }

  return (
    <>
      <NavBar />
      <div>
        {existScale()}
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
          setScalePreview={setScale}
        /> : ''
      }
    </>
  );
}
