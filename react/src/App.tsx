import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import { Canvas } from './3Dverse';
import { InventoryReact } from './inventory';

function App() {
  return <>
    <Router>
        <Routes>

          <Route path="/inventory" element={<InventoryReact />} />
          <Route path="*" element={<Canvas />} />

        </Routes>

    </Router>
  </>
}

export default App;
