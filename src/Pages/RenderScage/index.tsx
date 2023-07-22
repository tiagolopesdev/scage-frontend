import { Button, ButtonGroup } from '@mui/material';
import { CardDay } from '../../Components/Cards/Day/index';
import { NavBar } from '../../Components/Navbar';
import { UserListFloating } from '../../Components/Users/user-list-floating';
import { ScroolCustom } from '../../Styles';
import { ButtonGroupContainer, CardDayContainer, NotFoundContainerStyle, TextStyle } from './style';
import { CSSProperties, useState } from 'react';
import { ModalGenerationScale } from '../../Components/ModalGenerationScale';
import { Icon } from '../../Components/Img';
import ScaleNotFoundIcon from '../../Assets/icon_scale_notFound.svg'
import { CustomToast } from '../../Components/CustomToast';
import { Toaster } from 'react-hot-toast';
import WarningIcon from '../../Assets/icon_warning.svg'
import { IDay, IScaleMonth } from '../../@types/IScaleMonth';

export const RenderScale = () => {

  const [openModalGenerationScale, setOpenModalGenerationScale] = useState(false);
  const [scale, setScale] = useState<IScaleMonth>();


  const saveScale = async () => {
    try {

      if (!scale) return

      const filterOnlyIdUsers: IDay[] = scale.days.map((day) => {
        return {
          name: day.name,
          dateTime: day.dateTime,
          cameraOne: day.cameraOne.id,
          cameraTwo: day.cameraTwo.id,
          cutDesk: day.cutDesk.id
        }
      })

      const objectToSend: IScaleMonth = {
        name: scale.name,
        start: scale.start,
        end: scale.end,
        days: filterOnlyIdUsers
      }

    } catch (error) {

    }
  }

  const ButtonStyle = (backgroundColorProp: string): CSSProperties => ({
    borderRadius: '12px',
    fontFamily: 'Dosis',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    backgroundColor: backgroundColorProp,
    margin: '0% 1% 0% 3%'
  })

  const existScale = () => {
    return scale === undefined ?
      <NotFoundContainerStyle>
        <TextStyle size={15}>Uma escala ainda não foi selecionada para ser exibida</TextStyle>
        <Icon src={String(ScaleNotFoundIcon)} style={{ width: '400px' }} />
        <TextStyle size={18}>Acesse-a na side bar de escalas</TextStyle>
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
            scale?.days.length as number < 0 ?
              '' :
              scale?.days.map((item: IDay, index: number) => {
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
            >Gerar preview da escala</Button>
            <Button
              onClick={() => {
                scale?.days.length as number <= 0 ?
                  CustomToast({
                    duration: 2000,
                    icon: String(WarningIcon),
                    message: 'Uma escala ainda não foi selecionada'
                  }) : saveScale()
              }}
              style={ButtonStyle('rgb(14, 202, 101)')}
              variant="contained"
              size='small'
              fullWidth
            >Salvar</Button>
            <Button
              onClick={() => {
                scale?.days.length as number <= 0 ?
                  CustomToast({
                    duration: 2000,
                    icon: String(WarningIcon),
                    message: 'Uma escala ainda não foi selecionada'
                  }) : console.log('dsds')
              }}
              style={ButtonStyle('rgb(14, 202, 101)')}
              variant="contained"
              size='small'
              fullWidth
            >Adicionar novo dia</Button>
            <Button
              onClick={() => {
                scale?.days.length as number <= 0 ?
                  CustomToast({
                    duration: 2000,
                    icon: String(WarningIcon),
                    message: 'Uma escala ainda não foi selecionada'
                  }) : console.log('dsds')
              }}
              style={ButtonStyle('#30B2DB')}
              variant="contained"
              size='small'
              fullWidth
            >Exportar em PDF</Button>
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
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </>
  );
}
