import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface Props{
    openForm: () => void;
}

export default function Navbar({openForm}: Props){
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight: '10px'}}></img>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Games'/>
                <Menu.Item>
                    <Button onClick={() => openForm()} positive content='Create Game' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}