import React, { useState } from "react";
import { ReactDOM } from "react-dom";

import './App.css';
import Header from './components/Header';
import Players from "./components/Players/Players";
import Tournaments from "./components/Tournaments/Tournaments";
import Container from "./components/UI/Container";

// tournament simulation files
import { Match as MatchConstructor } from "./simulation/match";
import { Player as PlayerConstructor, players } from "./simulation/player";
import { Tournament as TournamentConstructor } from "./simulation/tournament";

function App() {
  const [activePage, setActivePage] = useState("players");

  const switchPageHandler = page => {
    setActivePage(page);
  }

  let content;
  if(activePage === "players") {
    content = <Players />
  }
  if(activePage === "tournaments") {
    content = <Tournaments />
  }

  

  return (
    <React.Fragment>
      <Header onSwitchPage={switchPageHandler} active={activePage} />
      <Container>
        {content}
      </Container>
    </React.Fragment>
    
  );
}

export default App;