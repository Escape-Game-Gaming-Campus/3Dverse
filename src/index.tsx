import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { ReportHandler } from 'web-vitals';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Canvas3Dverse } from './pages/3Dverse';
import { InventoryReact } from './components/inventory';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
        <Routes>

          <Route path="/inventory" element={<></>} />
          <Route path="*" element={<Canvas3Dverse />} />

        </Routes>

    </Router>
  </React.StrictMode>
);

const reportWebVitals = (onPerfEntry? : ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

reportWebVitals();