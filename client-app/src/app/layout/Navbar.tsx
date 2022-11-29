import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default function Navbar(){
    const {gameStore} = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight: '10px'}}></img>
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/games' name='Games'/>
                <Menu.Item>
                    <Button as={NavLink} to='/createGame' positive content='Create Game' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}