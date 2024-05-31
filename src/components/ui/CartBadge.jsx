import { useQuery } from '@tanstack/react-query';
import { getCart } from '../../api/firebase';
import './CartBadge.css';
import { useAuthContext } from '../../context/AuthContext';

export default function CartBadge() {
  const { user } = useAuthContext();
  const { data: products } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(user.uid),
  });

  return (
    <>
      {products && products.length > 0 && (
        <span className='cart-badge'>{products.length}</span>
      )}
    </>
  );
}
