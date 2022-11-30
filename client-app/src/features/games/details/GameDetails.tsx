import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { IGame } from '../../../app/models/game';
import { useStore } from '../../../app/stores/store';

export default function GameDetails()
{
    const {gameStore} = useStore();
    const {selectedGame: game, loadGame, loadingInitial} = gameStore;
    const {id} = useParams<{id: string}>();

    useEffect(()=>{
        if(id)
        {
            loadGame(id);
        }
    }, [id, loadGame])

    if(loadingInitial || !game)
    {
        return <LoadingComponent />;
    }

    return(
        <Card fluid>
            <Card.Content>
            <Card.Header>{game.title}</Card.Header>
            <Card.Meta>
                <span>{game.releaseDate}</span>
            </Card.Meta>
            <Card.Description>
                {game.description}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button basic color="blue" content="Edit" />
                    <Button basic color="grey" content="Cancel" />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}