import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import StateInfo from "./StateInfo.jsx";
import Ensemble from "./Ensemble.jsx";
import Random from "./Random.jsx";
import About from "./About.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<StateInfo />} />
      <Route path="/:id/ensemble/smd" element={<Ensemble />} />
      <Route path="/:id/ensemble/mmd" element={<Ensemble />} />
      <Route path="/:id/random/smd" element={<Random />} />
      <Route path="/:id/random/mmd" element={<Random />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>
);
