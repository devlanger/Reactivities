import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { IGame } from '../models/game'
import Navbar from './Navbar';
import GamesDashboard from '../../features/games/dashboard/GamesDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {gameStore} = useStore();
  
  const [games, setGames] = useState<IGame[]>([]);
  const [selectedGame, setSelectedGame] = useState<IGame | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    gameStore.loadGames();
  }, [gameStore]);

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
    setSubmitting(true);
    if(game.id)
    {
      agent.Games.update(game).then(() => {
        setGames([...games.filter(g => g.id !== game.id), game]);
        setSelectedGame(game);
        setEditMode(false);
        setSubmitting(false);
      })
    }
    else
    {
      game.id = uuid();
      agent.Games.create(game).then(() =>{
        setGames([...games, game]);
      });
      setSelectedGame(game);
      setEditMode(false);
      setSubmitting(false);
    }
  }

  function handleDeleteGame(id: string)
  {
    setSubmitting(true);
    agent.Games.delete(id).then(()=>{
      setGames([...games.filter(g => g.id !== id)]);
      setSubmitting(false);
    })
  }

  if(gameStore.loadingInitial)
  {
    return <LoadingComponent content='Loading app' />
  }

  return (
    <>
          <Navbar openForm={handleFormOpen}/>
          <Container style={{marginTop: '7em'}}>
            <GamesDashboard 
              games={gameStore.games} 
              selectedGame={selectedGame}
              selectGame={handleSelectGame}
              cancelSelectGame={handleCancelSelectGame}
              editMode={editMode}
              openForm={handleFormOpen}
              closeForm={handleFormClose}
              createOrEdit={handleCreateOrEditGame} 
              deleteGame={handleDeleteGame}
              submitting={submitting}
              />
          </Container>
    </>
  );
}

export default observer(App);
