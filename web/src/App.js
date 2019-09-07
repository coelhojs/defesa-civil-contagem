import Container from '@material-ui/core/Container';
import React from 'react';
import Header from "./components/header";
import Map from "./components/map";
import UserForm from "./components/userForm";
function App() {
  return (
    <div className="App">
      <Container maxWidth={false}>
        <Header></Header>
        <Map></Map>
        <UserForm></UserForm>
      </Container>
    </div>
  );
}

export default App;
