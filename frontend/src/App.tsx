import "./App.css";
import { Navbar } from "./components";
import { Home, ForexPrediction } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forex-predict" element={<ForexPrediction />} />
      </Routes>
    </Router>
  );
};

export default App;
