import Navbar from './components/Header/Navbar';
import Footer from './components/Footer/Footer';
import Layout from './Layout';


function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <main className="pt-1">
        <Layout />
      </main>
      <Footer />
    </div>
  );
}

export default App;