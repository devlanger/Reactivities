import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { IGame } from '../../../app/models/game';

interface Props {
    games: IGame[];
    selectGame: (id: string) => void;
    deleteGame: (id: string) => void;
    submitting: boolean;
}

export default function GamesList({games, selectGame, deleteGame, submitting}: Props){

    const [target, setTarget] = useState('');

    function handleGameDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteGame(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {games.map(game => (
                    <Item key={game.id}>
                        <Item.Content>
                            <Item.Header as='a'>{game.title}</Item.Header>
                            <Item.Meta>{game.releaseDate}</Item.Meta>
                            <Item.Description>
                                {game.description}
                                {game.platforms}
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectGame(game.id)} floated='right' content='View' color='blue'></Button>
                                <Button 
                                    name={game.id} 
                                    loading={submitting && target === game.id} 
                                    onClick={(e) => handleGameDelete(e, game.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' />
                                <Label basic content={game.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group> 
        </Segment>
    )
}