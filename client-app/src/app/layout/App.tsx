import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, List, Container } from 'semantic-ui-react';
import { IGame } from '../models/game'
import Navbar from './Navbar';
import GamesDashboard from '../../features/games/dashboard/GamesDashboard';

function App() {
  const [games, setGames] = useState<IGame[]>([]);
  const [selectedGame, setSelectedGame] = useState<IGame | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<IGame[]>('http://localhost:5000/api/games').then(response => {
      console.log(response);
      setGames(response.data);
    })
  }, []);

  function handleSelectGame(id: string)
  {
    setSelectedGame(games.find(g => g.id == id));
  }

  function handleCancelSelectGame()
  {
    setSelectedGame(undefined);
  }

  function handleFormOpen(id?: string)
  {
    id ? handleSelectGame(id) : handleCancelSelectGame();
    setEditMode(true);
  }

  function handleFormClose()
  {
    setEditMode(false);
  }

  return (
    <>
          <Navbar openForm={handleFormOpen}/>
          <Container style={{marginTop: '7em'}}>
            <GamesDashboard 
              games={games} 
              selectedGame={selectedGame}
              selectGame={handleSelectGame}
              cancelSelectGame={handleCancelSelectGame}
              editMode={editMode}
              openForm={handleFormOpen}
              closeForm={handleFormClose} 
              />
          </Container>
    </>
  );
}

export default App;
