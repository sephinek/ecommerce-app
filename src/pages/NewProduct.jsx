import { useState } from 'react';
import './NewProduct.css';
import Button from '../components/ui/Button';
import { uploadImage } from '../api/cloudinary';

export default function NewProduct() {
  const [imageFile, setImageFile] = useState();
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    price: '',
    size: '',
    colors: '',
    description: '',
  });

  const changeHandler = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setImageFile(files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    uploadImage(imageFile).then(console.log);
  };

  return (
    <section className='section'>
      <h2 className='heading-secondary'>Add New Product</h2>

      {imageFile && (
        <img
          src={URL.createObjectURL(imageFile)}
          alt='product image'
          className='product-image'
        />
      )}

      <form className='form' onSubmit={submitHandler}>
        <label htmlFor='image' className='label'>
          Image:
          <input
            type='file'
            accept='image/*'
            name='image'
            id='image'
            required
            onChange={changeHandler}
          />
        </label>

        <label htmlFor='category' className='label'>
          Category:
          <select name='category' id='category' onChange={changeHandler}>
            <option value=''>--Choose an option--</option>
            <option value='top'>Top</option>
            <option value='bottom'>Bottom</option>
            <option value='outer'>Outer</option>
            <option value='shoes'>Shoes</option>
            <option value='accessories'>Accessories</option>
          </select>
        </label>

        <label htmlFor='name' className='label'>
          Name:
          <input
            type='text'
            name='name'
            id='name'
            value={formData.name}
            onChange={changeHandler}
            required
          />
        </label>

        <label htmlFor='price' className='label'>
          Price:
          <input
            type='number'
            min={1}
            name='price'
            id='price'
            value={formData.price}
            onChange={changeHandler}
            required
          />
        </label>

        <label htmlFor='size' className='label'>
          Size:
          <input
            type='text'
            name='size'
            id='size'
            placeholder='Separate with comma(,)'
            value={formData.size}
            onChange={changeHandler}
            required
          />
        </label>

        <label htmlFor='colors' className='label'>
          Colors:
          <input
            type='text'
            name='colors'
            id='colors'
            placeholder='Separate with comma(,)'
            value={formData.colors}
            onChange={changeHandler}
            required
          />
        </label>

        <label htmlFor='description' className='label'>
          Descriptoin:
          <textarea
            name='description'
            id='description'
            rows={5}
            cols={40}
            value={formData.description}
            onChange={changeHandler}
            required
          ></textarea>
        </label>

        <Button text='Add' />
      </form>
    </section>
  );
}
