import React, { useState } from "react";

import './App.css';
import Container from "./components/UI/Container";
import Header from './components/Header';
import Players from "./components/Players/Players";
import Tournaments from "./components/Tournaments/Tournaments";
import MatchesList from "./components/Matches/MatchesList";

import AppProvider from "./store/app-provider";

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
  if(activePage === "matches") {
    content = <MatchesList />
  }

  return (
    <AppProvider>
      <Header onSwitchPage={switchPageHandler} active={activePage} />
      <Container type="container-100" >
        {content}
      </Container>
    </AppProvider>
  );
}

export default App;