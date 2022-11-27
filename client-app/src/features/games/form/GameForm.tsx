import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IGame } from "../../../app/models/game";

interface Props{
    game: IGame | undefined;
    closeForm: () => void;
}

export default function GameForm({game, closeForm}: Props){
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder="Title" />
                <Form.Input placeholder="Description" />
                <Form.Input placeholder="Date" />
                <Form.Input placeholder="Platforms" />
                <Form.Input placeholder="Category" />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}