import React from "react";
import { Button, Divider, TextField, TextareaAutosize } from "@mui/material";
import { useForm } from "react-hook-form";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import DescriptionIcon from "@mui/icons-material/Description";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import PageParallax from "../../component/pageParallax/pageParallax";
import { Helmet } from "react-helmet";
import { apiUrl } from "../../ApiServices/constant";
import { Icon } from "@iconify/react";

const Contact = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        fetch(`${apiUrl}/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.success) {
                    notify();
                    reset();
                }
            })
            .catch((error) => console.log(error));
    };

    const notify = () =>
        toast.success("Successfully Submitted", {
            position: "top-center",
        });
    return (
        <div className="min-h-screen bg-gray-100">
            <Helmet>
                <title>Contact Us - Matribhumi City</title>
                <meta
                    name="description"
                    content="Contact us for any queries. Submit your contact information and get in touch with us. Find our office and project locations on Google Maps."
                />
            </Helmet>
            <PageParallax
                bgImage={
                    "https://images.pexels.com/photos/1416530/pexels-photo-1416530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                pageTitle={"Contact Us"}
            />

            <div className="container mx-auto py-12">
                <div className="xl:w-full lg:w-3/4 w-full mx-auto bg-white p-8 rounded-md shadow-md">
                    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <div className="mb-5">
                                <h1 className="text-3xl mb-2 font-bold text-gray-800">
                                    Contact Matribhumi City
                                </h1>
                                {/* <Divider className="my-8 bg-[#5E35B1]" /> */}
                                <p className="text-gray-600">
                                    For any queries, please submit your contact information.
                                </p>
                            </div>
                            <div className="flex items-center mb-4">
                                <Icon icon="ic:round-phone" className="text-xl text-[#134391]" />
                                <p className="ml-2">2 22222 0508, +8801 324 730 515</p>
                            </div>
                            <div className="flex items-center mb-5 ">
                                <Icon icon="ic:round-email" className="text-xl text-[#134391]" />
                                <p className="ml-2">info@matribhumicity.com</p>
                            </div>
                            <hr />
                            <div className="flex gap-5 text-gray-700 mt-5 rounded-sm">
                                <Link
                                    to="https://www.facebook.com/mdpltd.bd/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Icon icon="ri:facebook-fill" className="text-2xl text-[#134391]" />
                                </Link>
                                <Link
                                    to="https://www.linkedin.com/company/matribhumi-group/about/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Icon icon="ri:linkedin-fill" className="text-2xl text-[#134391]" />
                                </Link>
                                <Link
                                    to="https://www.youtube.com/@matribhumideveloper5206"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Icon icon="bi:youtube" className="text-2xl text-[#134391]" />
                                </Link>
                            </div>
                        </div>

                        <div>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-5 text-gray-700"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <TextField
                                        type="name"
                                        {...register("name", { required: true })}
                                        fullWidth
                                        label="Your Name"
                                        id="name"
                                    />
                                    <TextField
                                        type="phone"
                                        {...register("phone", { required: true })}
                                        fullWidth
                                        label="Your Phone"
                                        id="phone"
                                    />
                                </div>

                                <TextField
                                    type="email"
                                    {...register("email", { required: true })}
                                    fullWidth
                                    label="Your Email"
                                    id="email"
                                />
                                <TextareaAutosize
                                    {...register("message", { required: true })}
                                    fullWidth
                                    style={{
                                        width: "100%",
                                        minHeight: "100px",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                        padding: "8px",
                                    }}
                                    placeholder="Type your message…"
                                    error
                                />
                                <div className="flex justify-start">
                                    <Button
                                        type="submit"
                                        style={{
                                            textTransform: "capitalize",
                                            backgroundColor: "#134391" // Set the background color here
                                        }}
                                        variant="contained"
                                        size="large"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <Toaster
                        containerStyle={{
                            top: 100,
                            left: 20,
                            bottom: 20,
                            right: 20,
                        }}
                    />
                </div>
                <hr className="my-10" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:mx-0 mx-5">
                    <div>
                        <strong className="block text-lg font-semibold text-gray-800 mb-2">
                            Head Office:
                        </strong>
                        <div className="flex items-center gap-3">
                            <BusinessIcon />
                            <address className="my-2">
                                1, 1/1 , Rupayan Taj, (5th Floor), Culvert Road, Naya Paltan,
                                Dhaka-1000, Bangladesh.
                            </address>
                        </div>
                        <iframe
                            className="w-full h-[300px] border my-5"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d98265.87868120994!2d90.37718715967051!3d23.753527701427853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9a160822633%3A0xf44c57f094c7a8ab!2sMATRIBHUMI%20DEVELOPER%20%26%20PROPERTIES%20LIMITED!5e0!3m2!1sen!2sbd!4v1702923032472!5m2!1sen!2sbd"
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>
                        <Link to="https://maps.app.goo.gl/W7ZzHXuaYN6xMvb28" target="_blank">
                            <Button
                                style={{
                                    textTransform: "capitalize",
                                    backgroundColor: "#134391" // Set the background color here
                                }}
                                startIcon={<LocationOnIcon />}
                                variant="contained"
                                size="large"
                            >
                                Google Map
                            </Button>
                        </Link>
                    </div>

                    <div>
                        <strong className="block text-lg font-semibold text-gray-800 mb-2">
                            Project Location:
                        </strong>
                        <div className="flex items-center gap-3">
                            <DescriptionIcon />
                            <address className="my-2">
                                Roshunia Union, Nimtola bus stand, Dhaka – Mawa 300 Feet Highway
                                express, Munshigonj.
                            </address>
                        </div>
                        <iframe
                            className="w-full h-[300px] my-5 border"
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7312.5546811923705!2d90.3631569!3d23.5943845!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bd3ea05c93fd%3A0x7e650f22fde20614!2zTWF0cmliaHVtaSBDaXR5ICjgpq7gpr7gpqTgp4Pgpq3gp4Lgpq7gpr8g4Ka44Ka_4Kaf4Ka_KQ!5e0!3m2!1sen!2sbd!4v1702922905970!5m2!1sen!2sbd"
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>
                        <div className="flex justify-end">
                            <Link to="https://maps.app.goo.gl/ru7siTJujNxnh5hw9" target="_blank">
                                <Button
                                    style={{
                                        textTransform: "capitalize",
                                        backgroundColor: "#134391" // Set the background color here
                                    }}
                                    startIcon={<LocationOnIcon />}
                                    variant="contained"
                                    size="large"
                                >
                                    Google Map
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
