import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Fib from "./Fib";
import OtherPage from "./OtherPage";

function App() {
  return (
    <Router>
      <div>
        <header>
          <Link to="/"> Home </Link>
          <Link to="/otherpage"> Other Page </Link>
        </header>
      </div>
      <div>
        <Route exact path="/" component={Fib} />
        <Route exact path="/otherpage" component={OtherPage} />
      </div>
    </Router>
  );
}

export default App;
