import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { IGame } from '../models/game'
import Navbar from './Navbar';
import GamesDashboard from '../../features/games/dashboard/GamesDashboard';
import { v4 as uuid } from 'uuid';

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

  function handleCreateOrEditGame(game: IGame)
  {
    game.id 
      ? setGames([...games.filter(g => g.id !== game.id), game])
      : setGames([...games, {...game, id: uuid()}]);

    setEditMode(false);
    setSelectedGame(game);
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
              createOrEdit={handleCreateOrEditGame} 
              />
          </Container>
    </>
  );
}

export default App;
