import "./App.css";

import { Routes, Route, Link } from "react-router-dom";
import Fib from "./Fib";
import OtherPage from "./OtherPage";

function App() {
  return (
    <>
      <div>
        <header>
          <Link to="/"> Home </Link> ||{" "}
          <Link to="/otherpage"> Other Page </Link>
        </header>
      </div>
      <div>
        <Routes>
          <Route exact path="/" element={<Fib />} />
          <Route exact path="/otherpage" element={<OtherPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
