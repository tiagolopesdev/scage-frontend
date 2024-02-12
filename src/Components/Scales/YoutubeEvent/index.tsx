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
import { PrivacyEnumLive, PrivacyEnumLiveOptions } from '../../../@types/Youtube/PrivacyEnumLive';
import { IYoutube } from '../../../@types/Youtube/IYoutube';
import dayjs from 'dayjs';
import { UploadFile } from '../../Upload';


interface ILiveStreamsAccordion {
  days: IDay[]
}

export const LiveStreamAccordion = ({ days }: ILiveStreamsAccordion) => {

  const { scaleContext, fromDay, setScaleContext } = useContext(ScaleContext);

  const [expanded, setExpanded] = useState<string | false>(false);

  const [liveStream, setLiveStream] = useState<IYoutube>({
    dateTime: '',
    descrition: '',
    title: '',
    privacy: PrivacyEnumLive.Public
  })

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const managerAccordions = () => {
    return days.map((day) => {
      return <Accordion
        expanded={expanded === `panel-${day.id}`}
        onChange={handleChange(`panel-${day.id}`)}
        style={{ borderRadius: '5px', margin: '5px' }}
        key={day.id}
      >
        <AccordionSummary
          expandIcon={<Icon src={String(IconExpand)} />}
          aria-controls={`panel-index-${day.id}-content`}
          id={`panelindexbh-${day.id}-header`}
        >
          <InformationSerfContainerStyle>
            <Icon src={String(IconUser)} style={{ marginRight: '10px' }} />
            <InformationSerfGroupStyle>
              <TextBaseStyle fontSize={16} color='black' isBold={true}>
                {day.name}
              </TextBaseStyle>
              <TextBaseStyle fontSize={12} color='black'>
                {`${dayjs(day.dateTime).format('DD/MM/YYYY')} às ${dayjs(day.dateTime).format('HH:mm')}`}
              </TextBaseStyle>
            </InformationSerfGroupStyle>
          </InformationSerfContainerStyle>
          {
            day.liveStreamId !== undefined && day.liveStreamId !== '' ?
              "" :
              <Badge
                badgeContent='Live não criada'
                color='success'
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                sx={{ width: 100, margin: '0px 10px' }}
              />
          }
        </AccordionSummary>
        <AccordionDetails style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <AlignGroupStyle>
            <Input
              style={{ minWidth: '40%', width: '100%', marginRight: '10px' }}
              value={liveStream.title ?? ''}
              label='Título'
              onChange={(event: any) => {
                setLiveStream({ ...liveStream, title: event as string })
              }}
            />
            <TimePicker
              label="Hora do evento"
              value={liveStream.dateTime}
              onChange={(event) => {
                setLiveStream({ ...liveStream, dateTime: event as string })
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
            rows={3}
            // maxRows={4}
            multiline
            style={{ width: '32vw' }}
            label='Descrição da live'
            onChange={(event: any) => {
              setLiveStream({ ...liveStream, descrition: event as string })
            }}
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
              onChange={(event: any) => {
                setLiveStream({ ...liveStream, privacy: PrivacyEnumLive[event.target.innerText as keyof typeof PrivacyEnumLive] })
              }}
            />
            <UploadFile />
          </AlignGroupStyle>
        </AccordionDetails>
      </Accordion>
    })
  }

  return <>{managerAccordions()}</>
}
