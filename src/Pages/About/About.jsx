import { useState } from 'react';
import mission from '../../assets/Home-Slider/slider2.jpg';
import vission from '../../assets/Home-Slider/slider4.jpg';
import aboutBg from '../../assets/Properties/aboutTop.jpg';
import about from '../../assets/Properties/about.jpg';
import aboutparallax from '../../assets/Properties/park.jpg';
import aboutstory from '../../assets/Properties/story2.jpg';
import about2 from '../../assets/Properties/aboutbg1.jpg';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import MatribhumiCityVideo from '../../assets/Videos/Mtribhumi-City-About-Video.mp4';
import aboutImage from '../../assets/PageCover/aboutImage.png';
import PageParallax from '../../component/pageParallax/pageParallax';
import { Helmet } from 'react-helmet';

const About = () => {
    const [thumbnailVisible, setThumbnailVisible] = useState(true);

    const handleThumbnailClick = () => {
        setThumbnailVisible(false);
        const video = document.getElementById('yourVideoId');
        if (video) {
            video.play();
        }
    };

    return (
        <div className='min-h-screen animate__animated animate__fadeIn text-white'>
            <Helmet>
                <title>About Us - Matribhumi City</title>
                <meta name="description" content="Welcome to Matribhumi City, a prime venture by Matribhumi Group dedicated to realizing your housing dreams." />
            </Helmet>
            <PageParallax bgImage={aboutBg} pageTitle={'About Us'} />
            <div className=''>
                <div className="bg-fixed border-y-4 border-white relative py-20 bg-no-repeat bg-cover transition-all duration-300" style={{ backgroundImage: `url(${aboutstory})`, backgroundSize: 'cover', backgroundPosition: 'bottom' }}>
                    <div data-aos="fade-up" data-aos-duration="3000" className='container mx-auto my-32'>
                        <div className='flex flex-col xl:flex-row items-center gap-10 xl:mx-0 mx-5'>
                            <div className='w-full' style={{ position: 'relative' }}>
                                <img src={about} className='l rounded-md border-4' alt="Matribhumi City" />
                            </div>
                            <div className='w-full'>
                                <h2 className='text-4xl font-bold text-white'>Our Story</h2>
                                <hr className='my-3' />
                                <p className='text-justify mb-10'>
                                    <strong>Matribhumi City</strong> traces its journey as a visionary real estate company, weaving the narrative of reshaping urban living in Bangladesh. Our story unfolds with the inception of our flagship project, Matribhumi Smart City, strategically positioned near Nimtola on the Dhaka-Mawa 300-feet highway. This milestone development, located just 20 minutes from Motijheel, stands as a testament to our commitment to meticulous planning and excellence in the real estate sector. <br /><br />

                                    Founded on the principle of transforming landscapes, <strong>Matribhumi Smart City</strong> is more than just a project; it's an embodiment of our dedication to crafting vibrant communities. Our story is one of essential amenities, flexible plots, and a relentless pursuit of setting new standards in the industry. <br /><br />

                                    As we reflect on our journey, we invite you to be a part of <strong>Our Story</strong> — a story that envisions and shapes the future of urban living in Bangladesh.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-fixed border-b-4 border-white relative py-20 bg-no-repeat bg-cover transition-all duration-300" style={{ backgroundImage: `url(${about2})`, backgroundSize: 'cover', backgroundPosition: 'bottom' }}>
                    <div data-aos="fade-up" data-aos-duration="3000" className='xl:w-6/12 w-11/12 mx-auto rounded-lg border-4 border-white my-32'>
                        <div className='w-full' style={{ position: 'relative' }}>
                            {thumbnailVisible && (
                                <>
                                    <img
                                        src={aboutImage}
                                        alt="Video Thumbnail"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            zIndex: 2,
                                            cursor: 'pointer',
                                            opacity: thumbnailVisible ? 1 : 0, // Initial opacity
                                            transition: 'opacity 0.8s ease-in-out', // Transition effect
                                        }}
                                        className='rounded-md'
                                        onClick={handleThumbnailClick}
                                    />
                                    <PlayCircleFilledWhiteIcon
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            position: 'absolute',
                                            transform: 'translate(-50%, -50%)', // Center the icon perfectly
                                            zIndex: 15, // Set a higher zIndex to make it appear above the thumbnail
                                            cursor: 'pointer',
                                            color: 'white',
                                            border: '3px solid white',
                                            borderRadius: '50px'
                                        }}
                                        className='lg:left-[45%] md:left-[45%] left-[43%] lg:top-[40%] md:top-[45%] top-[35%] animate__animated animate__pulse animate__infinite infinite'
                                        onClick={handleThumbnailClick} // Trigger the same function when the icon is clicked
                                    />
                                </>
                            )}
                            <video
                                id="yourVideoId"
                                controls
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'cover',
                                    position: 'relative',
                                    zIndex: 1,
                                }}
                                className='rounded-md'
                            >
                                <source src={MatribhumiCityVideo} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>

                    </div>
                </div>
                <div className="bg-fixed border-b-4 border-white relative py-20 bg-no-repeat bg-cover transition-all duration-300" style={{ backgroundImage: `url(${aboutBg})`, backgroundSize: 'cover', backgroundPosition: 'bottom' }}>
                    <div data-aos="fade-up" data-aos-duration="3000" className='container mx-auto text-white'>
                        <div data-aos="fade" data-aos-duration="3000" className='flex flex-col xl:flex-row-reverse items-center gap-10 my-32  xl:mx-0 mx-5'>
                            <div className='w-full' style={{ position: 'relative' }}>
                                <img src={mission} className=' rounded-md border-2' alt="Matribhumi City" />
                            </div>
                            <div className='w-full'>
                                <h2 className='text-4xl font-bold  text-white'>Our Mission</h2>
                                <hr className='my-3' />
                                <p className='text-justify mb-10 indent-10'>
                                    Our mission is to enhance land management practices and foster sustainable development in Bangladesh by implementing innovative strategies that address the socio-economic, environmental, and cultural needs of local communities. Through collaboration with stakeholders and leveraging technology, we aim to promote land tenure security, improve land use planning, and mitigate land degradation.
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
                                <img src={vission} className=' rounded-md border-2' alt="Matribhumi City" />
                            </div>
                            <div className='w-full'>
                                <h2 className='text-4xl font-bold  text-white'>Our Vission</h2>
                                <hr className='my-3' />
                                <p className='text-justify mb-10 indent-10'>
                                Our vision is of a Bangladesh where land resources are managed sustainably, equitably, and inclusively, serving as the foundation for vibrant communities, thriving ecosystems, and resilient economies. We envision a future where every individual, regardless of socio-economic status or background, enjoys secure land tenure rights and has access to opportunities for prosperity and well-being. Through our project initiatives, we aim to transform land management practices, promote environmental stewardship, and foster social cohesion. By harnessing the power of technology, innovation, and community participation, we strive to create a landscape where the benefits of land resources are shared equitably and where future generations inherit a legacy of sustainable development and environmental stewardship. 
                                
                                Together, we aspire to build a Bangladesh where land is not just a source of wealth, but a foundation for social justice, economic empowerment, and environmental resilience.
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
