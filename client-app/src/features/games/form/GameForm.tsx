import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Segment } from "semantic-ui-react";
import { IGame } from "../../../app/models/game";

interface Props{
    game: IGame | undefined;
    closeForm: () => void;
    createOrEdit: (game: IGame) => void;
    submitting: boolean;
}

export default function GameForm({game: selectedGame, closeForm, createOrEdit, submitting}: Props) {
    
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
        createOrEdit(game);
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
                <Form.Input placeholder="Description"  value={game.description} name='description' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder="Date"  value={game.releaseDate} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder="Platforms" value={game.platforms} name='platforms' onChange={handleInputChange} />
                <Form.Input placeholder="Category" value={game.category} name='category' onChange={handleInputChange} />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}