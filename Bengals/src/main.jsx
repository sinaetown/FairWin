import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import StateInfo from "./StateInfo.jsx";
import Ensemble from "./Ensemble.jsx";
import EnsembleSMD from "./EnsembleSMD.jsx";
import EnsembleMMD from "./EnsembleMMD.jsx";
import Random from "./Random.jsx";
import CompareCurrent from "./CompareCurrent.jsx";
import About from "./About.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<StateInfo />} />
      <Route path="/:id/ensemble" element={<Ensemble />} />
      <Route path="/:id/ensemble/smd" element={<EnsembleSMD />} />
      <Route path="/:id/ensemble/mmd" element={<EnsembleMMD />} />
      <Route path="/:id/random/smd" element={<Random />} />
      <Route path="/:id/random/mmd" element={<Random />} />
      <Route path="/:id/compareCurrent" element={<CompareCurrent />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>
);
