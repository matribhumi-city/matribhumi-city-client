import MatribhumiCityLogo from '../../assets/Matribhumi-Logo.png';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer className="bg-[#134391] text-white">
            <div className="container mx-auto p-4 py-6 lg:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                    {/* Resources */}
                    <div className="col-span-2 mb-8 md:mb-0">
                        <div className="mb-6 md:mb-0">
                            <a href="/" className="flex items-center">
                                <img src={MatribhumiCityLogo} className=" h-8 me-3" alt="alt='Matribhumi City'" />
                            </a>
                        </div>
                        <p className='my-8'>
                            <strong>Matribhumi City</strong> traces its journey as a visionary real estate company, weaving the narrative of reshaping urban living in Bangladesh. Our story unfolds with the inception of our flagship project, <strong>Matribhumi Smart City</strong>, strategically positioned near Nimtola on the <strong>Dhaka-Mawa 300-feet highway</strong> . This milestone development, located just 20 minutes from Motijheel, stands as a testament to our commitment to meticulous planning and excellence in the real estate sector.
                        </p>
                        <ul className=" dark:text-gray-300 font-medium">
                            <li className=" flex gap-2 mb-3">
                                <Icon icon="clarity:building-solid" className='text-3xl' />
                                <a href="https://maps.app.goo.gl/wTyXbYPj2mWdAbHP6" className="hover:underline" target='_blank'><address className='not-italic'>1, 1/1 , Rupayan Taj, (5th Floor), Culvert Road,  Naya Paltan,  Dhaka-1000,  Bangladesh.</address>
                                </a>
                            </li>
                            <li className='flex gap-2 mb-3'>
                                <Icon icon="ic:round-phone" className="text-2xl" />
                                <a href="+880132 473 0515" className="">02 22222 0508, +8801 324 730 515</a>
                            </li>
                            <li className=' flex gap-2'>
                                <Icon icon="ic:round-email" className='text-2xl' />
                                <a href="mailto:info@mdplbd.com">info@matribhumicity.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Follow us */}
                    <div className="lg:col-span-1 col-span-2 md:mb-0">
                        <h2 className="mb-6 text-sm font-bold uppercase dark:text-white">Company</h2>
                        <ul className=" dark:text-gray-300 font-medium">
                            <Link to="about" className="">
                                <li className=' cursor-pointer border-b pt-3 pb-3 px-2 hover:bg-white hover:text-[#134391] transition-all duration-300 rounded-sm'>
                                    About
                                </li>
                            </Link>
                            <Link to="properties" className="">
                                <li className=' cursor-pointer border-b pt-3 pb-3 px-2 hover:bg-white hover:text-[#134391] transition-all duration-300 rounded-sm'>
                                    Properties
                                </li>
                            </Link>
                            <Link to="book-visit" className="">
                                <li className=' cursor-pointer border-b pt-3 pb-3 px-2 hover:bg-white hover:text-[#134391] transition-all duration-300 rounded-sm'>
                                    Book Visit
                                </li>
                            </Link>
                            <Link to="blog" className="">
                                <li className=' cursor-pointer border-b pt-3 pb-3 px-2 hover:bg-white hover:text-[#134391] transition-all duration-300 rounded-sm'>
                                    Blog
                                </li>
                            </Link>
                        </ul>
                    </div>

                    {/* Follow us */}
                    <div className="lg:col-span-1 col-span-2 md:mb-0">
                        <h2 className="mb-6 text-sm font-bold uppercase dark:text-white text-transparent">Important</h2>
                        <ul className=" dark:text-gray-300 font-medium">
                            <Link to="career" className="">
                                <li className=' cursor-pointer border-b pt-3 pb-3 px-2 hover:bg-white hover:text-[#134391] transition-all duration-300 rounded-sm'>
                                    Career
                                </li>
                            </Link>
                            <Link to="team" className="">
                                <li className=' cursor-pointer border-b pt-3 pb-3 px-2 hover:bg-white hover:text-[#134391] transition-all duration-300 rounded-sm'>
                                    Team
                                </li>
                            </Link>
                            <Link to="contact-us" className="">
                                <li className=' cursor-pointer border-b pt-3 pb-3 px-2 hover:bg-white hover:text-[#134391] transition-all duration-300 rounded-sm'>
                                    Contact
                                </li>
                            </Link>
                            <Link to="privacy-policy" className="">
                                <li className=' cursor-pointer border-b pt-3 pb-3 px-2 hover:bg-white hover:text-[#134391] transition-all duration-300 rounded-sm'>
                                    Privacy Policy
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="sm:flex sm:items-center sm:justify-between bg-white">
                <div className='container mx-auto p-4 flex  gap-3 justify-between text-[#2D2769] py-5'>
                    <span className="text-sm sm:text-center ">
                        © 2024 <a href="/" className=""><strong>Matribhumi City™</strong></a>. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5 text-2xl">
                        {/* Social Icons */}
                        <a href="https://www.facebook.com/mdpltd.bd/" className=" hover:text-[#2D2769] transition-all duration-200 dark:hover:text-white" target='_blank'>
                            <Icon icon="ri:facebook-fill" className='text-[#2D2769]' />
                        </a>
                        <a href="https://www.linkedin.com/company/matribhumi-group/" className=" hover:text-[#2D2769] transition-all duration-200 dark:hover:text-white" target='_blank'>
                            <Icon icon="ri:linkedin-fill" className='text-[#2D2769]' />
                        </a>
                        <a href="https://www.youtube.com/@matribhumideveloper5206" className=" hover:text-[#2D2769] transition-all duration-200 dark:hover:text-white" target='_blank'>
                            <Icon icon="bi:youtube" className='text-[#2D2769]' />
                        </a>
                        {/* Add other social icons similarly */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;