import { useLocation } from 'react-router-dom';

export default function ProductDetail() {
  const {
    state: {
      product: { name, category, price, size, color, description, image },
    },
  } = useLocation();

  console.log(name, category, price, size, color, description, image);

  return (
    <div className='product-detail'>
      <img src={image} alt={name} />
      <div className='product-info'>
        <h1>{name}</h1>
        <p>{price}</p>
        <label htmlFor='color-dropdown' className='label'>
          Color:
          <select name='color-dropdown' id='color-dropdown'>
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
          {size.map((s) => (
            <input
              key={s}
              name='size-button'
              id='size-button'
              type='button'
              value={s}
              className='size-btn'
            />
          ))}
        </label>
      </div>
    </div>
  );
}
