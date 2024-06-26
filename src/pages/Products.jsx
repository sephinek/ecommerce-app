import Loading from '../components/shared/Loading';
import Error from '../components/shared/Error';
import ProductCard from '../components/ui/ProductCard';
import './Products.css';
import useProducts from '../hooks/useProducts';

export default function Products() {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

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
