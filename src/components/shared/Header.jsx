import { Link } from 'react-router-dom';
import { CiEdit, CiSearch, CiShoppingCart, CiUser } from 'react-icons/ci';
import './Header.css';
import { useAuthContext } from '../../context/AuthContext';
import CartBadge from '../ui/CartBadge';
import useProducts from '../../hooks/useProducts';

export default function Header() {
  const { user, signInFn, signOutFn } = useAuthContext();
  const {
    productsQuery: { data: products },
  } = useProducts();

  return (
    <header className='header'>
      <nav className='navbar'>
        <ul className='nav left'>
          <li>
            <Link to='/new' state={{ products }}>
              New Arrivals
            </Link>
          </li>
          <li>
            <Link to='/top' state={{ products }}>
              Tops
            </Link>
          </li>
          <li>
            <Link to='/bottom' state={{ products }}>
              Bottoms
            </Link>
          </li>
          <li>
            <Link to='/outer' state={{ products }}>
              Outers
            </Link>
          </li>
          <li>
            <Link to='/shoes' state={{ products }}>
              Shoes
            </Link>
          </li>
          <li>
            <Link to='/accessories' state={{ products }}>
              Accessories
            </Link>
          </li>
        </ul>
      </nav>

      <div className='logo'>
        <Link to='/'>
          <img className='logo-img' src='/public/logo.png' />
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
            <Link
              to={user ? `/cart/${user.uid}` : '/cart'}
              className='icon-menu'
            >
              <div className='cart-box'>
                <CiShoppingCart className='icon' />
                <CartBadge />
              </div>
              Cart
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
