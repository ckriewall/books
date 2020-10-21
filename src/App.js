import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Books from "./components/Books";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container fluid>
        <Row>
          <Col>
            <Switch>
              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
              <Route path="/books">
                <Books />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
