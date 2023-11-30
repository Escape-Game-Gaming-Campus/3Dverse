import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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
