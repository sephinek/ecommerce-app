import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './FilteredProducts.css';
import ProductCard from '../components/ui/ProductCard';
import PageTitle from '../components/ui/PageTitle';

export default function FilteredProducts() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const {
    state: { products },
  } = useLocation();
  const { category } = useParams();

  useEffect(() => {
    let filtered = [];
    if (products && category === 'new') {
      filtered = [...products];
    } else {
      filtered = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    setFilteredProducts(filtered);
  }, [category]);

  return (
    <div className='filtered-products'>
      <PageTitle text={`${category.toUpperCase()}`} />
      {filteredProducts.length ? (
        <ul className='products'>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      ) : (
        <p className='coming-soon'>Products are coming soon!</p>
      )}
    </div>
  );
}
