import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MentorLayout from "./components/MentorLayout";
import Home from "./pages/Home";
import QA from "./pages/QA";
import Clubs from "./pages/Clubs";
import FAQ from "./pages/FAQ";
import Handbook from "./pages/Handbook";
import Introduction from "./pages/Handbook/Introduction";
import Admission from "./pages/Handbook/Admission";
import Tuition from "./pages/Handbook/Tuition";
import Analytics from "./pages/Mentor/Analytics";
import ResourceRecommendation from "./pages/Mentor/ResourceRecommendation";
import UnresolvedQueue from "./pages/Mentor/UnresolvedQueue";

function App() {
  return (
    <Router>
      <Routes>
        {/* Student Routes with Navbar and Footer */}
        <Route path="/home" element={
          <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Home />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/qa" element={
          <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <QA />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/clubs" element={
          <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Clubs />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/faq" element={
          <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <FAQ />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/handbook" element={
          <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Handbook />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/handbook/introduction" element={
          <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Introduction />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/handbook/admission" element={
          <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Admission />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/handbook/tuition" element={
          <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Tuition />
            </main>
            <Footer />
          </div>
        } />

        {/* Mentor Routes with Sidebar Layout */}
        <Route path="/mentor" element={<MentorLayout />}>
          <Route index element={<Navigate to="/mentor/analytics" replace />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="recommendations" element={<ResourceRecommendation />} />
          <Route path="queue" element={<UnresolvedQueue />} />
        </Route>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
