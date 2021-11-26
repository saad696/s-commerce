import { Carousel } from 'antd';
import React from 'react';
import sliderImage1 from '../assets/images/s1.jpg';
import sliderImage2 from '../assets/images/s2.jpg';
import sliderImage3 from '../assets/images/s3.jpg';

const Slider = () => {
    return (
        <>
            <Carousel autoplay className='mt1'>
                <div>
                    <img src={sliderImage1} alt='image 1' style={{ width: '100%' }}/>
                </div>
                <div>
                    <img src={sliderImage2} alt='image 3' style={{ width: '100%' }}/>
                </div>
                <div>
                    <img src={sliderImage3} alt='image 3' style={{ width: '100%' }}/>
                </div>
            </Carousel>
        </>
    );
};

export default Slider;
