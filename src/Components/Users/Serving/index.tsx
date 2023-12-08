import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Button, Chip, ThemeProvider } from '@mui/material';
import { EventSerf } from '../../Event';
import './style.css';
import { Icon } from '../../Img';
import IconExpand from '../../../Assets/icon_arrow.svg';
import IconUser from '../../../Assets/icon_user.svg';
import { TextBaseStyle } from '../../../Styles';
import { InclusionSerfStyle, InformationSerfContainerStyle, InformationSerfGroupStyle } from './style';
import { IUser } from '../../../@types/IUser';
import { useContext, useState } from 'react';
import { ScaleContext } from '../../../Context/scale';
import { IDay } from '../../../@types/IScaleMonth';
import { theme } from '../../../App';

interface IServing {
  users: IUser[]
}

export const Serving = ({ users }: IServing) => {

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
    return users.map((item, index) => {

      let isInsideScale: boolean = false
      let quantityInsideDays: number = 0
      let insideDays: IDay[] = []

      scaleContext.days.map((dayItem) => {
        if (dayItem.cameraOne?.id === item.id || dayItem.cameraTwo?.id === item.id || dayItem.cutDesk?.id === item.id) {
          isInsideScale = true;
          quantityInsideDays++;
          insideDays.push(dayItem);
        }
      })

      return <Accordion
        expanded={expanded === `panel${index}`}
        onChange={handleChange(`panel${index}`)}
        style={{ borderRadius: '5px', margin: '5px' }}
        key={index}
      >
        <AccordionSummary
          expandIcon={<Icon src={String(IconExpand)} />}
          aria-controls={`panel${index}bh-content`}
          id={`panel${index}bh-header`}
        >
          <InformationSerfContainerStyle>
            <Icon src={String(IconUser)} style={{ marginRight: '10px' }} />
            <InformationSerfGroupStyle>
              <TextBaseStyle fontSize={16} color='black' isBold={true}>
                {item.name}
              </TextBaseStyle>
              <TextBaseStyle fontSize={12} color='black'>
                {item.email}
              </TextBaseStyle>
            </InformationSerfGroupStyle>
          </InformationSerfContainerStyle>
          <InclusionSerfStyle>
            <Button
              size='small'
              color='success'
              variant='contained'
              sx={{ fontWeight: 'bolder', color: '#FFFFFF', fontSize: 14, borderRadius: 2 }}
              onClick={() => { serfInclusion(item) }}
            >{`Incluí-lo(a)`}</Button>
            <Chip
              size='small'
              color="success"
              variant="outlined"
              sx={{ fontWeight: 'bolder', marginTop: 1, height: 18 }}
              label={`${quantityInsideDays} dias para servir`}
            />
          </InclusionSerfStyle>
        </AccordionSummary>
        {
          isInsideScale ?
            <AccordionDetails>
              {
                insideDays.map((itemDay) => {
                  return <EventSerf
                    day={itemDay}
                    user={item}
                  />
                })
              }
            </AccordionDetails> :
            ''
        }
      </Accordion>
    })
  }

  return <>{managerAccordions()}</>
}
