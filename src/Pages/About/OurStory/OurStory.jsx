import React from 'react';
import PageParallax from '../../../component/pageParallax/pageParallax';
import about from '../../../assets/Properties/about.jpg';
import aboutstory from '../../../assets/Properties/story2.jpg';
import { Helmet } from 'react-helmet';

const OurStory = () => {
    return (
        <div className='min-h-screen'>
            <Helmet>
                <title>Our Story - Matribhumi City</title>
                <meta
                    name="description"
                    content="Explore commercial and residential features and amenities at Matribhumi City. Discover educational, healthcare, shopping, and recreational facilities for a modern lifestyle."
                />
            </Helmet>
            <PageParallax bgImage={aboutstory} pageTitle={'Our Story'} />
            <div className="bg-fixed border-y-4 text-white border-white relative py-20 bg-no-repeat bg-cover transition-all duration-300" style={{ backgroundImage: `url(${aboutstory})`, backgroundSize: 'cover', backgroundPosition: 'bottom' }}>
                <div data-aos="fade-up" data-aos-duration="3000" className='container mx-auto my-32'>
                    <div className='flex flex-col xl:flex-row items-center gap-10 xl:mx-0 mx-5'>
                        <div className='w-full' style={{ position: 'relative' }}>
                            <img src={about} className='rounded-bl-3xl rounded-tr-3xl border-4 ' alt="Matribhumi City" />
                        </div>
                        <div className='w-full'>
                            <h2 className='text-4xl font-bold  text-white'>Our Story</h2>
                            <hr className='my-3' />
                            <p className='text-justify mb-10'>
                                Welcome to <strong>Matribhumi City</strong>, a prime venture by Matribhumi Group dedicated to realizing your housing dreams. Our meticulously planned <strong>Matribhumi Smart City</strong>, located near <strong>Nimtala on the Dhaka-Mawa 300-foot highway</strong>, offers futuristic living just 30 minutes from Motijheel. <br /><br />
                                Positioned strategically near the <strong>Padma Bridge</strong> and key development projects, our community features essential amenities and six plot types with flexible installment options. <strong>Matribhumi City</strong> provides a unique blend of urban living and natural beauty for a fulfilling lifestyle.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurStory;