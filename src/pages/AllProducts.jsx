import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../api/firebase';
import Loading from '../components/shared/Loading';
import Error from '../components/shared/Error';
import ProductCard from '../components/ui/ProductCard';
import './AllProducts.css';

export default function AllProducts() {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  return (
    <div>
      {isLoading && <Loading />}
      {error && <Error />}
      {products && (
        <ul className='products'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      )}
    </div>
  );
}
