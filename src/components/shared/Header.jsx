import { Link } from 'react-router-dom';
import {
  CiEdit,
  CiSearch,
  CiShoppingCart,
  CiUser,
  CiMenuBurger,
  CiMenuFries,
} from 'react-icons/ci';
import './Header.css';
import { useAuthContext } from '../../context/AuthContext';
import CartBadge from '../ui/CartBadge';
import useProducts from '../../hooks/useProducts';
import { useEffect, useRef, useState } from 'react';

export default function Header() {
  const { user, signInFn, signOutFn } = useAuthContext();
  const {
    productsQuery: { data: products },
  } = useProducts();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const handleMobileMenu = () => {
    setIsMobileMenuOpen((open) => !open);
  };

  const handleClickOutside = (e) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

        <div className='nav mobile' ref={mobileMenuRef}>
          {isMobileMenuOpen ? (
            <CiMenuFries
              className='icon'
              style={{ scale: '-1' }}
              onClick={handleMobileMenu}
            />
          ) : (
            <CiMenuBurger className='icon' onClick={handleMobileMenu} />
          )}

          {
            <nav
              className={`mobile-left ${
                isMobileMenuOpen ? 'opened' : 'closed'
              }`}
            >
              <Link to='/new' className='menu-item' state={{ products }}>
                New Arrivals
              </Link>
              <Link to='/top' className='menu-item' state={{ products }}>
                Tops
              </Link>
              <Link to='/bottom' className='menu-item' state={{ products }}>
                Bottoms
              </Link>
              <Link to='/outer' className='menu-item' state={{ products }}>
                Outers
              </Link>
              <Link to='/shoes' className='menu-item' state={{ products }}>
                Shoes
              </Link>
              <Link
                to='/accessories'
                className='menu-item'
                state={{ products }}
              >
                Accessories
              </Link>
            </nav>
          }
        </div>
      </nav>

      <div className='logo'>
        <Link to='/'>
          <img className='logo-img' src='/logo.png' />
        </Link>
      </div>

      <nav className='navbar'>
        <ul className='nav right'>
          <Link to='/search' className='icon-menu search'>
            <CiSearch className='icon' />
            <span className='icon-menu-text'>Search</span>
          </Link>
          {user && user.isAdmin && (
            <Link to='/products/new' className='icon-menu'>
              <CiEdit className='icon' />
              <span className='icon-menu-text'>New</span>
            </Link>
          )}
          {!user ? (
            <li className='icon-menu' onClick={signInFn}>
              <CiUser className='icon' />
              <span className='icon-menu-text'>Sign In</span>
            </li>
          ) : (
            <li className='icon-menu sign-out' onClick={signOutFn}>
              <CiUser className='icon' />
              <span className='icon-menu-text'>Sign Out</span>
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
              <span className='icon-menu-text'>Cart</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
