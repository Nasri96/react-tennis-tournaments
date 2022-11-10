import { useState } from "react";

import './App.css';
import Header from './components/Header';

// tournament simulation files
import { Match as MatchConstructor } from "./simulation/match";
import { Player as PlayerConstructor, players } from "./simulation/player";
import { Tournament as TournamentConstructor } from "./simulation/tournament";


function App() {
  const [activePage, setActivePage] = useState("players");

  const switchPageHandler = page => {
    setActivePage(page);
  }

  return (
    <Header onSwitchPage={switchPageHandler} active={activePage} />
  );
}

export default App;