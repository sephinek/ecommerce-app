import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import './CartSignin.css';

export default function CartSignin() {
  const { signInFn } = useAuthContext();
  const navigate = useNavigate();

  const signInHandler = () => {
    signInFn();
    navigate('/');
  };

  return (
    <>
      <p className='cart-signin'>Please sign in to use your shopping cart :)</p>
      <div className='cart-btns'>
        <div className='cart-signin-btn'>
          <Link to='/'>
            <Button text='Back to Homepage' />
          </Link>
        </div>
        <div className='cart-signin-btn' onClick={signInHandler}>
          <Button text='Continue to Sign In' />
        </div>
      </div>
    </>
  );
}
