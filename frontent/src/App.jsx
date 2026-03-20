import Navbar from "./components/layout/Header/Navbar.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;