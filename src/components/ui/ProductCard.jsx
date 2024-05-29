import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { id, name, category, color, image, price, size } = product;

  return (
    <Link to={`products/${id}`} state={{ product }}>
      <li className='product-card'>
        <div className='product-img-box'>
          <img className='product-img' src={image} alt={name} />
        </div>
        <div className='product-info-block'>
          <h5 className='product-category'>{category}</h5>
          <div className='product-name-price-box'>
            <h3 className='product-name'>{name}</h3>
            <p className='product-price'>{price}</p>
          </div>
          <p className='product-size'>
            <span className='product-label'>Size:</span> {size.join(', ')}
          </p>
          <p className='product-color'>
            <span className='product-label'>Color:</span> {color.join(', ')}
          </p>
        </div>
      </li>
    </Link>
  );
}
