import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Services from './pages/Services';
import Playground from './pages/Playground';
import About from './pages/About';
import Console from './components/Console';
import Dashboard from './pages/Dashboard';
import SessionHistory from './components/SessionHistory';
import Login from './components/Login';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/about" element={<About />} />
          <Route path="/console" element={<Console />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<SessionHistory />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
