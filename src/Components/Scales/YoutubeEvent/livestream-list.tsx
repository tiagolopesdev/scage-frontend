import { useContext, useEffect, useState } from 'react';
import { ScaleContext } from '../../../Context/scale';
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Badge, Button, TextField } from '@mui/material';
import { AlignGroupStyle } from './style';
import { InformationSerfContainerStyle, InformationSerfGroupStyle } from '../../Users/Serving/style';
import { Icon } from '../../Img';
import { TimePicker } from '@mui/x-date-pickers';
import { ObjectIsEquals } from '../../../Utils/objectIsEquals';
import { TextBaseStyle } from '../../../Styles';
import { FileUploaded } from '../../Upload/file-list';
import { UploadFile } from '../../Upload/file-upload';
import { IDay } from '../../../@types/IScaleMonth';
import { IYoutube } from '../../../@types/Youtube/IYoutube';
import { PrivacyEnumLive, PrivacyEnumLiveOptions } from '../../../@types/Youtube/PrivacyEnumLive';
import dayjs from 'dayjs';

import IconExpand from '../../../Assets/icon_arrow.svg';
import IconUser from '../../../Assets/icon_user.svg';


// TODO: move const below to @types folder
const InitialStateLiveStream = {
  dateTime: '',
  descrition: '',
  title: '',
  privacy: PrivacyEnumLive.Public
}

export const LiveStreamList = () => {

  const { scaleContext, setScaleContext } = useContext(ScaleContext);

  const [expanded, setExpanded] = useState<string | false>(false);
  const [liveStream, setLiveStream] = useState<IYoutube>(InitialStateLiveStream)

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const managerFileUploaded = (day: IDay) => day.thumbnails && day.thumbnails.url !== '' ?
    <FileUploaded day={day} /> :
    <UploadFile day={day} />

  const managerAccordions = () => {
    return scaleContext.days.map((day) => {
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
            <TextField
              style={{ minWidth: '40%', width: '100%', marginRight: '10px' }}
              label='Título *'
              value={liveStream.title}
              onChange={(event: any) => {
                setLiveStream({ ...liveStream, title: event.target.value as string })
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
            value={liveStream.descrition}
            onChange={(event: any) => {
              setLiveStream({ ...liveStream, descrition: event.target.value as string })
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
            {managerFileUploaded(day)}
          </AlignGroupStyle>
          <Button
            variant="contained"
            disabled={ObjectIsEquals(liveStream, InitialStateLiveStream) || liveStream.title === ''}
            size='small'
            color='success'
            fullWidth
            onClick={() => { 

              let daysInScale: IDay[] = scaleContext.days

              let positionToRemove = daysInScale.findIndex((item) => { return item === day })

              day.youtube = liveStream

              daysInScale.splice(positionToRemove, 1, day)

              setScaleContext({
                ...scaleContext, ...{
                  id: scaleContext.id,
                  name: scaleContext.name,
                  start: scaleContext.start,
                  end: scaleContext.end,
                  days: daysInScale,
                  isEnable: scaleContext.isEnable
                }
              })
            }}
          >Salvar</Button>
        </AccordionDetails>
      </Accordion>
    })
  }

  useEffect(() => { managerAccordions() }, [scaleContext.days])

  return <>{managerAccordions()}</>
}
