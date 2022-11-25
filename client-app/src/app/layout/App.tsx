import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, List, Container } from 'semantic-ui-react';
import { IGame } from '../models/game'
import Navbar from './Navbar';
import GamesDashboard from '../../features/games/dashboard/GamesDashboard';

function App() {
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    axios.get<IGame[]>('http://localhost:5000/api/games').then(response => {
      console.log(response);
      setGames(response.data);
    })
  }, []);

  return (
    <>
          <Navbar />
          <Container style={{marginTop: '7em'}}>
            <GamesDashboard games={games} />
          </Container>
    </>
  );
}

export default App;
