import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import ContactBar from "./components/ContactBar";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import ServicePage from "./pages/ServicePage";

import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="app">
        <Nav />
        <main className="page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServicePage />} /> 
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <ContactBar />
      </div>
    </Router>
  );
}


