import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import GameDetails from '../details/GameDetails';
import GameForm from '../form/GameForm';
import GamesList from './GamesList';

export default observer (function GamesDashboard() {
    const {gameStore} = useStore();
    const {selectedGame, editMode} = gameStore; 
    
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