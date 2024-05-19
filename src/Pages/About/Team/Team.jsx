import React, { useEffect, useState } from 'react';
import team from '../../../assets/PageCover/team.jpg';
import PageParallax from '../../../component/pageParallax/pageParallax';
import { Helmet } from 'react-helmet';
import { apiUrl } from '../../../ApiServices/constant';

const teamMembers = [
    {
      "_id": "66464dabefdda27b900d7fd5",
      "name": "S.M Akkas Ali",
      "role": "Chairman",
      "image": "https://res.cloudinary.com/dtseduqga/image/upload/v1715883436/j5tbc76zv8e6msei8hef.jpg",
      "createdAt": "2024-05-16T18:17:15.565Z",
      "updatedAt": "2024-05-16T18:17:15.565Z",
      "__v": 0
    },
    {
      "_id": "66464dc5efdda27b900d7fd7",
      "name": "A.B.M. Hanif Master",
      "role": "Vice-Chairman",
      "image": "https://res.cloudinary.com/dtseduqga/image/upload/v1715883462/djdzu7rrk9qznxvhbzkt.jpg",
      "createdAt": "2024-05-16T18:17:41.882Z",
      "updatedAt": "2024-05-16T18:17:41.882Z",
      "__v": 0
    },
    {
      "_id": "66464e02efdda27b900d7fdc",
      "name": "Engr.Md Mineuddin Miah",
      "role": "Managing Director",
      "image": "https://res.cloudinary.com/dtseduqga/image/upload/v1715883523/jyg3buugdkbka2snqvly.jpg",
      "createdAt": "2024-05-16T18:18:42.468Z",
      "updatedAt": "2024-05-16T18:18:42.468Z",
      "__v": 0
    },
    {
      "_id": "66464e18efdda27b900d7fde",
      "name": "Md. Feroz Alam",
      "role": "Director Finance",
      "image": "https://res.cloudinary.com/dtseduqga/image/upload/v1715883545/wbtzkymi3fdbrdr88f0z.jpg",
      "createdAt": "2024-05-16T18:19:04.556Z",
      "updatedAt": "2024-05-16T18:19:04.556Z",
      "__v": 0
    },
    {
      "_id": "66464e2cefdda27b900d7fe0",
      "name": "Shela Mohsin",
      "role": "Director HR & Admin",
      "image": "https://res.cloudinary.com/dtseduqga/image/upload/v1715883565/e2spp45liffdalc9bvcf.jpg",
      "createdAt": "2024-05-16T18:19:24.946Z",
      "updatedAt": "2024-05-16T18:19:24.946Z",
      "__v": 0
    },
    {
      "_id": "66464e53efdda27b900d7fe8",
      "name": "Mohiuddin Mia",
      "role": "Director Purchase",
      "image": "https://res.cloudinary.com/dtseduqga/image/upload/v1715883604/pr6neoy7chixdge10dyo.jpg",
      "createdAt": "2024-05-16T18:20:03.341Z",
      "updatedAt": "2024-05-16T18:20:03.341Z",
      "__v": 0
    },
    {
      "_id": "66464e7defdda27b900d7ff1",
      "name": "Muhammad Jahirul Islam",
      "role": "Director Marketing & Sales",
      "image": "https://res.cloudinary.com/dtseduqga/image/upload/v1715883646/mvidlic6zgi0jspqsgej.jpg",
      "createdAt": "2024-05-16T18:20:45.169Z",
      "updatedAt": "2024-05-16T18:20:45.169Z",
      "__v": 0
    }
  ]

const Team = () => {
    // const [teamMembers, setTeamMembers] = useState([]);

    // useEffect(() => {
    //     const fetchTeams = async () => {
    //         try {
    //             const response = await fetch(`${apiUrl}/teams`);
    //             const data = await response.json();
    //             setTeamMembers(data.data);
    //         } catch (error) {
    //             console.error('Error while fetching teams:', error);
    //         }
    //     };
    //     fetchTeams();
    // }, []);

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
                        <div key={member._id} className='text-center'>
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
