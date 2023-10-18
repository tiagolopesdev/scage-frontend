import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Button, Chip } from '@mui/material';
import { EventSerf } from '../../Event';
import './style.css';
import { Icon } from '../../Img';
import IconExpand from '../../../Assets/icon_arrow.svg';
import IconUser from '../../../Assets/icon_user.svg';
import { TextBaseStyle } from '../../../Styles';
import { InformationSerfGroupStyle } from './style';
import { getAllUsersService } from '../../../Services/Users';
import { IUser } from '../../../@types/IUser';
import { useContext, useEffect, useState } from 'react';
import { ScaleContext } from '../../../Context/scale';
import { IDay } from '../../../@types/IScaleMonth';

export const Serving = () => {

  const { scaleContext } = useContext(ScaleContext);

  const [expanded, setExpanded] = useState<string | false>(false);
  const [users, setUsers] = useState<IUser[]>([]);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const findUsers = async () => {
    try {

      const users: IUser[] = await getAllUsersService();

      setUsers(users)

    } catch (error) {
    }
  }

  useEffect(() => {
    findUsers()
  }, [])

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
      >
        <AccordionSummary
          expandIcon={<Icon src={String(IconExpand)} />}
          aria-controls={`panel${index}bh-content`}
          id={`panel${index}bh-header`}
        >
          <div style={{ display: 'flex' }}>
            <Icon src={String(IconUser)} style={{ marginRight: '10px' }} />
            <InformationSerfGroupStyle>
              <TextBaseStyle fontSize={15} color='black' isBold={true}>
                {item.name}
              </TextBaseStyle>
              <TextBaseStyle fontSize={11} color='black'>
                {item.email}
              </TextBaseStyle>
            </InformationSerfGroupStyle>
          </div>
          {
            isInsideScale ?
              <Chip size='small' label={`${quantityInsideDays} dias para servir`} color="success" variant="outlined" /> :
              <Button color='success' size='small' variant='contained'>Inseri-lo na escala</Button>
          }
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
