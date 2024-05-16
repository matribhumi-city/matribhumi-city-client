import React, { useEffect, useState } from 'react';
import propertybg from '../../assets/Properties/property.jpg'
import PageParallax from '../../component/pageParallax/pageParallax';
import { Box, useTheme } from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { apiUrl } from '../../ApiServices/constant';
import GridLoader from 'react-spinners/GridLoader';

const Properties = () => {
    const tabData = [
        { label: 'Available', content: 'Content for Tab 1' },
        { label: 'Sold Out', content: 'Content for Tab 2' },
        { label: 'Upcoming', content: 'Content for Tab 3' },
    ];

    const location = useLocation();
    const theme = useTheme();

    const [value, setValue] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const [status, setStatus] = useState('available');
    const [loading, setLoading] = useState(false);

    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [plots, setPlots] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch(`${apiUrl}/properties`)
            .then((res) => res.json())
            .then((data) => {
                setPlots(data?.data);
                if (data?.success) {
                    setLoading(false);
                } else {
                    setLoading(true);
                }
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        const searchResultsParam = new URLSearchParams(location.search).get('searchResults');
        setSearchResults(JSON.parse(searchResultsParam) || []);
    }, [location.search]);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            handleSearch();
        }, 500);

        return () => clearTimeout(debounceTimeout);
    }, [debouncedSearch]);

    const handleChangeOption = (tabIndex, optionType, optionValue) => {
        setSelectedOptions((prevState) => ({
            ...prevState,
            [tabIndex]: {
                ...prevState[tabIndex],
                [optionType]: optionValue,
            },
        }));
        setDebouncedSearch(optionValue);
    };

    const handleSearch = () => {
        const selectedOptionsForSearch = selectedOptions[value];

        if (status) {
            setLoading(true);

            const filteredResults = plots.filter((plot) => {
                return (
                    (!selectedOptionsForSearch?.propertyType || plot?.propertyType == selectedOptionsForSearch?.propertyType) &&
                    (!selectedOptionsForSearch?.location || plot?.location == selectedOptionsForSearch?.location) &&
                    (!selectedOptionsForSearch?.sector || plot?.sector == selectedOptionsForSearch?.sector) &&
                    (!selectedOptionsForSearch?.block || plot?.block == selectedOptionsForSearch?.block) &&
                    (!selectedOptionsForSearch?.face || plot?.propertyFace == selectedOptionsForSearch?.face) &&
                    (!selectedOptionsForSearch?.road || plot?.road == selectedOptionsForSearch?.road) &&
                    (!selectedOptionsForSearch?.status || plot?.status?.toLowerCase() == selectedOptionsForSearch?.status)
                );
            });

            setSearchResults(filteredResults);
            setLoading(false);
        } else {
            setSearchResults([]);
        }
    };

    const optionsData = {
        propertyType: [...new Set(plots?.map(plot => plot?.propertyType))],
        location: [...new Set(plots?.map(plot => plot?.location))],
        sector: [...new Set(plots?.map(plot => plot?.sector))],
        block: [...new Set(plots?.map(plot => plot?.block))],
        face: [...new Set(plots?.map(plot => plot?.propertyFace))],
        road: [...new Set(plots?.map(plot => plot?.road))],
        status: [...new Set(plots?.map(plot => plot?.status))],
    };

    const [propertiesPerPage, setPropertiesPerPage] = useState(6);
    const [visibleResults, setVisibleResults] = useState(propertiesPerPage);

    const handleLoadMore = () => {
        setVisibleResults(visibleResults + propertiesPerPage);
    };

    const activeBackgroundColor = 'white';

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className='min-h-screen animate__animated animate__fadeIn'>
            <Helmet>
                <title>Properties - Matribhumi City</title>
                <meta
                    name="description"
                    content="Explore available plots and properties at Matribhumi City. Choose from residential and commercial options in Nimtola, Rousonia, Dhaka, and more. Find your dream property today!"
                />
            </Helmet>
            <PageParallax bgImage={propertybg} pageTitle={'Properties'} />

            <div className='container mx-auto my-24'>

                <div className='w-full'>
                    <h2 className='text-4xl font-bold text-center text-[#134391] mb-5'>Search By Properties
                    </h2>
                </div>

                <Box p={3} style={{ borderTop: `1px solid ${theme.palette.divider}`, width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: activeBackgroundColor, margin: 0, borderRadius: '5px' }}>
                    {tabData.map((tab, tabIndex) => (
                        <form key={tabIndex} className='items-center lg:grid-cols-7 md:grid-cols-4 grid-cols-3' style={{ display: value === tabIndex ? 'grid' : 'none', backgroundColor: activeBackgroundColor }}>
                            {Object.keys(optionsData)?.map((optionType, optionIndex) => (
                                <div key={optionIndex} className="m-1 transition-all duration-300 ease-in-out">
                                    <select
                                        id={`select-${optionType}`}
                                        value={selectedOptions[value]?.[optionType] || ''}
                                        onChange={(event) => {
                                            handleChangeOption(value, optionType, event.target.value);
                                            handleSearch();
                                        }}
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="" disabled>
                                            Select {optionType?.charAt(0)?.toUpperCase() + optionType?.slice(1)}
                                        </option>
                                        {optionsData[optionType]?.map((option, optionIndex) => (
                                            <option key={optionIndex} value={option}>
                                                {capitalize(option)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </form>
                    ))}
                </Box>

                {loading ?
                    <div className="animate__animated animate__heartBeat animate__infinite infinite  animate__slower 3s flex justify-center mt-20">
                        <GridLoader
                            color="#134391"
                            loading={loading}
                            size={15}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                    :
                    <div className='flex lg:flex-row flex-col gap-10 xl:mx-0 mx-5 animate__animated animate__fadeIn'>
                        <div className='w-full grid lg:grid-cols-2 gap-5'>
                            {(searchResults?.slice(0, visibleResults)?.length > 0 ? searchResults : plots)?.slice(0, visibleResults)?.map((item) => (

                                <Link key={item?._id} to={`/plot/${item?._id}`} className="flex xl:flex-row bg-white border border-gray-200 rounded-md xl:h-[230px] shadow md:flex-row flex-col md:max-w-full hover:bg-gray-100">
                                    <div className='w-full'>
                                        <img className="object-cover w-full rounded-t-md h-full  md:rounded-none md:rounded-s-md" src={item?.propertyImage?.mainImage} alt="Matribhumi City" />
                                    </div>
                                    <div className="w-full p-4 flex items-center">
                                        <div>
                                            <span className={`text-sm text-[10px] ${item?.status == 'sold-out' ? 'bg-red-600 text-white' : 'bg-white'} mr-2 border text-gray-500 p-1 rounded-sm capitalize`}>{item?.status}</span>
                                            <Link to={`/plot/${item?._id}`} className="my-3 text-xl block font-semibold tracking-tight ">{item?.propertyTitle}</Link>
                                            <p className="font-normal text-gray-500">{item?.description && item?.description?.length > 80 ? `${item?.description?.substring(0, 80)}...` : item?.description}</p>
                                            <hr className='my-5' />
                                            <div className='flex gap-5 justify-end items-center mt-3'>
                                                <Link to={`/plot/${item?._id}`} alt="Matribhumi City" className='btn border px-5 py-2 rounded-sm border-[#134391] text-[#134391]'>View Details</Link>

                                                <Link to={`/plot/${item?._id}`} alt="Matribhumi City" className='btn border px-5 py-2 rounded-sm bg-[#134391] text-white'>Book Plot</Link>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                }
                <div className='flex justify-center'>
                    {(visibleResults > searchResults?.length && plots?.length > visibleResults) ? (
                        <div className="text-center mt-20">
                            <button
                                onClick={handleLoadMore}
                                className="hover:bg-white bg-[#134391] font-semibold text-white transition-all duration-300 hover:text-[#134391] hover:border-[#134391] py-3 px-4 border border-transparent rounded"
                            >
                                Load More
                            </button>
                        </div>
                    ) : <></>}
                </div>
            </div>
        </div>
    );
};

export default Properties;