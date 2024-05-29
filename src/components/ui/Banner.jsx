import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import bannerImgs from '../../assets/bannerImgs';
import './Banner.css';

export default function Banner() {
  return (
    <div className='banner'>
      <Carousel
        autoPlay
        infiniteLoop
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        interval={3000}
        transitionTime={2000}
        swipeable
      >
        {bannerImgs.map((img) => (
          <img className='carousel-img' key={img} src={img} />
        ))}
      </Carousel>
    </div>
  );
}
