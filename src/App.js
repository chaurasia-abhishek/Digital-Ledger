import { BrowserRouter, Switch, Route } from "react-router-dom"
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/home'>
            <Home />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
        </Switch>
      </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
