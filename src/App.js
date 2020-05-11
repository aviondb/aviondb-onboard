import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import Store from "./redux/store";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import Footer from "./components/Footer";

function App() {
  return (
    <center>
      <Provider store={Store}>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/todolist">
              <TodoList />
            </Route>
            <Route path="">
              <Login />
            </Route>
          </Switch>
        </Router>
        <div style={{ position: "absolute", bottom: "30px", width: "100%" }}>
          <Footer />
        </div>
      </Provider>
    </center>
  );
}

export default App;
