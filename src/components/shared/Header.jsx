import { Link } from 'react-router-dom';
import { CiSearch, CiShoppingCart, CiUser } from 'react-icons/ci';
import './Header.css';

export default function Header() {
  return (
    <header className='header'>
      <nav className='navbar'>
        <ul className='nav left'>
          <li>
            <Link to='/products'>New Arrivals</Link>
          </li>
          <li>Tops</li>
          <li>Bottoms</li>
          <li>Outers</li>
          <li>Shoes</li>
          <li>Accessories</li>
        </ul>
      </nav>

      <div className='logo'>
        <Link to='/'>
          <img className='logo-img' src='/src/assets/logo.png' />
        </Link>
      </div>

      <nav className='navbar'>
        <ul className='nav right'>
          <li>Magazine</li>
          <li className='icon-menu'>
            <CiSearch className='icon' />
            Search
          </li>
          <li className='icon-menu'>
            <CiUser className='icon' />
            Sign In
          </li>
          <li>
            <Link to='/cart' className='icon-menu'>
              <CiShoppingCart className='icon' />
              Cart
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
