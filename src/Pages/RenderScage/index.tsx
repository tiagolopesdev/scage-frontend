import { Box, Button, ButtonGroup, Tab, Tabs } from '@mui/material';
import { CardDay } from '../../Components/Cards/Day/index';
import { NavBar } from '../../Components/Navbar';
import { UserListFloating } from '../../Components/Users/user-list-floating';
import { CSSProperties, RefObject, useContext, useEffect, useRef, useState } from 'react';
import { ModalGenerationScale } from '../../Components/ModalGenerationScale';
import { Icon } from '../../Components/Img';
import { CustomToast } from '../../Components/CustomToast';
import { Toaster } from 'react-hot-toast';
import { IDay, IScaleMonth } from '../../@types/IScaleMonth';
import { ScaleListFloating } from '../../Components/Scales/scale-list-floating';
import { ScaleContext } from '../../Context/scale';
import { SaveScaleService, UpdateScaleService } from '../../Services/Scale';

import { ButtonGroupContainer, CardDayContainer, NotFoundContainerStyle, TextStyle } from './style';
import { SidebarContainer } from './style';
import { ScroolCustom } from '../../Styles';
import IconSuccess from "../../Assets/icon_success.svg";
import IconError from '../../Assets/icon_error.svg'
import WarningIcon from '../../Assets/icon_warning.svg'
import ScaleNotFoundIcon from '../../Assets/icon_scale_notFound.svg'
import { IDaySendApi, IScaleMonthSendApi } from '../../@types/IScaleMonthSendApi';
import html2canvas from 'html2canvas';
import computedStyleToInlineStyle from 'computed-style-to-inline-style';


function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export const RenderScale = () => {

  const { scaleContext } = useContext(ScaleContext);

  const [openModalGenerationScale, setOpenModalGenerationScale] = useState(false);
  const [scale, setScale] = useState<IScaleMonth>();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handlerDownload = async () => {
    if (document.getElementsByTagName('containersCards')) {
      setTimeout(() => {
        html2canvas(document.getElementById('containersCards') as HTMLElement, {
          onclone: function (document) {
            computedStyleToInlineStyle(document.getElementById('containersCards') as HTMLElement, {
              recursive: true,
              properties: ['font-size', 'text-decoration']
            })
          }
        }).then(function (canvas) {
          const a = document.createElement("a");
          a.href = canvas.toDataURL("image/png");
          a.download = `testDownload.png`;
          a.style.display = "none";
          document.body.appendChild(a);

          a.click();

          document.body.removeChild(a);
        });
      }, 800)
    }
  }

  console.log('Scale update 1', scaleContext)
  console.log('Scale update 2', scaleContext.days)

  useEffect(() => {
    console.log('inside useEffect')
    if (!scaleContext) return
    setScale(scaleContext)
    existScale()
  }, [scaleContext?.days, scaleContext])

  const saveScale = async () => {
    try {

      if (!scale) return

      const filterOnlyIdUsers: IDaySendApi[] = scale.days.map((day) => {
        return {
          id: day.id,
          name: day.name,
          dateTime: day.dateTime,
          cameraOne: day.cameraOne?.id,
          cameraTwo: day.cameraTwo?.id,
          cutDesk: day.cutDesk?.id,
          isEnable: day.isEnable
        }
      })

      const objectToSend: IScaleMonthSendApi = {
        id: scale.id,
        name: scale.name,
        start: scale.start,
        end: scale.end,
        days: filterOnlyIdUsers,
        isEnable: true
      }

      objectToSend.id !== undefined ?
        await UpdateScaleService(objectToSend) :
        await SaveScaleService(objectToSend)

      CustomToast({ duration: 2000, message: 'Escala salva com sucesso', icon: String(IconSuccess) })

    } catch (error) {
      CustomToast({ duration: 2000, message: 'Não foi possível salvar a escala', icon: String(IconError) })
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
    return scaleContext.days.length === 0 ?
      <NotFoundContainerStyle>
        <TextStyle size={15}>Uma escala ainda não foi selecionada para ser exibida</TextStyle>
        <Icon src={String(ScaleNotFoundIcon)} style={{ width: '400px' }} />
        <TextStyle size={18}>Acesse-a na side bar de escalas</TextStyle>
      </NotFoundContainerStyle> :
      <CardDayContainer id='containersCards'>
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
            scaleContext?.days.length === 0 ?
              '' :
              scaleContext?.days.map((item: IDay, index: number) => {
                if (item.isEnable) {
                  return <CardDay key={index} day={item} />
                }
              })
          }
        </ScroolCustom>
      </CardDayContainer>
  }

  const messageError = (functionProp: any) => {
    return !scale?.days || scale?.days.length as number <= 0 ?
      CustomToast({
        duration: 2000,
        icon: String(WarningIcon),
        message: 'Uma escala ainda não foi selecionada'
      }) : functionProp
  }

  const buttons = (onClick: () => void, style: CSSProperties, text: string) => {
    return <Button
      onClick={onClick}
      style={style}
      variant="contained"
      size='small'
      fullWidth
    >{text}</Button>
  }

  return (
    <>
      <NavBar />
      <div>
        {existScale()}
        <ButtonGroupContainer>
          <ButtonGroup style={{ padding: '15px 0px 20px 0px', minWidth: '60%' }} >
            {buttons(() => { setOpenModalGenerationScale(!openModalGenerationScale) }, ButtonStyle('rgb(14, 202, 101)'), "Gerar preview da escala")}
            {buttons(() => { messageError(saveScale()) }, ButtonStyle('rgb(14, 202, 101)'), "Salvar")}
            {buttons(() => { messageError('') }, ButtonStyle('rgb(14, 202, 101)'), "Adicionar novo dia")}
            {buttons(() => { handlerDownload() }, ButtonStyle('#30B2DB'), "Exportar em PDF")}
          </ButtonGroup>
        </ButtonGroupContainer>
      </div>
      <SidebarContainer>
        <Box sx={{ borderColor: 'divider', justifyContent: 'space-between' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Servos" {...a11yProps(0)} />
            <Tab label="Escalas" {...a11yProps(2)} onClick={() => { setValue(1) }} />
            <Tab label="Estatísticas" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <UserListFloating />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ScaleListFloating />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </SidebarContainer>
      {openModalGenerationScale ?
        <ModalGenerationScale
          openModal={openModalGenerationScale}
          openModalState={setOpenModalGenerationScale}
          setScalePreview={setScale}
        /> : ''
      }
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}
