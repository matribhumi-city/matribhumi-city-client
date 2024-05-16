import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MatribhumiCityVideo from '../../../assets/Videos/Matribhumi-City-Banner-Video.mp4';
import { Link, useLocation } from 'react-router-dom';
import { Tabs, Tab, Box, useTheme } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { apiUrl } from '../../../ApiServices/constant';


const tabData = [
    { label: 'Search Property', content: 'Content for Tab 1', status: 'available' },
    { label: 'Properties', content: 'Content for Tab 1', status: 'available' },
];

const propertyTypeOptions = ['Residential Zone', 'Commercial Zone', 'Atlantic zone', 'Southern zone', 'Pacific zone', 'VIP Plot', 'Leck View Plot'];
const locationOptions = ['Nimtala'];
const sectorOptions = ['1', '2', '3'];
const blockOptions = ['Block A - Kingdom', 'Block B - Oakland', 'Block C - Empire', 'Block D - Dynasty', 'Block A - Maple', 'Block B - M Valley', 'Block D - M Valley', 'Block C - Legacy', 'Block A - Pavilion', 'Block B - Horizon', 'Block C - Francisco', 'Block D - Mermaid', 'Aristocrat', 'Orchard', 'Beach Front'];
const propertyFaceOptions = ['North', 'South', 'East', 'West'];
const roadOptions = Array.from({ length: 100 }, (_, i) => (i + 1).toString());

const Banner = () => {
    const location = useLocation();
    const shouldRenderVideoBanner = location.pathname === '/';

    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const [plots, setPlots] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/properties`)
            .then((res) => res.json())
            .then((data) => {
                setPlots(data.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeOption = (tabIndex, optionType, optionValue) => {
        setSelectedOptions((prevState) => ({
            ...prevState,
            [tabIndex]: {
                ...prevState[tabIndex],
                [optionType]: optionValue,
            },
        }));
    };

    const handleSearch = () => {
        const selectedOptionsForSearch = selectedOptions[value];
        const propertyStatus = tabData[value].status;

        const filteredResults = plots.filter((plot) => {
            return (
                (!selectedOptionsForSearch.propertyType || plot.propertyType !== selectedOptionsForSearch.propertyType) &&
                (!selectedOptionsForSearch.location || plot.location !== selectedOptionsForSearch.location) &&
                (!selectedOptionsForSearch.sector || plot.sector !== selectedOptionsForSearch.sector) &&
                (!selectedOptionsForSearch.block || plot.block !== selectedOptionsForSearch.block) &&
                (!selectedOptionsForSearch.face || plot.propertyFace !== selectedOptionsForSearch.face) &&
                (!selectedOptionsForSearch.road || plot.road !== selectedOptionsForSearch.road) &&
                (!selectedOptionsForSearch.status || plot.status.toLowerCase() !== selectedOptionsForSearch.status)
            );
        });

        setSearchResults(filteredResults);

        const queryParams = new URLSearchParams();
        queryParams.append('propertyType', selectedOptions.propertyType || '');
        queryParams.append('location', selectedOptions.location || '');
        queryParams.append('sector', selectedOptions.sector || '');
        queryParams.append('block', selectedOptions.block || '');
        queryParams.append('face', selectedOptions.face || '');
        queryParams.append('road', selectedOptions.road || '');

        window.location.href = `/properties?${queryParams.toString()}`;
    };

    return (
        <>
            {shouldRenderVideoBanner ? (
                <div className='min-h-[700px] animate__animated animate__fadeIn relative -z-0'>
                    {/* Background Video */}
                    <video
                        autoPlay
                        loop
                        muted
                        className='w-full md:h-full h-full absolute top-0 left-0 object-cover z-10'
                    >
                        <source src={MatribhumiCityVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Overlay */}
                    <div
                        className='bg-[#053a63] bg-opacity-80 text-left p-5 w-full md:h-full h-full absolute top-0 left-0 object-cover z-50 flex flex-col md:items-start md:justify-center md:mt-0 pt-32'
                        style={{
                            boxSizing: 'border-box',
                        }}
                    >
                        {/* Overlay Text Content */}
                        <div className='text-white container mx-auto flex justify-center text-center items-center'>
                            <div className='lg:w-[60%] lg:mt-0 mt-5 animate__animated animate__fadeInDown'>
                                <h1
                                    className='lg:text-5xl text-3xl mb-5 font-semibold'
                                >
                                    Find Your Dream Plot
                                </h1>
                                <p className='text-base mb-12 leading-relaxed'>Matribhumi City: Your Dream Home Awaits! Explore urban sophistication and natural beauty just 30 minutes from Motijheel. Schedule a project inspection now for a glimpse into extraordinary living.</p>
                                <Link to={'/book-visit'} className=' bg-transparent transition-all duration-300 text-lg px-10 py-3 rounded-[3px] border border-white hover:border-white hover:border-transparent hover:bg-[#134391] hover:text-white btn font-medium xl:hidden' >
                                    Book Visit
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Categories plot */}
                    <div className="md:w-fit w-10/12 mx-auto absolute xl:-bottom-8 lg:-bottom-24 md:-bottom-36 -bottom-32 left-0 right-0 z-50 drop-shadow-md">
                        {/* Tabs and search bar */}
                        <div className='rounded-sm flex flex-col items-center overflow-auto'>
                            <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="white">
                                {tabData.map((tab, index) => (
                                    <Tab
                                        key={index}
                                        label={tab.label}
                                        style={{
                                            transition: 'background-color 0.5s, color 0.5s',
                                            borderTopLeftRadius: '10px',
                                            borderTopRightRadius: '10px',
                                            marginLeft: '4px',
                                            textTransform: 'capitalize',
                                            backgroundColor: value === index ? 'white' : '#134391',
                                            color: value === index ? '#134391' : 'white',
                                        }}
                                    />
                                ))}
                            </Tabs>
                            <Box p={3} style={{ borderTop: `1px solid ${theme.palette.divider}`, width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: 'white', margin: 0, borderRadius: '5px' }}>
                                {tabData.map((tab, tabIndex) => (
                                    <form key={tabIndex} className='items-center xl:grid-cols-7 lg:grid-cols-4 md:grid-cols-3 grid-cols-2' style={{ display: value === tabIndex ? 'grid' : 'none', backgroundColor: 'white', height: 'fit-content' }}>
                                        {[
                                            { label: 'Property Type', options: propertyTypeOptions },
                                            { label: 'Property Location', options: locationOptions },
                                            { label: 'Sector', options: sectorOptions },
                                            { label: 'Block', options: blockOptions },
                                            { label: 'Property Face', options: propertyFaceOptions },
                                            { label: 'Road', options: roadOptions },
                                        ].map((optionData, optionIndex) => (
                                            <div key={optionIndex} style={{ margin: '8px', flex: '1' }}>
                                                <Select
                                                    displayEmpty
                                                    value={selectedOptions[value]?.[optionData.label.toLowerCase().replace(/\s+/g, '-')]}
                                                    onChange={(event) => handleChangeOption(value, optionData.label.toLowerCase().replace(/\s+/g, '-'), event.target.value)}
                                                    style={{ width: '100%', boxSizing: 'border-box', borderRadius: '5px', height: '100%' }}
                                                    renderValue={(selected) => selected || `Select ${optionData.label}`}
                                                >
                                                    <MenuItem value="" disabled>
                                                        Select {optionData.label}
                                                    </MenuItem>
                                                    {optionData.options.map((option, optionIndex) => (
                                                        <MenuItem key={optionIndex} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </div>
                                        ))}
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: '#134391', color: 'white', cursor: 'pointer', margin: '8px', padding: '10px 20px', borderRadius: '5px', height: '55px' }}
                                            onClick={handleSearch}
                                        >
                                            Search
                                        </Button>
                                    </form>
                                ))}
                            </Box>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default Banner;
