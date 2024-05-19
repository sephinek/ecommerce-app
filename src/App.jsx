import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/shared/Footer';
import Header from './components/shared/Header';
import { AuthContextProvider } from './components/context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <section className='container'>
        <Header />
        <main className='main'>
          <Outlet />
        </main>
        <Footer />
      </section>
    </AuthContextProvider>
  );
}

export default App;
