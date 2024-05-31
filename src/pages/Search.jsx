import { useState } from 'react';
import useProducts from '../hooks/useProducts';
import './Search.css';
import ProductCard from '../components/ui/ProductCard';

export default function Search() {
  const {
    productsQuery: { data: products },
  } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [noItemMessage, setNoItemMessage] = useState('');

  const changeHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setNoItemMessage('');

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filtered.length) {
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
      setNoItemMessage('No matched item found.');
    }
  };

  const deleteHandler = () => {
    setSearchQuery('');
  };

  return (
    <section className='search'>
      <form onSubmit={submitHandler} className='search-form'>
        <label htmlFor='search-query'></label>
        <input
          type='text'
          name='search-query'
          id='search-query'
          placeholder='Search here'
          value={searchQuery}
          onChange={changeHandler}
        />
        <button
          type='button'
          className='query-delete-btn'
          onClick={deleteHandler}
        >
          X
        </button>
      </form>
      <div className='products'>
        {filteredProducts &&
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
      <p className='no-item-found'>{noItemMessage}</p>
    </section>
  );
}
