import React from 'react';
import { Button, Grid, List } from 'semantic-ui-react';
import { IGame } from '../../../app/models/game';
import GameDetails from '../details/GameDetails';
import GameForm from '../form/GameForm';
import GamesList from './GamesList';

interface Props{
    games: IGame[];
    selectedGame: IGame | undefined;
    selectGame: (id: string) => void;
    cancelSelectGame: () => void;
    openForm: (id: string) => void;
    closeForm: () => void;
    editMode: boolean;
}

export default function GamesDashboard({games, selectedGame, selectGame, cancelSelectGame, editMode, openForm, closeForm }: Props) {
    return (
        <Grid>
            <Grid.Column width={10}>
                <GamesList games={games} selectGame={selectGame} />
            </Grid.Column>  
            <Grid.Column width={6}>
                {selectedGame && !editMode &&
                <GameDetails 
                    game={selectedGame} 
                    cancelSelectGame={cancelSelectGame} 
                    openForm={openForm}
                    />}
                
                {editMode &&  
                <GameForm 
                    closeForm={closeForm} 
                    game={selectedGame} 
                    />}

            </Grid.Column>
        </Grid>
    )
}