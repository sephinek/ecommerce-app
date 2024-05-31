import Button from '../ui/Button';
import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <ul className='col col-1'>
        <li>Contact Us</li>
        <li>Returns & Refunds</li>
        <li>Delivery Information</li>
        <li>Customer Service</li>
        <li>Payment</li>
        <li>FAQs</li>
        <li>Privacy Notice</li>
        <li>Cookies settings</li>
      </ul>
      <ul className='col col-2'>
        <li>Sustainability</li>
        <li>Fit Guide</li>
        <li>Size Guide</li>
        <li>Product Care</li>
        <li>About Us</li>
        <li>Careers</li>
      </ul>
      <ul className='col col-3'>
        <p className='subscribe-text'>
          Subscribe our newsletter and enjoy 15% off your first order.
        </p>
        <div className='subscribe-btn-box'>
          <Button text='SUBSCRIBE' />
        </div>
      </ul>
    </footer>
  );
}
