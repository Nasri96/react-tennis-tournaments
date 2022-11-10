import { useState } from "react";

import './App.css';
import Header from './components/UI/Header';

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
