import React from 'react';
import './Hero.css';
import hand_icon from '../Assets/hand_icon.png';
import hero_image from '../Assets/hero_image.png';

const Hero = () => {
  return (
    <section className='hero'>
      {/* Left Section */}
      <div className="hero_left">
        <h2>New Arrivals Only</h2>
        
        <div className="hero_left_hand">
          <p>New</p>
          <img src={hand_icon} alt='Hand Icon' />
        </div>

        <p>Collections</p>
        <p>For Everyone</p>
        
        <button>Latest Collections</button>
      </div>

      {/* Right Section */}
      <div className="hero_right">
        <img src={hero_image} alt="Hero Display" />
      </div>
    </section>
  );
};

export default Hero;
