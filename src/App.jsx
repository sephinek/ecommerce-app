import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/shared/Footer';
import Header from './components/shared/Header';

function App() {
  return (
    <section className='container'>
      <Header />
      <main className='main'>
        <Outlet />
      </main>
      <Footer />
    </section>
  );
}

export default App;
