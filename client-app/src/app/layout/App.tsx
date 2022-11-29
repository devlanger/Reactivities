import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import GamesDashboard from '../../features/games/dashboard/GamesDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {gameStore} = useStore();
  
  useEffect(() => {
    gameStore.loadGames();
  }, [gameStore]);

  if(gameStore.loadingInitial)
  {
    return <LoadingComponent content='Loading app' />
  }

  return (
    <>
          <Navbar />
          <Container style={{marginTop: '7em'}}>
            <GamesDashboard />
          </Container>
    </>
  );
}

export default observer(App);
