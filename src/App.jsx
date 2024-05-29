import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import { AuthContextProvider } from './context/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <section className='container'>
          <Header />
          <Outlet />
          <Footer />
        </section>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
