import React from "react";
import logo from "../../../assets/img/logo/logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "../Dashboard";
import Login from "../Login";
import List from "../List"
import Add from "../Add"
import Register from "../Register";
import { Provider } from "react-redux";
import { store } from "../../../config/redux";
import "bootstrap/dist/css/bootstrap.min.css";

import  {Navbar, Nav, NavDropdown} from 'react-bootstrap';

function App() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  var login;
  var regis;
  var list;
  var add;

  if (userData) {
    list =  <Nav.Link href="/list">List</Nav.Link>;
    add =  <Nav.Link href="/add" onClick>Add</Nav.Link>;
    
  } else {
    login =  <Nav.Link href="/login">Login</Nav.Link>;
    regis =  <Nav.Link href="/registrasi">Registrasi</Nav.Link>;
  }  


  return (
    <div>
      <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Gudang Barang Logistik</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>;
                {list}
                {add}
                {login}
                {regis}               
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>

      <Provider store={store}>
        <Router>
          <div>
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/list" exact component={List} />
              <Route path="/add" exact component={Add} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
