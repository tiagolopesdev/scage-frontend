import { Box, Button, Tab, Tabs } from '@mui/material';
import { CardDay } from '../../Components/Cards/Day/index';
import { NavBar } from '../../Components/Navbar';
import { UserListFloating } from '../../Components/Users/user-list-floating';
import { CSSProperties, useContext, useEffect, useRef, useState } from 'react';
import { ModalGenerationScale } from '../../Components/ModalGenerationScale';
import { Icon } from '../../Components/Img';
import { CustomToast } from '../../Components/CustomToast';
import { Toaster } from 'react-hot-toast';
import { IDay } from '../../@types/IScaleMonth';
import { ScaleListFloating } from '../../Components/Scales/scale-list-floating';
import { ScaleContext } from '../../Context/scale';
import { GetScale, SaveScaleService, UpdateScaleService } from '../../Services/Scale';

import { ButtonGroupContainer, CardDayContainer, NotFoundContainerStyle, TextStyle } from './style';
import { SidebarContainer } from './style';
import { ScroolCustom } from '../../Styles';
import IconSuccess from "../../Assets/icon_success.svg";
import IconError from '../../Assets/icon_error.svg'
import WarningIcon from '../../Assets/icon_warning.svg'
import ScaleNotFoundIcon from '../../Assets/icon_scale_notFound.svg'
import { IDaySendApi, IScaleMonthSendApi } from '../../@types/IScaleMonthSendApi';
import html2canvas from 'html2canvas';
import { IsNewDay } from '../../Handlers/isNewDay';


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
      style={{
        width: '100%',
        height: '100%',
        padding: '0.5rem'
      }}
    >
      {value === index && (<Box sx={{ width: '100%', height: '100%' }}> {children} </Box>)}
    </div>
  );
}

export const RenderScale = () => {

  const { scaleContext, setScaleContext } = useContext(ScaleContext);

  const objectRef = useRef<HTMLDivElement | null>(null);
  const [openModalGenerationScale, setOpenModalGenerationScale] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handlerDownload = async () => {

    if (objectRef.current === null) return

    html2canvas(objectRef.current, {
      backgroundColor: "#FFF",
      allowTaint: true,
      useCORS: true
    }).then(function (canvas) {
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `testDownload.png`;
      a.style.display = "none";
      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);
    })
  }

  useEffect(() => {
    if (scaleContext) existScale()
  }, [scaleContext?.days])

  const saveScale = async () => {
    try {

      if (!scaleContext) return

      const filterOnlyIdUsers: IDaySendApi[] = scaleContext.days.map((day) => {
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
        id: scaleContext.id,
        name: scaleContext.name,
        start: scaleContext.start,
        end: scaleContext.end,
        transmissions: scaleContext.days.length,
        days: filterOnlyIdUsers,        
        isEnable: true
      }

      const responseApi: string = objectToSend.id !== undefined && objectToSend.id !== "" ?
        await UpdateScaleService(objectToSend) :
        await SaveScaleService(objectToSend)

      const scaleAfterChange = await GetScale(responseApi)

      setScaleContext(scaleAfterChange)

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
      <CardDayContainer ref={objectRef}>
        <ScroolCustom
          style={{
            margin: '1rem',
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            height: '100%'
          }}
        >
          {
            scaleContext?.days.length === 0 ?
              '' :
              scaleContext?.days.map((item: IDay, index: number) => {
                if (item.isEnable && !IsNewDay(item)) {
                  return <CardDay key={index} day={item} />
                }
              })
          }
        </ScroolCustom>
      </CardDayContainer>
  }

  const messageError = (functionProp: any) => {
    return !scaleContext?.days || scaleContext?.days.length as number <= 0 ?
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
      sx={{ maxHeight: '50px', width: '210px' }}
    >{text}</Button>
  }

  return (
    <div style={{ overflow: 'hidden' }}>
      <NavBar />
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'stretch',
        maxHeight: '90vh',
        minHeight: '90vh',
        height: '100%',
        width: '100vw'
      }}>
        <div style={{
          minWidth: '75vw',
          maxWidth: '75vw',
          width: '100%',
          flex: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          {existScale()}
          <ButtonGroupContainer>
            {buttons(() => { setOpenModalGenerationScale(!openModalGenerationScale) }, ButtonStyle('rgb(14, 202, 101)'), "Gerar preview da escala")}
            {buttons(() => { saveScale() }, ButtonStyle('rgb(14, 202, 101)'), "Salvar")}
            {buttons(() => { messageError('') }, ButtonStyle('rgb(14, 202, 101)'), "Adicionar novo dia")}
            {buttons(() => { handlerDownload() }, ButtonStyle('#30B2DB'), "Exportar em PDF")}
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
      </div>
      {openModalGenerationScale ?
        <ModalGenerationScale
          openModal={openModalGenerationScale}
          openModalState={setOpenModalGenerationScale}
          setScalePreview={setScaleContext}
        /> : ''
      }
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}
