import { Fragment } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import bannerImgs from '../../assets/bannerImgs';
import './Banner.css';

const BANNER_STATEMENTS = [
  "Step into style with our latest collection! Discover trendy outfits that'll make heads turn.",
  'Revamp your wardrobe with our exclusive deals! Find the perfect look for any occasion.',
  'Elevate your fashion game with our diverse range of chic clothing! Unleash your inner fashionista.',
  'Stay ahead of the fashion curve with our must-have pieces! Shop now for the latest trends.',
  'Experience effortless elegance with our curated selection! Your go-to destination for timeless style.',
];

export default function Banner() {
  return (
    <div className='banner'>
      <Carousel
        autoPlay
        infiniteLoop
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        interval={4000}
        transitionTime={2000}
        swipeable
      >
        {bannerImgs.map((img, i) => (
          <Fragment key={img}>
            <img className='carousel-img' src={img} />
            <div className='carousel-sentence-box'>
              <p className='carousel-sentence'>{BANNER_STATEMENTS[i]}</p>
            </div>
          </Fragment>
        ))}
      </Carousel>
    </div>
  );
}
