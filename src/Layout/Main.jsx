import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../component/Shared/Navbar";
import Footer from "../component/Shared/Footer";
import background from '../assets/website-background.png'
import { useEffect, useState } from "react";
import GridLoader from "react-spinners/GridLoader";

const Main = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }, [])

    const containerStyle = {
        height: '100%',
        backgroundImage: `url(${background})`, // Replace with the path to your pattern image
        backgroundRepeat: 'repeat', // Set the repeat property as needed
    };

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            {loading ?
                <div className="flex flex-col justify-center items-center h-screen bg-[#134391] text-white">
                    <div className="animate__animated animate__heartBeat  animate__slower 3s">
                        <GridLoader
                            color="white"
                            loading={loading}
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </div>
                :
                <div style={containerStyle}>
                    <Navbar />
                    <Outlet />
                    <Footer />
                </div>
            }
        </>
    );
};

export default Main;