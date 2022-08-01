import React from "react";
import Login from "./components/Pages/Login";
import { Route } from "react-router-dom";
import Welcome from './components/Pages/Welcome';
function App() {
  return (
    <div>
      <Route path='/' exact><Login /></Route>
      <Route path='/Welcome'>
        <Welcome />
      </Route>
    </div>
  );
}

export default App;
