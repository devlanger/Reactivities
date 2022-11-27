import React from 'react';
import { Button, Grid, List } from 'semantic-ui-react';
import { IGame } from '../../../app/models/game';
import GameDetails from '../details/GameDetails';
import GameForm from '../form/GameForm';
import GamesList from './GamesList';

interface Props{
    games: IGame[];
}

export default function GamesDashboard({games}: Props) {
    return (
        <Grid>
            <Grid.Column width={10}>
                <GamesList games={games} />
            </Grid.Column>
            <Button.Group widths={6}>
                {games[0] && <GameDetails game={games[0]} />}
                <GameForm />
            </Button.Group>
        </Grid>
    )
}