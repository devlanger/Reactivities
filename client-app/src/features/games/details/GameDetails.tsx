import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { IGame } from '../../../app/models/game';

interface Props{
    game: IGame;
    cancelSelectGame: () => void;
}

export default function GameDetails({game, cancelSelectGame}: Props)
{
    return(
        <Card fluid>
            <Card.Content>
            <Card.Header>Matthew</Card.Header>
            <Card.Meta>
                <span className='date'>{game.releaseDate}</span>
            </Card.Meta>
            <Card.Description>
                {game.description}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button basic color="blue" content="Edit" />
                    <Button onClick={() => cancelSelectGame()} basic color="grey" content="Cancel" />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}