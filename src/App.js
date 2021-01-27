import { Container } from "@material-ui/core";
import React, { Fragment } from "react";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Container maxWidth="md">
        <Home />
      </Container>
    </Fragment>
  );
}

export default App;
