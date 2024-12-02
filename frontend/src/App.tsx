import "./App.css";
import { Navbar } from "./components";
import { Home, ForexPrediction, Portal, ForexPortal } from "./pages";
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
      </Routes>
    </Router>
  );
};

export default App;
