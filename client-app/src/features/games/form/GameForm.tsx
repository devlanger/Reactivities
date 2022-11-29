import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Segment } from "semantic-ui-react";
import { IGame } from "../../../app/models/game";
import { useStore } from '../../../app/stores/store';

export default observer(function GameForm() {
    
    const {gameStore} = useStore();
    const {selectedGame, closeForm, createGame, updateGame, loading} = gameStore;

    const initialState = selectedGame || {
        id: '',
        title: '',
        category: '',
        description: '',
        platforms: '',
        releaseDate: ''
    }

    const [game, setGame] = useState(initialState);

    function handleSubmit()
    {
        game.id ? updateGame(game) : createGame(game);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    {
        const {name, value} = event.target;
        setGame({...game, [name]: value});
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder="Title" value={game.title} name='title' onChange={handleInputChange} />
                <Form.Input placeholder="Description" value={game.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder="Date" type='date' value={game.releaseDate} name='releaseDate' onChange={handleInputChange}/>
                <Form.Input placeholder="Platforms" value={game.platforms} name='platforms' onChange={handleInputChange} />
                <Form.Input placeholder="Category" value={game.category} name='category' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})