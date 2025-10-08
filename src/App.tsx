import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import QA from "./pages/QA";
import Clubs from "./pages/Clubs";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qa" element={<QA />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route
            path="/handbook"
            element={
              <div className="p-8 text-center">Handbook Page - Coming Soon</div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
