import React from 'react';
import { Helmet } from 'react-helmet';
import PageParallax from '../../component/pageParallax/pageParallax';
import blhl from '../../assets/concerns/BLHL-Bangladesh-Luxury-Handicrafts-Limited.png';
import mdpl from '../../assets/concerns/Matribhumi-Developer-&-Properties-Limited.png';
import mhl from '../../assets/concerns/Matribhumi-Holdings-Limited.png';
import mttl from '../../assets/concerns/Matribhumi-Tours-Travels-Limited.png';
import heart from '../../assets/concerns/Matribhumi-Heart-Care.png';
import mmb from '../../assets/concerns/Ms.-Mine-Brothers.png';

const concernsData = [
    { link: 'https://blhlheritage.com/', image: blhl, alt: 'BLHL - Bangladesh Luxury handicrafts limited' },
    { link: 'https://mdplbd.com/', image: mdpl, alt: 'Mdpl - Matribhumi Developer & Properties Limited' },
    { link: 'https://matribhumiheartcare.com/', image: heart, alt: 'Matribhumi Heart care limited' },
    { link: '', image: mhl, alt: '' },
    { link: '', image: mttl, alt: 'matribhumi tours & travels limited' },
    { link: '', image: mmb, alt: 'm/s.Mine & Brothers' },
];

const Concerns = () => {
    return (
        <div className="min-h-screen animate__animated animate__fadeIn">
            <Helmet>
                <title>Our Concerns - Matribhumi City</title>
                <meta name="description" content="Explore Matribhumi City's sister concerns including BLHL, MDPL, Matribhumi Heart Care, and more. View our photo gallery showcasing milestones and successes in our projects." />
            </Helmet>
            <PageParallax bgImage={'https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} pageTitle={'Sister Concerns'} />
            <div className="xl:w-6/12 lg:w-10/12 mx-auto py-24">
                <div className='flex flex-wrap justify-center items-center gap-10 xl:mx-0 mx-5'>
                    {concernsData?.map((item, index) => (
                        <div key={index} className='w-52 p-2 border '>
                            <a href={item?.link} target="_blank" rel="noopener noreferrer">
                                <img src={item?.image} className="w-full" alt={item?.alt} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Concerns;
