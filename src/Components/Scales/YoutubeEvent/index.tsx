import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Autocomplete, Badge, Button, Chip, TextField, TextareaAutosize } from '@mui/material';
import { EventSerf } from '../../Event';
// import './style.css';
import { Icon } from '../../Img';
import { TextBaseStyle } from '../../../Styles';
import { IUser } from '../../../@types/IUser';
import { useContext, useState } from 'react';
import { ScaleContext } from '../../../Context/scale';
import { IDay } from '../../../@types/IScaleMonth';
import { conditionHandling } from '../../../Utils/conditionHandling';

import IconExpand from '../../../Assets/icon_arrow.svg';
import IconUser from '../../../Assets/icon_user.svg';
import { InclusionSerfStyle, InformationSerfContainerStyle, InformationSerfGroupStyle } from '../../Users/Serving/style';
import { Input } from '../../Input';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AlignGroupStyle } from './style';


export enum PrivacyEnumLive {
  NotListaded = 'Não listado',
  Public = 'Público',
  Privacy = 'Privado',
}

export const PrivacyEnumLiveOptions = [
  { label: Object.values(PrivacyEnumLive)[0] },
  { label: Object.values(PrivacyEnumLive)[1] },
  { label: Object.values(PrivacyEnumLive)[2] },
]

interface IServing {
  users: IUser[],
  isStatistics?: boolean
}

export const YoutubeAccordion = ({ users, isStatistics }: IServing) => {

  const { scaleContext, fromDay, setScaleContext } = useContext(ScaleContext);

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const serfInclusion = (serf: IUser) => {

    if (fromDay.serf.id === fromDay.day.cameraOne?.id) {
      fromDay.day.cameraOne = serf
    } else if (fromDay.serf.id === fromDay.day.cameraTwo?.id) {
      fromDay.day.cameraTwo = serf
    } else if (fromDay.serf.id === fromDay.day.cutDesk?.id) {
      fromDay.day.cutDesk = serf
    }

    let scaleContextToUpdate = scaleContext.days

    const indexFromDay = scaleContextToUpdate.findIndex((item) => { return item.id === fromDay.day.id })

    scaleContextToUpdate.splice(indexFromDay, 1, fromDay.day)

    setScaleContext({
      id: scaleContext.id,
      name: scaleContext.name,
      start: scaleContext.start,
      end: scaleContext.end,
      isEnable: scaleContext.isEnable,
      days: scaleContextToUpdate
    })
  }

  const managerAccordions = () => {
    return <Accordion
      expanded={expanded === `panel${1}`}
      onChange={handleChange(`panel${1}`)}
      style={{ borderRadius: '5px', margin: '5px' }}
      key={1}
    >
      <AccordionSummary
        expandIcon={<Icon src={String(IconExpand)} />}
        aria-controls={`panelindexbh-content`}
        id={`panelindexbh-header`}
      >
        <InformationSerfContainerStyle>
          <Icon src={String(IconUser)} style={{ marginRight: '10px' }} />
          <InformationSerfGroupStyle>
            <TextBaseStyle fontSize={16} color='black' isBold={true}>
              item.name
            </TextBaseStyle>
            <TextBaseStyle fontSize={12} color='black'>
              item.email
            </TextBaseStyle>
          </InformationSerfGroupStyle>
        </InformationSerfContainerStyle>
      </AccordionSummary>
      <AccordionDetails style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div >
          <AlignGroupStyle>
          <Input
            style={{ minWidth: '40%', width: '100%', marginRight: '10px' }}
            // value={day.nameEvent ?? ''}
            label='Título'
            onChange={(event: any) => {
              // setDay({ ...day as IAutomaticDays, nameEvent: event.target.value })
            }}
          />
          <TimePicker
            label="Hora do evento"
            value={''}
            onChange={(event) => {
              // event !== null ?
              //   setDay({ ...day as IAutomaticDays, time: event as string }) :
              //   setDay({ ...day as IAutomaticDays, time: '' })
            }}
            renderInput={(params) =>
              <TextField
                style={{ width: '250px' }}
                {...params}
                error={false}
              />
            }
          />          
        </AlignGroupStyle>
        <TextField
          label='Descrição da live'
          multiline
          rows={3}
          maxRows={4}
          style={{ width: '32vw' }}
        />
        <AlignGroupStyle>
          <Autocomplete
            disablePortal
            sx={{ minWidth: 170, marginRight: '10px' }}
            id="combo-box-demo-two"
            options={PrivacyEnumLiveOptions}
            // value={{ label: day.day }}
            isOptionEqualToValue={(option, value) => value.label === option.label}
            renderInput={(params) => <TextField {...params} label="Privacidade" />}
            // onChange={(event: any) => { setDay({ ...day, day: event.target.innerText as string }) }}
          />
          <Input
              style={{ minWidth: '40%', width: '100%' }}
              // value={day.nameEvent ?? ''}
              label='Título'
              onChange={(event: any) => {
                // setDay({ ...day as IAutomaticDays, nameEvent: event.target.value })
              }}
            />
        </AlignGroupStyle>
        </div>        
      </AccordionDetails>
    </Accordion>
  }

  return <>{managerAccordions()}</>
}
