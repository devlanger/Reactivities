import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { IGame } from '../../../app/models/game';
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
        </Grid>
    )
}