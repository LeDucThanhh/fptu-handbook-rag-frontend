import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import QA from "./pages/QA";
import Clubs from "./pages/Clubs";
import FAQ from "./pages/FAQ";
import Handbook from "./pages/Handbook";
import Introduction from "./pages/Handbook/Introduction";
import Admission from "./pages/Handbook/Admission";
import Tuition from "./pages/Handbook/Tuition";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/qa" element={<QA />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/handbook" element={<Handbook />} />
            <Route path="/handbook/introduction" element={<Introduction />} />
            <Route path="/handbook/admission" element={<Admission />} />
            <Route path="/handbook/tuition" element={<Tuition />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
