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
import { IsNewDay } from '../../Utils/isNewDay';
import { IDaySendApi, IScaleMonthSendApi } from '../../@types/IScaleMonthSendApi';
import { downloadPDF } from '../../Utils/pdfGeneration';

import { ButtonGroupContainer, CardDayContainer, NotFoundContainerStyle, TextStyle } from './style';
import { SidebarContainer } from './style';
import { ScroolCustom } from '../../Styles';
import IconSuccess from "../../Assets/icon_success.svg";
import IconError from '../../Assets/icon_error.svg'
import ScaleNotFoundIcon from '../../Assets/icon_scale_notFound.svg'
import { initialStateScale } from '../../@types/InitialStateDay';
import { IsVisibleComponents } from '../../Utils/isVisibleComponents';
import { StatisticsList } from '../../Components/Statistics/statistics-list';


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
        width: '85vw',
        height: '85vh',        
        padding: '0.5rem'
      }}
    >
      {value === index && (<Box sx={{ width: '85vw', height: '85vh' }}> {children} </Box>)}
    </div>
  );
}

export const RenderScale = () => {

  const { scaleContext, setScaleContext, setScaleId } = useContext(ScaleContext);

  const objectRef = useRef<HTMLDivElement | null>(null);
  const [openModalGenerationScale, setOpenModalGenerationScale] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
            width: '75vw',
            height: '75vh',
            overflowY: 'scroll'
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

  const buttons = (onClick: () => void, style: CSSProperties, text: string) => {
    return <Button
      onClick={onClick}
      style={style}
      variant="contained"
      size='small'
      sx={{ maxHeight: '50px', width: '210px' }}
    >{text}</Button>
  }

  const visibleButtons = () => {
    return <>
      {buttons(() => { setOpenModalGenerationScale(!openModalGenerationScale) }, ButtonStyle('rgb(14, 202, 101)'), "Gerar preview da escala")}
      {IsVisibleComponents(
        buttons(() => { saveScale() }, ButtonStyle('rgb(14, 202, 101)'), "Salvar"),
        Boolean(scaleContext.days.length !== 0)
      )}
      {IsVisibleComponents(
        buttons(() => { downloadPDF(scaleContext) }, ButtonStyle('#30B2DB'), "Exportar em PDF"),
        Boolean(scaleContext.days.length !== 0)
      )}
      {IsVisibleComponents(
        buttons(() => {
          setScaleContext(initialStateScale)
          setScaleId('')
        },
          ButtonStyle('rgb(211, 47, 47)'), "Fechar escala"),
        Boolean(scaleContext.days.length !== 0)
      )}
    </>
  }

  useEffect(() => {
    if (scaleContext) existScale()
    visibleButtons()
  }, [scaleContext?.days])

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
          minWidth: '71vw',
          maxWidth: '71vw',
          width: '100%',
          flex: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          {existScale()}
          <ButtonGroupContainer>
            {visibleButtons()}
          </ButtonGroupContainer>
        </div>
        <SidebarContainer>
          <Box sx={{ borderColor: 'divider', justifyContent: 'space-between' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab style={{ fontWeight: '600', fontSize: '1rem' }} label="Colaborador" {...a11yProps(0)} />
              <Tab style={{ fontWeight: '600', fontSize: '1rem' }} label="Escalas" {...a11yProps(2)} onClick={() => { setValue(1) }} />
              <Tab style={{ fontWeight: '600', fontSize: '1rem' }} label="Estatísticas" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <UserListFloating />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ScaleListFloating />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <StatisticsList />
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
