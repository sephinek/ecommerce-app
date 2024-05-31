import './CartBadge.css';
import useCart from '../../hooks/useCart';

export default function CartBadge() {
  const {
    cartQuery: { data: products },
  } = useCart();

  return (
    <>
      {products && products.length > 0 && (
        <span className='cart-badge'>{products.length}</span>
      )}
    </>
  );
}
