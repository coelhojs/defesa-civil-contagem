import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Header from "../components/header";
import UserForm from "../components/userForm";
import Map from "../components/map";

export default function Index() {
    return (
        <Container maxWidth={false}>
            <Header></Header>
            <Map></Map>
            <UserForm></UserForm>
        </Container>
    );
}
