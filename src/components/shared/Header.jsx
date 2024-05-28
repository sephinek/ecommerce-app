import { Link } from 'react-router-dom';
import { CiEdit, CiSearch, CiShoppingCart, CiUser } from 'react-icons/ci';
import './Header.css';
import { useAuthContext } from '../../context/AuthContext';

export default function Header() {
  const { user, signInFn, signOutFn } = useAuthContext();

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
          <Link to='/search' className='icon-menu'>
            <CiSearch className='icon' />
            Search
          </Link>
          {user && user.isAdmin && (
            <Link to='/products/new' className='icon-menu'>
              <CiEdit className='icon' />
              New
            </Link>
          )}
          {!user ? (
            <li className='icon-menu' onClick={signInFn}>
              <CiUser className='icon' />
              Sign In
            </li>
          ) : (
            <li className='icon-menu sign-out' onClick={signOutFn}>
              <CiUser className='icon' /> Sign Out
            </li>
          )}
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
