import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Helmet } from 'react-helmet';
import { apiUrl } from '../../../ApiServices/constant';

const SingleblogDetails = () => {

    const { id } = useParams();
    const [blogData, setBlogData] = useState([])

    useEffect(() => {
        fetch(`${apiUrl}/blogs`)
            .then(res => res.json())
            .then(data => {
                setBlogData(data.data)
            })
    }, [])
    const singleblog = blogData.find(blogItem => blogItem?._id == id);

    const originalDate = new Date(singleblog?.createdAt);
    const options = { timeZone: "Asia/Dhaka" };

    const recentBlogs = blogData.filter(recentblog => String(recentblog?._id) !== String(id));

    return (
        <div className='min-h-screen animate__animated animate__fadeIn'>
            <Helmet>
                <title>{`${singleblog?.title} - Matribhumi City Blog`}</title>
                <meta
                    name="description"
                    content={singleblog?.description || 'Explore the latest blog details from Matribhumi City. Stay informed about our projects, events, and community stories.'}
                />
            </Helmet>
            <div className="bg-fixed  xl:h-[500px] lg:h-[400px] h-[300px] bg-no-repeat bg-cover blur hover:blur-0 cursor-pointer transition-all duration-300" style={{ backgroundImage: `url(${singleblog?.image})`, backgroundSize: '100% 100%', backgroundPosition: 'bottom' }}>
            </div>
            <div className='container mx-auto mt-10'>
                <h1 className='text-4xl text-center font-bold text-[#134391]'>{singleblog?.headline}</h1>
                <hr className='my-3' />
            </div>
            <div className='w-[80%] min-h-[300px] rounded-t-md mx-auto xl:top-72 lg:top-52 top-52 left-[10%] flex gap-5 py-10'>
                <div className='w-full'>
                    <div>
                        <img
                            src={singleblog?.image}
                            alt={singleblog?.title} // Use a descriptive alt text based on the content of the image
                            className='w-full rounded-md'
                        />
                    </div>
                    <h2 className='text-3xl font-semibold my-5'>{singleblog?.title}</h2>
                    <div className='flex gap-2 items-center mb-5 text-gray-500 '><CalendarMonthRoundedIcon /> <span>{originalDate.toLocaleString("en-US", options)}</span></div>
                    <p className='whitespace-pre-line'>{singleblog?.description}</p>
                    <ul className='pl-10 my-5'>
                        {singleblog?.amenities?.map((amenitie, index) => <li key={index} className='list-disc'>{amenitie}</li>)

                        }
                    </ul>
                </div>
                <div className='w-3/12 flex flex-col gap-5'>
                    {recentBlogs?.reverse()?.slice(0, 3)?.map(recentblog => (
                        <div key={recentblog?._id}>
                            <Card sx={{ position: 'relative', maxWidth: 345, minHeight: 445, overflow: 'hidden' }}>
                                <CardActionArea component={Link} to={`/blog/${recentblog?._id}`} sx={{ maxWidth: 345 }}>
                                    <div
                                        style={{
                                            height: '240px', // Set the fixed height for the image container
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <img
                                            src={recentblog?.image}
                                            alt="Matribhumi City"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {recentblog?.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {recentblog?.description && recentblog?.description?.length > 80 ? `${recentblog?.description?.substring(0, 80)}...` : recentblog?.description}
                                            <Link to={`/blog/${recentblog?._id}`} className='text-primary underline'>
                                                Read more
                                            </Link>
                                        </Typography>

                                    </CardContent>
                                </CardActionArea>
                                <CardActions sx={{ position: 'absolute', bottom: 0, right: 0 }}>
                                    <Button component={Link} to={`/blog/${recentblog?._id}`} size="medium" color="primary">
                                        View Details
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    );
};

export default SingleblogDetails;
