import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function Navbar(){
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight: '10px'}}></img>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Games'/>
                <Menu.Item>
                    <Button positive content='Create Game' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}