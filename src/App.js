import React, { useState } from "react";

import './App.css';
import Header from './components/Header';
import Players from "./components/Players/Players";
import Tournaments from "./components/Tournaments/Tournaments";
import Container from "./components/UI/Container";

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

  

  return (
    <AppProvider>
      <Header onSwitchPage={switchPageHandler} active={activePage} />
      <Container>
        {content}
      </Container>
    </AppProvider>
  );
}

export default App;