import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function GamesList(){
    
    const {gameStore} = useStore();
    const {deleteGame, gamesByDate, loading} = gameStore;

    const [target, setTarget] = useState('');

    function handleGameDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteGame(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {gamesByDate.map(game => (
                    <Item key={game.id}>
                        <Item.Content>
                            <Item.Header as='a'>{game.title}</Item.Header>
                            <Item.Meta>{game.releaseDate}</Item.Meta>
                            <Item.Description>
                                {game.description}
                                {game.platforms}
                            </Item.Description>
                            <Item.Extra>
                                <Button as={Link} to={`/games/${game.id}`} floated='right' content='View' color='blue'></Button>
                                <Button 
                                    name={game.id} 
                                    loading={loading && target === game.id} 
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
})