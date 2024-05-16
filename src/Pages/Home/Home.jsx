import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Marquee from 'react-simple-marquee';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Paper, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { Helmet } from "react-helmet";
import 'tailwindcss/tailwind.css'; // Assuming you are using Tailwind CSS
import LocateArea from './LocateArea/LocateArea';
import layoutGif from '../../assets/properties.gif';
import aboutImage from '../../assets/PageCover/aboutImage.png';
import MatribhumiCityVideo from '../../assets/Videos/Mtribhumi-City-About-Video.mp4';
import mapBg from '../../assets/Properties/layout.jpg';
import projectPlan from '../../assets/Properties/projectLayout.png';
import concern2 from '../../assets/concerns/Matribhumi-Developer-&-Properties-Limited.png';
import concern3 from '../../assets/concerns/Matribhumi-Heart-Care.png';
import concern4 from '../../assets/concerns/BLHL-Bangladesh-Luxury-Handicrafts-Limited.png';
import concern5 from '../../assets/concerns/Matribhumi-Tours-Travels-Limited.png';
import concern6 from '../../assets/concerns/Ms.-Mine-Brothers.png';
import { Icon } from '@iconify/react';
import { featureData } from '../../../public/data/feature';

// project plan 
const plans = [
    "The project is located just 20 minutes from Motijheel.",
    "Illuminate the Padma bridge project which is under implementation very soon",
    "The project is adjacent to the 4 lane 400 feet Dhaka-Mawa highway",
    "The Fakirapool - Arambagh - Jhilmil flyover project will make it the heart of the city.",
    "The proposed Bangabandhu International Airport and Rail Line project will create a new horizon of connectivity.",
    "Rajuk's Jhilmil project is located next to the project.",
    "Nearby are DOHS, Central Jail, proposed second campus of Jagannath University, Olympic City, National Stadium, Bangabandhu Convention Hall-2, Padmaview Stadium and National Sports Complex.",
    "There are also hospitals, banks, children's parks and shopping malls.",
    "The project is 100% environment friendly.",
    "The project has scenic lake.",
    "Plot size of the project - 3, 5 and 20 khata.",
    "The project has 25, 30, 40 and 50 feet wide roads.",
    "Naturally developed high land, suitable for building now.",
]

// Small Features data
const features = featureData

// Concerns data
const concernsData = [
    // { link: 'http://matribhumigroup.com/', image: concern1 },
    { link: 'https://mdplbd.com/', image: concern2 },
    { link: 'https://matribhumiheartcare.com/', image: concern3 },
    { link: 'https://blhlheritage.com/', image: concern4 },
    { link: '/', image: concern5 },
    { link: '/', image: concern6 },
];

const images = [
    { id: 1, src: 'https://images.unsplash.com/photo-1684676929164-b9b67a61a9f4?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: '20 Katha', description: ['School', 'College', 'Univercity'] },
    { id: 2, src: 'https://images.pexels.com/photos/4027948/pexels-photo-4027948.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: '05 Katha', description: ['Shopping Mall', 'Clothing Stores', 'Food Court'] },
    { id: 2, src: 'https://images.pexels.com/photos/4143567/pexels-photo-4143567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: '10 Katha', description: ['Hospital', 'Diagnostic Center', 'Pharmacy'] },
    { id: 2, src: 'https://images.pexels.com/photos/7031607/pexels-photo-7031607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: '03 Katha', description: ['Green Area', 'Gymnasium'] },
];

const Home = () => {
    const [thumbnailVisible, setThumbnailVisible] = useState(true);

    const handleThumbnailClick = () => {
        setThumbnailVisible(false);
        const video = document.getElementById('yourVideoId');
        if (video) {
            video.play();
        }
    };
    return (
        <div>
            <Helmet>
                <title>Home - Matribhumi City</title>
                <meta name="description" content="Explore Matribhumi City, a prime housing venture near Nimtala. Discover our meticulously planned Smart City with essential amenities, flexible plots, and a strategic location in Dhaka-Mawa highway." />
            </Helmet>

            {/* Our Concerns */}
            <div className='py-24'>
                <div className='w-full mx-auto text-center'>
                    <h2 className='text-4xl font-bold text-[#134391]'>Our Concerns</h2>
                    <hr className='my-3' />
                </div>
                <Marquee
                    speed={1}
                    style={{
                        height: 'fit-content',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '1rem',
                    }}
                >
                    {concernsData.map((concern, index) => (
                        <a
                            href={concern.link}
                            key={index}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <img
                                src={concern.image}
                                alt={`concern-${index}`}
                                className={`w-36 md:mr-72 mr-52 hover:scale-105 transition-all duration-300`}
                            />
                        </a>
                    ))}
                </Marquee>
            </div>

            <div className='bg-[#F9FBFF]'>
                {/* Our story */}
                <div className='container mx-auto'>
                    <div className='flex flex-col xl:flex-row items-center gap-10 xl:mx-0 mx-5'>
                        <div data-aos="fade" data-aos-duration="1000" className='w-full' style={{ position: 'relative' }}>
                            {thumbnailVisible && (
                                <>
                                    <div className='w-full h-full bg-[#134391] rounded-md bg-opacity-80 absolute z-10 top-0 left-0'></div>
                                    <img
                                        src={aboutImage}
                                        alt="Matribhumi City"
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
                                            zIndex: 20, // Set a higher zIndex to make it appear above the thumbnail
                                            cursor: 'pointer',
                                            color: 'white',
                                            border: '3px solid white',
                                            borderRadius: '50px'
                                        }}
                                        className='animate__animated animate__pulse animate__infinite infinite lg:left-[45%] md:left-[45%] left-[40%] lg:top-[40%] md:top-[45%] top-[35%]'
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
                        <div data-aos="fade" data-aos-duration="1000" className='w-full'>
                            <h1 className='text-4xl font-bold text-[#134391]'>About Us</h1>
                            <hr className='my-3' />
                            <p className='text-justify mb-10'>
                                <strong>Matribhumi City</strong> is a trailblazing real estate company in Bangladesh, dedicated to transforming the landscape of urban living. <br /> <br />
                                Our flagship project, <strong>Matribhumi Smart City</strong>, strategically situated near Nimtola on the Dhaka-Mawa 300-feet highway, offers meticulously planned housing just 20 minutes from Motijheel. Boasting essential amenities and a range of flexible plots, we are committed to setting new standards in the real estate sector. Join us as we shape the future of urban living in Bangladesh.
                            </p>
                            <Link to={'/about'} className="hover:bg-white bg-[#134391] font-semibold text-white transition-all duration-300 hover:text-[#134391] hover:border-[#134391] py-3 px-4 border border-transparent rounded">
                                See More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* feature amenities */}
            <div className='py-32 xl:mx-0 mx-5'>
                <div className='container mx-auto flex lg:flex-row flex-col items-center gap-8'>
                    <div data-aos="fade" data-aos-duration="1000" className='w-full'>
                        {/* <Divider textAlign="left" style={{ fontSize: "2em", fontWeight: "bold", marginBottom: '10px', color: '#134391' }} className='animate__fadeInUp'>Our Story</Divider> */}
                        <h1 className='text-4xl font-bold text-[#134391]'>Features & Amenities</h1>
                        <hr className='my-3' />
                        <p className='text-justify mb-10'>
                            Experience elevated living at <strong>Matribhumi Smart City</strong>, strategically located near Nimtola on the Dhaka-Mawa 300-feet highway, just 20 minutes from Motijheel. Our commitment to excellence is reflected in meticulously planned features and amenities. <br /><br />

                            Enjoy convenient access to educational institutions, healthcare facilities, and recreational spaces, including swimming pools and parks. Indulge in retail therapy at our dynamic shopping mall, offering clothing stores, electronics shops, and a food court.<br /><br />

                            Prioritize safety with emergency services like a fire station, pump house, and clinic. Foster a healthy lifestyle with a gymnasium and green spaces. Our mosque caters to spiritual needs, enhancing the overall harmony of our community.<br /><br />
                            Matribhumi Smart City redefines urban living, offering a blend of convenience, sustainability, and vibrant community spirit in Bangladesh.
                        </p>
                        <Link to={'/feature-aminity'} className="hover:bg-white bg-[#134391] font-semibold text-white transition-all duration-300 hover:text-[#134391] hover:border-[#134391] py-3 px-4 border border-transparent rounded">
                            See More
                        </Link>
                    </div>
                    <div className="w-full grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-3 justify-center xl:mx-0 mx-5 p-2 rounded-sm z-50" data-aos="fade" data-aos-duration="1000">
                        {features?.commercial?.slice(0, 2)?.map((feature, index) => (
                            <div
                                style={{ backgroundImage: `url(${feature.bgImage})`, backgroundSize: 'cover' }}
                                key={index}
                                className="h-[250px] w-full flex flex-col gap-3 items-center drop-shadow-md transition-all duration-300 hover:scale-105 rounded-md text-[#134391] bg-white hover:bg-white hoverFeature relative"
                            >
                                <div className='hoverContent rounded-md animate__animated animate__fadeIn bg-[#053a63] bg-opacity-80 z-50 relative w-full h-full text-white'>
                                    <div className='flex flex-col justify-center items-center p-5 text-center'>
                                        <span className='text-2xl mb-5'>{feature.featureName}</span>
                                        {feature.items && (
                                            <ul>
                                                {feature.items.map((item, itemIndex) => (
                                                    <li key={itemIndex} className='py-2 border-t'>{item}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {featureData?.residential?.slice(0, 2)?.map((feature, index) => (
                            <div
                                style={{ backgroundImage: `url(${feature.bgImage})`, backgroundSize: 'cover' }}
                                key={index}
                                className="h-[250px] w-full flex flex-col gap-3 items-center drop-shadow-md transition-all duration-300 hover:scale-105 rounded-md text-[#134391] bg-white hover:bg-white hoverFeature relative"
                            >
                                <div className='hoverContent rounded-md animate__animated animate__fadeIn bg-[#053a63] bg-opacity-80 z-50 relative w-full h-full text-white'>
                                    <div className='flex flex-col justify-center items-center p-5 text-center'>
                                        <span className='text-2xl mb-5'>{feature.featureName}</span>
                                        {feature.items && (
                                            <ul>
                                                {feature.items.map((item, itemIndex) => (
                                                    <li key={itemIndex} className='py-2 border-t'>{item}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Locate area  */}
            <LocateArea />

            {/* project plan  */}
            <div className='mt-20'>
                <div className="bg-fixed relative py-20 bg-no-repeat bg-cover transition-all duration-300" style={{ backgroundImage: `url(${mapBg})`, backgroundSize: '100% 100%', backgroundPosition: 'bottom' }}>
                    <div className='container mx-auto'>
                        <div data-aos="fade" data-aos-duration="2000" className='flex lg:flex-row flex-col items-center gap-10 z-40 relative xl:mx-0 mx-5'>
                            <div
                                className="w-full text-white">
                                <h1 className=' text-4xl font-semibold'>Project Plan</h1>
                                <hr className='my-5' />
                                <div className='my-10'>
                                    {
                                        plans?.slice(0, 4).map((plan, index) => (
                                            <div key={index} className='flex gap-2 mt-8 font-medium cursor-pointer hover:pl-3 transition-all duration-200'>
                                                <Icon icon="prime:check-square" className='text-2xl' />
                                                <span>{plan}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                                <Link to={'/porject-layout'} className="hover:bg-transparent bg-white font-semibold hover:text-white transition-all duration-300 text-[#134391] hover:border-white py-3 px-4 border border-transparent  rounded">
                                    See More
                                </Link>
                            </div>
                            <div className="w-full">
                                <img src={projectPlan} className='w-full rounded-md drop-shadow-xl' alt="Matribhumi City" />
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-full bg-[#134391] opacity-80 absolute top-0 z-0'></div>
                </div>
            </div>

            {/* properties  */}
            <div className='w-full mx-auto text-center py-24'>
                <h2 className='text-4xl font-bold text-[#134391]'>Property Map</h2>
                <hr className='my-3' />
                <div className='xl:w-7/12 lg:w-10/12 lg:mx-auto my-10 xl:mx-auto mx-5'>
                    <img src={layoutGif} className='w-full rounded-md' alt="Matribhumi City" />
                </div>
            </div>

            <div className="container mx-auto mb-24">
                <div className='xl:mx-0 mx-5'>
                    <div className='w-full mb-10'>
                        <h2 className='text-4xl font-bold text-center text-[#134391]'>Property Sizes</h2>
                        <hr className='my-3' />
                    </div>
                    <Grid container spacing={2}>
                        {images.map((image) => (
                            <Grid item xs={12} sm={6} md={4} key={image.id}>
                                <Paper elevation={3}>
                                    <img src={image.src} alt={image.title} className="w-full h-60 object-cover rounded-t-md" />
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-${image.id}`} id={`panel-${image.id}`}>
                                            <Typography variant="h6">{image.title}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className='flex flex-col gap-3 '>
                                                {image.description.map((item, index) => (
                                                    <li className='pl-3'>{item}</li>
                                                ))}
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default Home;