import { Link } from 'react-router-dom';
import { CiSearch, CiShoppingCart, CiUser } from 'react-icons/ci';
import './Header.css';
import {
  getAnalyticsFn,
  onUserStateChanged,
  signInFn,
  signOutFn,
} from '../../api/firebase';
import { useEffect, useState } from 'react';

export default function Header() {
  const [user, setUser] = useState(null);
  console.log(user);

  const signInBtnHandler = async () => {
    const user = await signInFn();
    setUser(user);
  };

  const signOutBtnHandler = async () => {
    await signOutFn();
    setUser(null);
  };

  useEffect(() => {
    onUserStateChanged((user) => {
      setUser(user);
    });
  }, []);

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
          <li className='icon-menu'>
            <CiSearch className='icon' />
            Search
          </li>
          {!user ? (
            <li className='icon-menu' onClick={signInBtnHandler}>
              <CiUser className='icon' />
              Sign In
            </li>
          ) : (
            <li className='icon-menu sign-out' onClick={signOutBtnHandler}>
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
