import React, { useState, useEffect } from 'react';
import { Link, Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, useScrollTrigger } from '@mui/material';
import MatribhumiCityLogo from '../../assets/Matribhumi-Logo.png';
import Banner from '../../Pages/Home/Banner/Banner';
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Icon } from '@iconify/react';

const drawerWidth = 240;
const navItems = [
    { label: 'Home', link: '/' },
    {
        label: 'About',
        link: '/about',
        dropdownItems: [
            { label: 'Our Story', link: '/our-Story' },
            { label: 'Mission & Vission', link: '/mission-vission' },
            { label: 'Our Achievement', link: '/our-achievement' },
            { label: 'Sister Concerns', link: '/concerns' },
            { label: 'Team', link: '/team' },
        ],
    },
    {
        label: 'Properties', link: '/properties',
        dropdownItems: [
            { label: 'Project Layout & Location', link: '/porject-layout' },
            { label: 'Feature & Amenity', link: '/feature-aminity' },
        ],
    },
    // { label: 'Blog', link: '/blog' },
    { label: 'Career', link: '/career' },
    { label: 'Contact Us', link: '/contact-us' },
];

const DrawerAppBar = ({ window }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);
    const handleItemHover = (label) => {
        setOpenDropdown(label);
    };
    const handleItemLeave = () => {
        setOpenDropdown(null);
    };
    const handleItemClick = (item) => {
        if (!item.dropdownItems) {
            // Redirect to the route if no dropdown items are available
            handleDrawerToggle();
        }
    };

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    const ElevationScroll = ({ children }) => {
        const location = useLocation();
        const shouldRenderVideoBanner = location.pathname === '/';

        let threshold = shouldRenderVideoBanner ? 100 : 0;

        const trigger = useScrollTrigger({
            disableHysteresis: true,
            threshold: threshold,
        });

        let backgroundColor = shouldRenderVideoBanner ? (trigger ? '#134391' : 'transparent') : '#134391';

        return React.cloneElement(children, {
            sx: {
                backgroundColor: backgroundColor,
                transition: trigger ? 'none' : 'background-color 0.3s',
                opacity: trigger ? 1 : 10,
            },
        });
    };

    const toggleDropdown = (label) => {
        setDropdownOpen((prev) => (prev === label ? null : label));
    };

    const handleAccordionChange = (itemLabel) => {
        setOpenDropdown((prevOpenDropdown) =>
            prevOpenDropdown === itemLabel ? null : itemLabel
        );
    };

    AOS.init();

    const [showContent, setShowContent] = useState(true);

    // Update the controlNavbar function
    const controlNavbar = () => {
        if (window.scrollY > 100) {
            setShowContent(true); // Hide the content
        } else {
            setShowContent(false); // Show the content
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [showContent]);

    return (
        <div>
            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <Banner />
                <CssBaseline />
                <ElevationScroll>
                    <AppBar component="nav" sx={{ zIndex: 50, backgroundColor: 'transparent' }} className='lg:px-0 px-5'>
                        {/* topnav */}
                        <div className={`container mx-auto py-2 topnav ${showContent ? 'block' : 'hidden'}`}>
                            <div className='flex md:flex-row flex-col gap-2 md:justify-between justify-center md:items-baseline items-center xl:mx-0 lg:mx-5'>
                                <div className='md:block hidden'>
                                    <div className='flex'>
                                        <a href="mailto:info@mdplbd.com" className=' pr-4 items-center flex gap-2 hover:scale-105 transition-all duration-300' target='_blank'><Icon icon="material-symbols:mail-outline" className='text-xl hover:scale-105 transition-all duration-300' />info@matribhumicity.com</a>
                                        |
                                        <a href='https://wa.me/+8801324730515' className='flex gap-2 pl-3 items-center hover:scale-110 transition-all duration-300' target='_blank'><Icon icon="ic:baseline-whatsapp" className='text-xl' /><span>+880132 473 0515</span></a>
                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <a href="https://www.facebook.com/mdpltd.bd/" className='border-r pr-4 items-center' target='_blank'><Icon icon="ri:facebook-fill" className='text-xl hover:scale-110 transition-all duration-300' /></a>
                                    <a href="https://www.linkedin.com/company/matribhumi-group/" className='border-r pr-4 pl-4 items-center' target='_blank'><Icon icon="ri:linkedin-fill" className='text-xl hover:scale-110 transition-all duration-300' /></a>
                                    <a href="https://www.youtube.com/@matribhumideveloper5206" className='border-r pr-4 pl-4 items-center' target='_blank'><Icon icon="mdi:youtube" className='text-xl hover:scale-110 transition-all duration-300' /></a>
                                    <a href="/login" className='pl-4' >Login</a>
                                </div>
                            </div>
                        </div>
                        <hr className='opacity-30' />
                        <Toolbar style={{ paddingLeft: 0, paddingRight: 0 }} className='container mx-auto' >
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1 }}
                            >
                                <Link>
                                    <img src={MatribhumiCityLogo} className='xl:w-3/12 lg:w-2/12 md:w-2/12 w-2/6 xl:mx-0 lg:mx-5' alt="alt='Matribhumi City'" />
                                </Link>
                            </Typography>
                            {/* Desktop navigation */}
                            <Box sx={{ flexGrow: 0, display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }, justifyContent: 'center', alignItems: 'center' }}>
                                {navItems.map((item, index) => (
                                    <div key={index} style={{ display: 'inline-block', position: 'relative', margin: '0 15px' }}>
                                        <Button
                                            component={RouterLink}
                                            to={item.link}
                                            sx={{ color: '#fff', textTransform: 'capitalize' }}
                                            className='hover:text-slate-300 transition-all duration-300'
                                            // Add onMouseEnter and onMouseLeave events to handle dropdown visibility
                                            onMouseEnter={() => handleItemHover(item.label)}
                                            onMouseLeave={handleItemLeave}
                                        >
                                            {item.label}
                                        </Button>
                                        {item.dropdownItems && openDropdown === item.label && (
                                            <List
                                                className='animate__animated animate__fadeIn relative'
                                                sx={{
                                                    position: 'absolute',
                                                    zIndex: 1000,
                                                    backgroundColor: '#fff',
                                                    border: '1px solid #ccc',
                                                    padding: '5px',
                                                    margin: '0',
                                                    borderRadius: '5px',
                                                    display: openDropdown === item.label ? 'inline-block' : 'none',
                                                    marginTop: '8px',
                                                    marginLeft: '-150px',
                                                    top: '30px',
                                                    color: '#2F296F',
                                                    width: 300,
                                                    opacity: 1, // Initial opacity
                                                    transition: 'opacity 0.3s', // Transition on opacity
                                                }}
                                                // Add onMouseEnter and onMouseLeave events to handle dropdown visibility
                                                onMouseEnter={() => handleItemHover(item.label)}
                                                onMouseLeave={handleItemLeave}
                                            >
                                                <div className='absolute -top-4 left-28'><ArrowDropUpIcon fontSize='medium' sx={{ color: 'white' }} /></div>
                                                {item.dropdownItems.map((dropdownItem) => (
                                                    <ListItem className='animate__animated animate__fadeInUp' key={dropdownItem.label} disablePadding>
                                                        <ListItemButton
                                                            component={RouterLink}
                                                            to={dropdownItem.link}
                                                            sx={{ textAlign: 'left' }}
                                                        >
                                                            <ListItemText primary={dropdownItem.label} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        )}
                                    </div>
                                ))}
                                <Link to={'/book-visit'} className="bg-transparent hover:bg-[#134391] bg-white font-semibold text-[#134391] transition-all duration-300 hover:text-white hover:border-white py-2 px-4 ml-5 border border-transparent hover:border-transparent rounded animate__animated animate__pulse animate__infinite	infinite">
                                    Book Visit
                                </Link>
                            </Box>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="end"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, display: { xs: 'block', sm: 'block', md: 'block', lg: 'none', xl: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </ElevationScroll>
                <Toolbar />

                {/* mobile nav  */}
                <nav>
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: '80vw',
                                backgroundColor: '#134391',
                                color: '#fff',
                            },
                        }}
                    >
                        <Box p={2}>
                            <List>
                                {navItems.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <ListItem disablePadding>
                                            {item.dropdownItems ? (
                                                <Accordion
                                                    sx={{
                                                        backgroundColor: 'transparent',
                                                        border: 'white',
                                                        color: 'white',
                                                        boxShadow: 'none',
                                                    }}
                                                    expanded={openDropdown === item.label}
                                                    onChange={() => handleAccordionChange(item.label)}
                                                >
                                                    <AccordionSummary

                                                        expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                                                        aria-controls={`${item.label}-content`}
                                                        id={`${item.label}-header`}
                                                        sx={{
                                                            backgroundColor: 'transparent',
                                                            '& .MuiAccordionSummary-root': {
                                                                color: 'white', // Set text color to white
                                                            },
                                                        }}
                                                    >
                                                        <Typography sx={{ textAlign: 'left' }}>
                                                            <Link to={item.link}>{item.label}</Link>
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails >
                                                        <List>
                                                            {item.dropdownItems.map((dropdownItem) => (
                                                                <ListItem key={dropdownItem.label} disablePadding>
                                                                    <ListItemButton
                                                                        component={RouterLink}
                                                                        to={dropdownItem.link}
                                                                        sx={{ textAlign: 'left', color: 'white' }}
                                                                    >
                                                                        <ListItemText primary={dropdownItem.label} />
                                                                    </ListItemButton>
                                                                </ListItem>
                                                            ))}
                                                        </List>
                                                    </AccordionDetails>
                                                </Accordion>
                                            ) : (
                                                <ListItemButton
                                                    onMouseEnter={() => handleItemHover(item.label)}
                                                    onMouseUp={handleItemLeave}
                                                    onClick={() => handleItemClick(item)}
                                                    component={RouterLink}
                                                    to={item.link}
                                                    sx={{ textAlign: 'left', color: 'inherit' }}
                                                >
                                                    <ListItemText primary={item.label} />
                                                    {item.dropdownItems && <ArrowDropDownIcon />}
                                                </ListItemButton>
                                            )}
                                        </ListItem>
                                    </React.Fragment>
                                ))}
                            </List>
                        </Box>
                    </Drawer>
                </nav>
            </Box>
        </div>
    );
};

DrawerAppBar.propTypes = {
    window: PropTypes.func,
};

export default DrawerAppBar;
