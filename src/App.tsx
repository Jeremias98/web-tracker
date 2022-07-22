import './App.css';
import { ChakraProvider, Container } from '@chakra-ui/react'
import { TorrentsTable } from './components/torrentsTable';
import { getStats } from './services/trackerService';
import { useEffect, useState } from 'react';
import { Torrent } from './models/torrent';

function App() {

  const [torrents, setTorrents] = useState<Torrent[]>([]);

  useEffect(() => {
    getStats().then(res => setTorrents(res))
  });
  
  return (
    <ChakraProvider>
        <Container maxW='60vw'>
          <TorrentsTable torrents={torrents}></TorrentsTable>
        </Container>        
    </ChakraProvider>
  );
}

export default App;
