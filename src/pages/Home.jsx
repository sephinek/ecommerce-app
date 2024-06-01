import Banner from '../components/ui/Banner';
import './Home.css';
import Products from './Products';
import PageTitle from '../components/ui/PageTitle';

export default function Home() {
  return (
    <>
      <Banner />
      <PageTitle text='All Products' />
      <Products />
    </>
  );
}
