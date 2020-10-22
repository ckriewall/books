import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import BookList from "./components/BookList";

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
                <BookList />
              </Route>
              <Route path="/">
                <BookList />
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
