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
}

export default function GamesDashboard({games, selectedGame, selectGame, cancelSelectGame }: Props) {
    return (
        <Grid>
            <Grid.Column width={10}>
                <GamesList games={games} selectGame={selectGame} />
            </Grid.Column>  
            <Button.Group width={6}>
                {selectedGame && <GameDetails game={selectedGame} cancelSelectGame={cancelSelectGame}/>}
                <GameForm />
            </Button.Group>
        </Grid>
    )
}