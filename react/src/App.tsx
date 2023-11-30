import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Canvas } from './3Dverse';
import { InventoryReact } from './inventory';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Canvas />
        <InventoryReact />
      </header>
    </div>
  );
}

export default App;
