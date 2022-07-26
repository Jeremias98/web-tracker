import './App.css';
import { Box, ChakraProvider, Select, Text } from '@chakra-ui/react'
import { TorrentsTable } from './components/torrentsTable';
import { getStats } from './services/trackerService';
import { useEffect, useState } from 'react';
import { Torrent } from './models/torrent';
import { BarChart } from './components/barChart';

function App() {

  const [torrents, setTorrents] = useState<Torrent[]>([]);

  useEffect(() => {
    getStats().then(res => setTorrents(res))
  });

  return (
    <ChakraProvider>
      <div className='App-main-container'>
        <div className='App-bg-solid-color'></div>
        <div className='App-cards-container'>
          <Text fontSize='2xl' fontWeight='bold'>404 Not Found - Tracker</Text>
          <div className='App-select-container'>
            <Select bg='white' placeholder='Filter' maxW='300px' float='right' mt='-30px'>
              <option value='option1'>Last hour</option>
              <option value='option2'>Last 5 hours</option>
              <option value='option3'>Last day</option>
              <option value='option4'>Last 3 days</option>
            </Select>
          </div>
          <Box boxShadow='md' p='6' rounded='md' bg='white' maxWidth='70vw' margin='0 auto' position='relative' mt='5'>
            <Text fontSize='1xl' fontWeight='bold'>Stats</Text>
            <BarChart torrents={torrents}></BarChart>
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
