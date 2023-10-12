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

export const Serving = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div style={{ width: '100%' }}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<Icon src={String(IconExpand)} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div style={{ display: 'flex' }}>
            <Icon src={String(IconUser)} style={{ marginRight: '10px' }}/>
            <InformationSerfGroupStyle>
              <TextBaseStyle fontSize={15} color='black' isBold={true}>
                Nome usuário
              </TextBaseStyle>
              <TextBaseStyle fontSize={11} color='black'>
                usuario@gmail.com
              </TextBaseStyle>              
            </InformationSerfGroupStyle>
          </div>
          {
            2 > 0 ?
              <Chip size='small' label={<strong>2 dias para servir</strong>} color="success" variant="outlined" /> :
              <Button color='success' size='small' variant='contained'>Inseri-lo na escala</Button>
          }
        </AccordionSummary>
        <AccordionDetails>
          <EventSerf />
          <EventSerf />
          <EventSerf />
          <EventSerf />
          <EventSerf />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<Icon src={String(IconExpand)} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div style={{ display: 'flex' }}>
            <Icon src={String(IconUser)} style={{ marginRight: '10px' }}/>
            <InformationSerfGroupStyle>
              <TextBaseStyle fontSize={15} color='black' isBold={true}>
                Nome usuário
              </TextBaseStyle>
              <TextBaseStyle fontSize={11} color='black'>
                usuario@gmail.com
              </TextBaseStyle>              
            </InformationSerfGroupStyle>
          </div>
          {
            2 < 0 ?
              <Chip size='small' label={<strong>2 dias para servir</strong>} color="success" variant="outlined" /> :
              <Button color='success' size='small' variant='contained'>Inseri-lo na escala</Button>
          }
        </AccordionSummary>
        <AccordionDetails>
          <EventSerf />
          <EventSerf />
          <EventSerf />
          <EventSerf />
          <EventSerf />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
