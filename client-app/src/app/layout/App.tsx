import React from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import GamesDashboard from '../../features/games/dashboard/GamesDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import GameForm from '../../features/games/form/GameForm';

function App() {
  return (
    <>
          <Navbar />
          <Container style={{marginTop: '7em'}}>
            <Routes>
              <Route path='/' element={<HomePage />}/>
              <Route path='/games' element={<GamesDashboard />}/>
              <Route path='/createGame' element={<GameForm/> }/>
            </Routes>
          </Container>
    </>
  );
}

export default observer(App);
