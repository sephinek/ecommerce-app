import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { addOrUpdateCart, deleteFromCart, getCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useCart() {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ['cart', user],
    queryFn: () => getCart(user.uid),
    enabled: !!user,
  });

  const addOrUpdateItem = useMutation({
    mutationFn: (product) => addOrUpdateCart(user.uid, product),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', user.uid]);
    },
  });

  const deleteItem = useMutation({
    mutationFn: (productId) => deleteFromCart(user.uid, productId),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', user.uid]);
    },
  });

  return { cartQuery, addOrUpdateItem, deleteItem };
}
