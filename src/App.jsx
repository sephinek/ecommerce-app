import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import { AuthContextProvider } from './context/AuthContext';

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
