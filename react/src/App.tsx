import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Canvas } from './3Dverse';
import { InventoryReact } from './inventory';

function App() {
  return <>
    <Router>
        <Routes>

          <Route path="/" element={<Canvas />} />
          <Route path="/inventory" element={<InventoryReact />} />

        </Routes>

    </Router>
  </>
}

export default App;
