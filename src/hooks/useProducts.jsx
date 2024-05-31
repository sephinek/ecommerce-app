import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewProduct, getAllProducts } from '../api/firebase';

export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  const addProduct = useMutation({
    mutationFn: ({ product, url }) => addNewProduct(product, url),
    onSuccess: async () => queryClient.invalidateQueries(['products']),
  });

  return { productsQuery, addProduct };
}
