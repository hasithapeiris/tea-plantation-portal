import "./App.css";
import { Navbar } from "./components";
import {
  Home,
  ForexPrediction,
  Portal,
  ForexPortal,
  ForexForecast,
  HighGrownForecast,
  LowGrownForecast,
  MidGrownForecast,
  NationalProdForecast,
} from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/portal/forex" element={<ForexPortal />} />
        <Route path="/portal/forex/fee" element={<ForexPrediction />} />
        <Route path="/portal/forex/fee-forecast" element={<ForexForecast />} />
        <Route
          path="/portal/forex/high-grown-forecast"
          element={<HighGrownForecast />}
        />
        <Route
          path="/portal/forex/mid-grown-forecast"
          element={<MidGrownForecast />}
        />
        <Route
          path="/portal/forex/low-grown-forecast"
          element={<LowGrownForecast />}
        />
        <Route
          path="/portal/forex/national-production-forecast"
          element={<NationalProdForecast />}
        />
      </Routes>
    </Router>
  );
};

export default App;
