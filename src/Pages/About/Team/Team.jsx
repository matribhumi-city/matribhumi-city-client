import React, { useEffect, useState } from 'react';
import team from '../../../assets/PageCover/team.jpg';
import PageParallax from '../../../component/pageParallax/pageParallax';
import { Helmet } from 'react-helmet';
import { apiUrl } from '../../../ApiServices/constant';

const Team = () => {
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch(`${apiUrl}/teams`);
                const data = await response.json();
                setTeamMembers(data.data);
            } catch (error) {
                console.error('Error while fetching teams:', error);
            }
        };
        fetchTeams();
    }, []);

    return (
        <div className='min-h-screen animate__animated animate__fadeIn'>
            <Helmet>
                <title>Our Team - Matribhumi City</title>
                <meta name="description" content="Meet the dedicated members of Matribhumi City's team, including our Chairman, Managing Director, and Human Resources personnel." />
            </Helmet>
            <PageParallax bgImage={team} pageTitle={'Our Team'} />
            <div className="container mx-auto py-24">
                <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-8 xl:mx-0 mx-5'>
                    {teamMembers?.map((member) => (
                        <div key={member.id} className='text-center'>
                            <img src={member?.image} className='rounded-md w-full' alt={`Photo of ${member?.name}`} />
                            <h2 className='xl:text-2xl lg:text-xl font-semibold mt-3'>{member?.name}</h2>
                            <hr className='my-1' />
                            <h3 className='text-sm text-gray-500'>{member?.role}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Team;
