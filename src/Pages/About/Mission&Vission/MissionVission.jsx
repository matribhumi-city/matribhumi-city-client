import React from 'react';
import PageParallax from '../../../component/pageParallax/pageParallax';
import mission from '../../../assets/Home-Slider/slider2.jpg';
import vission from '../../../assets/Home-Slider/slider4.jpg';
import aboutBg from '../../../assets/Properties/aboutTop.jpg';
import aboutparallax from '../../../assets/Properties/park.jpg';
import aboutstory from '../../../assets/Properties/story2.jpg';
import { Helmet } from 'react-helmet';

const MissionVission = () => {
    return (
        <div className='min-h-screen text-white'>
            <Helmet>
                <title>Mission & Vision - Matribhumi City</title>
                <meta name="description" content="Explore the mission and vision of Matribhumi City, a prime venture by Matribhumi Group, dedicated to realizing your housing dreams." />
            </Helmet>
            <PageParallax bgImage={aboutstory} pageTitle={'Mission & Vission'} />
            <div className="bg-fixed border-y-4 border-white relative py-20 bg-no-repeat bg-cover transition-all duration-300" style={{ backgroundImage: `url(${aboutBg})`, backgroundSize: 'cover', backgroundPosition: 'bottom' }}>
                <div data-aos="fade-up" data-aos-duration="3000" className='container mx-auto text-white'>
                    <div data-aos="fade" data-aos-duration="3000" className='flex flex-col xl:flex-row-reverse items-center gap-10 my-32  xl:mx-0 mx-5'>
                        <div className='w-full' style={{ position: 'relative' }}>
                            <img src={mission} className='rounded-md border-2' alt="Our Mission - Matribhumi City" />
                        </div>
                        <div className='w-full'>
                            <h1 className='text-4xl font-bold  text-white'>Our Mission</h1>
                            <hr className='my-3'/>
                            <p className='text-justify mb-10 indent-10'>
                            <strong>Our mission</strong> is to enhance land management practices and foster sustainable development in Bangladesh by implementing innovative strategies that address the socio-economic, environmental, and cultural needs of local communities. Through collaboration with stakeholders and leveraging technology, we aim to promote land tenure security, improve land use planning, and mitigate land degradation.
                            <br /><br />
                             Our commitment is to empower marginalized populations, including smallholder farmers and vulnerable groups, by providing access to land rights, resources, and opportunities for economic growth. By fostering resilience and promoting inclusive land governance, we aspire to create a more equitable and prosperous future for all Bangladeshis.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-fixed relative py-20 bg-no-repeat bg-cover transition-all duration-300" style={{ backgroundImage: `url(${aboutparallax})`, backgroundSize: 'cover', backgroundPosition: 'bottom' }}>
                <div data-aos="fade-up" data-aos-duration="3000" className='container mx-auto'>
                    <div className='flex flex-col xl:flex-row items-center gap-10 my-32  xl:mx-0 mx-5'>
                        <div className='w-full ' style={{ position: 'relative' }}>
                            <img src={vission} className='rounded-md border-2' alt="Our Vision - Matribhumi City" />
                        </div>
                        <div className='w-full'>
                            <h1 className='text-4xl font-bold  text-white'>Our Vission</h1>
                            <hr className='my-3' />
                            <p className='text-justify mb-10 indent-10'>
                                <strong>Our vision</strong> is of a Bangladesh where land resources are managed sustainably, equitably, and inclusively, serving as the foundation for vibrant communities, thriving ecosystems, and resilient economies. We envision a future where every individual, regardless of socio-economic status or background, enjoys secure land tenure rights and has access to opportunities for prosperity and well-being. Through our project initiatives, we aim to transform land management practices, promote environmental stewardship, and foster social cohesion. By harnessing the power of technology, innovation, and community participation, we strive to create a landscape where the benefits of land resources are shared equitably and where future generations inherit a legacy of sustainable development and environmental stewardship. 
                                
                                Together, we aspire to build a <strong>Bangladesh</strong> where land is not just a source of wealth, but a foundation for social justice, economic empowerment, and environmental resilience.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MissionVission;