import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';


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

interface ITabsComponent {
  nameTab: string[]
  displayComponents: JSX.Element[]
}

export const TabsComponent = ({ nameTab, displayComponents }: ITabsComponent) => {

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return <div>
    <Box sx={{ borderColor: 'divider', justifyContent: 'space-between' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        {nameTab.map((item: string, index: number) => {
          return <Tab style={{ fontWeight: '600', fontSize: '1rem' }} label={item} {...a11yProps(index)} />
        })}
      </Tabs>
    </Box>
    {displayComponents.map((item: JSX.Element, index: number) => {
      return <CustomTabPanel value={value} index={index} children={item} />
    })}
  </div>
}