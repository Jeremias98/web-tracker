import './App.css';
import { Box, ChakraProvider, Select, Text } from '@chakra-ui/react'
import { TorrentsTable } from './components/torrentsTable';
import { getStats } from './services/trackerService';
import { useEffect, useState } from 'react';
import { Torrent } from './models/torrent';
import { BarChart } from './components/barChart';
import { TimeSpan } from './interfaces/lapse';

function App() {

  const filters: TimeSpan[] = [
    {hours: 1, description: 'Last hour'},
    {hours: 5, description: 'Last 5 hours'},
    {hours: 24, description: 'Last day'},
    {hours: 72, description: 'Last 3 days'}
  ];

  const [torrents, setTorrents] = useState<Torrent[]>([]);
  const [selectedFilter, setFilter] = useState<TimeSpan>(filters[0]);
  
  const handleFilterChange = (event: any) => setFilter(filters.find(filter => filter.hours == event.target.value) || filters[0])

  useEffect(() => {
    getStats().then(setTorrents)
  }, []);

  return (
    <ChakraProvider>
      <div className='App-main-container'>
        <div className='App-bg-solid-color'></div>
        <div className='App-cards-container'>
          <Text fontSize='2xl' fontWeight='bold'>404 Not Found - Tracker</Text>
          <div className='App-select-container'>
            <Select bg='white' placeholder='Filter' maxW='300px' float='right' mt='-30px' onChange={handleFilterChange}>
              {
                filters.map((filter) => (<option value={filter.hours}>{filter.description}</option>))
              }
            </Select>
          </div>
          <Box boxShadow='md' p='6' rounded='md' bg='white' maxWidth='70vw' margin='0 auto' position='relative' mt='5'>
            <Text fontSize='1xl' fontWeight='bold'>Stats</Text>
            <BarChart torrents={torrents} span={selectedFilter}></BarChart>
          </Box>
          <Box boxShadow='md' p='6' rounded='md' bg='white' maxWidth='70vw' margin='0 auto' position='relative' marginTop='10'>
            <Text fontSize='1xl' fontWeight='bold'>Details</Text>
            <TorrentsTable torrents={torrents}></TorrentsTable>
          </Box>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
