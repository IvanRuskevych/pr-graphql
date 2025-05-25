import React, { useState } from 'react';
import { AppBar, Box, Tab, Tabs, Typography } from '@mui/material';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import CameraIcon from '@mui/icons-material/Camera';

import Movies from '../Movies/Movies';
import Directors from '../Directors/Directors';

const TabPanel = ({children, value, index}) => {
  return (
    value === index && (
      <Box sx={{width: "100%"}}>
        <Typography component="div">{children}</Typography>
      </Box>
    )
  );
};

const SimpleTabs = () => {
  const [value, setValue] = useState(0);

  const handleTabChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <AppBar position="fixed" color="default">
        <Tabs
          value={value}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Movies" icon={<CameraIcon />} />
          <Tab label="Directors" icon={<MovieCreationIcon />} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}><Movies /></TabPanel>
      <TabPanel value={value} index={1}><Directors /></TabPanel>
    </Box>
  );
};

export default SimpleTabs;


