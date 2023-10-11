import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';
import { EventSerf } from '../../Event';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '35%', flexShrink: 0 }}>
            Nome usuário
          </Typography>
          <Chip size='small' label={<strong>2 dias para servir</strong>} color="success" variant="outlined" />
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
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '35%', flexShrink: 0 }}>
            Nome usuário
          </Typography>
          <Chip size='small' label={<strong>2 dias para servir</strong>} color="success" variant="outlined" />
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
