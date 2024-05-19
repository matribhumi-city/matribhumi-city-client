import React from 'react';
import project1 from '../../../assets/MegaProject/project1.jpg';
import project2 from '../../../assets/MegaProject/project2.jpg';
import project3 from '../../../assets/MegaProject/Railway-station.jpg';
import project4 from '../../../assets/MegaProject/project4.jpg';

const steps = [
    {
        label: 'Step 2',
        title: 'Padma Bridge',
        content:
            'The Padma Bridge in Bangladesh, inaugurated on June 25, 2022, connects the less developed southwest to the northern and eastern regions. With two levels, it features a four-lane highway on top and a single-track railway below. The 6.15 km bridge is the longest in Bangladesh and spans the Padma River, setting records as the world deepest bridge with piles reaching 127 meters.Expected to boost GDP by 1.23%, it has generated Tk800 crore in tolls in a year, with over 15,000 daily vehicle crossings.The government aims to enhance connectivity with projects like the Dhaka- Mawa - Bhanga Elevated Expressway.',
        image: project2,
    },
    {
        label: 'Step 4',
        title: 'Bangabandhu International Airport will be next to Padma Bridge',
        content:
            "The Bangabandhu Sheikh Mujib International Airport is no longer just a dream; it's becoming a reality. The airport will be located near the Padma Bridge. On Tuesday, discussions were held between Bismarck Aviation officials and the Ministry of Civil Aviation and Tourism at Kurmitola. Minister Mahbub Ali mentioned that the project, initially started in Munshiganj, faced local opposition. However, a new feasibility study is complete, and the site selection is almost done. The airport will be on the other side of the Padma Bridge. Additionally, work has begun on the third terminal of Hazrat Shahjalal International Airport, development in Cox's Bazar International Airport, and the Megaproject for Sylhet International Airport.",
        image: project4,
    },
    {
        label: 'Step 1',
        title: 'Mawa 300 Feet Highway expressway',
        content:
            "As of my last knowledge update in January 2022, there is no information available on 'Dhaka-Mawa-Banga Expressway.' It's advised to check with local sources for the latest updates on any new infrastructure projects or expressways in the Dhaka-Mawa-Banga region.",
        image: project1,
    },
    {
        label: 'Step 3',
        title: 'Nimtala Railway Station',
        content:
            'Nimtala Railway Station is a railway station located in the Sirajdikhan Upazila of the Munshiganj district in the Dhaka Division of Bangladesh. It is a railway station on the Dhaka-Khulna railway line.',
        image: project3,
    },
];

const LocateArea = () => {
    return (
        <div data-aos="fade" data-aos-duration="2000" className='container mx-auto'>
            <div className='w-9/12 mx-auto text-center'>
                <h2 className='text-4xl font-bold text-[#134391]'>Strategic Location Highlights</h2>
                <hr className='my-3' />
                <p className='mb-20 text-center'>Proximity to key hubs - Roshunia Union, Nimtala bus stand, Padma Bridge, Bangabandhu International Airport, Dhaka-Mawa-Banga Expressway, and Nimtala Railway Station - offers unmatched advantages for business, defense, and geopolitical influence.</p>
            </div>
            <div className='xl:mx-0 mx-5'>
                <div className='grid xl:grid-cols-2 md:grid-cols-2 gap-8 xl:mx-0 mx-5'>
                    {steps.map((step, index) => (
                        <div className='' key={index}>
                            <div className='hoverItem  relative cursor-pointer locateHoverItem'>
                                <img src={step.image} className='w-full h-[400px] object-cover rounded-md border-3' alt="Matribhumi City" />
                                <div className='absolute bottom-0 bg-[#134391] min-w-full bg-opacity-90 py-5 text-white rounded-b-md hoverEffect'>
                                    <h2 className='font-semibold text-lg text-center'>{step.title}</h2>
                                    <p className='text-sm mt-3 text-justify px-8 hoverContent animate__animated animate__fadeInUp'>{step.content && step.content.length > 200 ? `${step.content.substring(0, 200)}...` : step.content}</p>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default LocateArea;