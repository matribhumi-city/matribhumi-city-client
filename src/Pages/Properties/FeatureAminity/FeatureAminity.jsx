import React from 'react';
import PageParallax from '../../../component/pageParallax/pageParallax';
import { Divider, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Helmet } from 'react-helmet';
import { featureData } from '../../../../public/data/feature';

const FeatureAminity = () => {
    // Feature data
    const features = featureData;

    // tabs 
    const [value, setValue] = React.useState('commercial');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='min-h-screen animate__animated animate__fadeIn mb-20'>
            <Helmet>
                <title>Feature & Aminity - Matribhumi City</title>
                <meta
                    name="description"
                    content="Explore commercial and residential features and amenities at Matribhumi City. Discover educational, healthcare, shopping, and recreational facilities for a modern lifestyle."
                />
            </Helmet>
            <PageParallax pageTitle={'Feature & Aminity'} bgImage={features[value]?.bgImage} />
            <div className='container mx-auto'>
                {/* Feature & Aminity */}
                <div className='container mx-auto py-2s'>
                    <div className='my-10'>
                        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            <Tabs value={value} onChange={handleChange} centered>
                                <Tab value="commercial" label="Commercial" />
                                <Tab value="residential" label="Residential" />
                            </Tabs>
                            <hr />
                        </Box>
                    </div>

                    <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-center items-center gap-5 xl:mx-0 mx-5 '>
                        {features[value]?.map((feature, index) => (
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
        </div>
    );
};

export default FeatureAminity;
