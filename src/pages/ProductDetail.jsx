import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import './ProductDetail.css';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import useCart from '../hooks/useCart';

export default function ProductDetail() {
  const {
    state: {
      product: { id, name, category, price, size, color, description, image },
    },
  } = useLocation();
  const { user } = useAuthContext();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { addOrUpdateItem } = useCart();

  const changeHandler = (e) => {
    setSelectedColor(e.target.value);
  };

  const sizeHandler = (e) => {
    setSelectedSize(e.target.value);
  };

  const addToCartHandler = () => {
    if (!user) {
      setError('Please sign in to use your shopping cart.');
      return;
    } else if (!selectedColor && !selectedSize) {
      setError('Please select your color and size.');
    } else if (!selectedColor) {
      setError('Please select your color.');
      return;
    } else if (!selectedSize) {
      setError('Please select your size.');
    } else {
      const addedItem = {
        id,
        name,
        category,
        price,
        size: selectedSize,
        color: selectedColor,
        image,
        quantity: 1,
      };

      addOrUpdateItem.mutate(addedItem);
      setError('');
      setSuccess('Item is successfully added!');
    }
  };

  return (
    <section className='product-detail'>
      <img className='product-img' src={image} alt={name} />
      <div className='product-info'>
        <span className='product-category'>{category}</span>
        <h1 className='product-name'>{name}</h1>
        <p className='product-price'>{price}</p>
        <label htmlFor='color-dropdown' className='label'>
          Color:
          <select
            name='color-dropdown'
            id='color-dropdown'
            className='color-dropdown'
            onChange={changeHandler}
          >
            <option value=''>--Please select your color--</option>
            {color.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor='size-button' className='label'>
          Size:
          <div className='size-btns'>
            {size.map((s) => (
              <input
                key={s}
                name='size-button'
                id='size-button'
                type='button'
                value={s}
                className={`size-btn ${selectedSize === s && 'selected-size'}`}
                onClick={sizeHandler}
              />
            ))}
          </div>
        </label>
        <div className='label'>
          Description:
          <p className='product-description'>{description}</p>
        </div>
        <div className='add-to-cart-btn' onClick={addToCartHandler}>
          {success && <p className='success-message'>{success}</p>}
          {error && <p className='error-message'>{error}</p>}
          <Button text='Add to Cart' />
        </div>
      </div>
    </section>
  );
}
