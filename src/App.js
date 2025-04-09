import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Builder from './pages/Builder';
import DomainSearch from './pages/DomainSearch';
import Deploy from './pages/Deploy';
import { WalletProvider } from './context/WalletContext';

function App() {
  return (
    <WalletProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Builder />} />
          <Route path="/domains" element={<DomainSearch />} />
          <Route path="/deploy" element={<Deploy />} />
        </Routes>
      </Router>
    </WalletProvider>
  );
}

export default App;