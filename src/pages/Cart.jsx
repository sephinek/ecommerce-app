import { Link } from 'react-router-dom';
import './Cart.css';
import Loading from '../components/shared/Loading';
import Button from '../components/ui/Button';
import useCart from '../hooks/useCart';

export default function Cart() {
  const {
    cartQuery: { isLoading, data: products },
    addOrUpdateItem,
    deleteItem,
  } = useCart();

  const hasProducts = products && products.length > 0;

  const totalPrice =
    products && products.length > 0
      ? products.reduce(
          (accum, product) => accum + product.price * product.quantity,
          0
        )
      : 0;

  const SHIPPING_FEE = 5.99;

  const quantityChangeHandler = (e, product) => {
    if (e.target.textContent === '-') {
      if (product.quantity <= 1) return;
      else
        addOrUpdateItem.mutate({
          ...product,
          quantity: product.quantity - 1,
        });
    } else if (e.target.textContent === '+') {
      addOrUpdateItem.mutate({ ...product, quantity: product.quantity + 1 });
    } else {
      deleteItem.mutate(product.id);
    }
  };

  return (
    <section className='cart'>
      <div
        className={`cart-container${!hasProducts ? ' cart-no-product' : ''}`}
      >
        {isLoading && <Loading />}
        {!isLoading && !hasProducts && (
          <>
            <p>Your shopping cart is empty.</p>
            <div className='continue-shopping-btn'>
              <Link to='/'>
                <Button text='Continue shopping' />
              </Link>
            </div>
          </>
        )}
        {hasProducts && (
          <>
            <h2 className='cart-heading'>My Shopping Cart Items</h2>
            <div className='cart-block'>
              <ul>
                {products.map((product) => (
                  <div key={product.id} className='cart-product'>
                    <img
                      src={product.image}
                      alt={product.name}
                      className='product-image'
                    />
                    <div className='product-info'>
                      <h2 className='product-name'>{product.name}</h2>
                      <h3 className='product-price'>{product.price}</h3>
                      <p className='label product-size'>Size: {product.size}</p>
                      <p className='label product-color'>
                        Color: {product.color}
                      </p>
                      <p className='label product-quantity'>
                        quantity:{' '}
                        <span className='quantity-box'>
                          <button
                            className='quantity-btn'
                            onClick={(e) => quantityChangeHandler(e, product)}
                          >
                            -
                          </button>
                          {product.quantity}
                          <button
                            className='quantity-btn'
                            onClick={(e) => quantityChangeHandler(e, product)}
                          >
                            +
                          </button>
                          <button
                            className='quantity-btn delete-btn'
                            onClick={(e) => quantityChangeHandler(e, product)}
                          >
                            x
                          </button>
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </ul>
              <div className='order-summary'>
                <h2 className='summary-title'>Order Summary</h2>
                <div className='summary-content'>
                  <div className='price-label'>
                    <span className='label'>Order value:</span>
                    <span>$ {totalPrice}</span>
                  </div>
                  <div className='price-label'>
                    <span>Estimated tax:</span>
                    <span className='price'>TBD</span>
                  </div>
                  <div className='price-label'>
                    <span className='label'>Shipping & handling: </span>
                    <span>$ {SHIPPING_FEE}</span>
                  </div>
                  <div className='price-label total'>
                    <span className='label'>Total:</span>
                    <span>
                      $ {Math.round((totalPrice + SHIPPING_FEE) * 100) / 100}
                    </span>
                  </div>
                </div>
                <Button text='Proceed to checkout' />
                <div className='payment-methods'>
                  <img src='/public/payment-method.png' alt='Payment Methods' />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
