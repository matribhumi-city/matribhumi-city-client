import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import blogBg from '../../assets/blog/blog3.jpg';
import PageParallax from '../../component/pageParallax/pageParallax';
import { Helmet } from 'react-helmet';
import { apiUrl } from '../../ApiServices/constant';
import GridLoader from 'react-spinners/GridLoader';

const BlogCard = ({ _id, image, title, description }) => {
    return (
        <Card sx={{ position: 'relative', maxWidth: 345, minHeight: 445, overflow: 'hidden' }}>
            <CardActionArea component={Link} to={`/blog/${_id}`} sx={{ maxWidth: 345 }}>
                <div
                    style={{
                        height: '240px', // Set the fixed height for the image container
                        overflow: 'hidden',
                    }}
                >
                    <img
                        src={image}
                        alt={title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </div>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description && description?.length > 100 ? `${description?.substring(0, 100)}...` : description}
                        <Link to={`/blog/${_id}`} className='text-primary underline'>
                            Read more
                        </Link>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ position: 'absolute', bottom: 0, right: 0 }}>
                <Button component={Link} to={`/blog/${_id}`} size="medium" color="primary">
                    View Details
                </Button>
            </CardActions>
        </Card>
    );
};

const Blog = () => {
    const [blogData, setBlogData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`${apiUrl}/blogs`)
            .then(res => res.json())
            .then(data => {
                setBlogData(data.data)
                if (data?.success) {
                    setLoading(false);
                } else {
                    setLoading(true);
                }
            })
    }, [])

    return (
        <div className='min-h-screen animate__animated animate__fadeIn'>
            <Helmet>
                <title>Blogs - Matribhumi City</title>
                <meta
                    name="description"
                    content="Explore the latest blog updates and insights from Matribhumi City. Stay informed about our projects, events, and community stories."
                />
            </Helmet>
            <PageParallax bgImage={blogBg} pageTitle={'Blogs'} />
            <div className='container mx-auto py-24'>
                <h2 className='text-4xl font-bold text-white mb-5'>Blog</h2>
                {loading ?
                    <div className="animate__animated animate__heartBeat animate__infinite infinite animate__slower 3s flex justify-center mt-20">
                        <GridLoader
                            color="#134391"
                            loading={loading}
                            size={15}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                    :
                    <div className='animate__animated animate__fadeIn grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-center gap-10 xl:mx-0 mx-5'>
                        {blogData?.map((blogItem) => (
                            <BlogCard key={blogItem?._id} {...blogItem} />
                        ))}
                    </div>}
            </div>
        </div>
    );
};

export default Blog;
