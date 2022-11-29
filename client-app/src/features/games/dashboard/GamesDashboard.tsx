import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import GameDetails from '../details/GameDetails';
import GameForm from '../form/GameForm';
import GamesList from './GamesList';

export default observer (function GamesDashboard() {
    const {gameStore} = useStore();
    const {selectedGame, editMode} = gameStore; 
  
    useEffect(() => {
      gameStore.loadGames();
    }, [gameStore]);
  
    if(gameStore.loadingInitial)
    {
      return <LoadingComponent content='Loading app' />
    }
  
    return (
        <Grid>
            <Grid.Column width={10}>
                <GamesList />
            </Grid.Column>  
            <Grid.Column width={6}>
                {selectedGame && !editMode &&
                <GameDetails />}
                
                {editMode &&  
                <GameForm />}

            </Grid.Column>
        </Grid>
    )
})