import { TextField, TextareaAutosize } from "@mui/material";
import { useForm } from "react-hook-form";
import careerBg from '../../assets/PageCover/career.jpg';
import toast, { Toaster } from 'react-hot-toast';
import PageParallax from "../../component/pageParallax/pageParallax";
import { Helmet } from "react-helmet";
import { apiUrl } from "../../ApiServices/constant";

const Career = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        fetch(`${apiUrl}/career`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    notify();
                    reset();
                }
            })
            .catch((error) => console.log(error));
    };

    const notify = () =>
        toast.success('Successfully Submited', {
            position: 'top-center',
        });

    return (
        <div className='min-h-screen animate__animated animate__fadeIn'>
            <Helmet>
                <title>Career Opportunities - Matribhumi City</title>
                <meta
                    name="description"
                    content="Explore career opportunities at Matribhumi City. Elevate your career by filling out our online application form and submitting your CV to embark on a rewarding journey with us."
                />
            </Helmet>
            <PageParallax bgImage={careerBg} pageTitle={'Career'} />

            <div className="container mx-auto py-24">
                <div className="xl:mx-0 mx-5">
                    <div className='w-full mb-10'>
                        <h2 className='text-4xl font-bold text-left text-[#134391]'>Career</h2>
                        <hr className='my-3' />
                        <p className="text-left">Elevate your career by filling out our online application form and submitting your 'Resume drive link' to embark on a rewarding journey with us.</p>
                    </div>
                    <div className="w-full">

                        <div className="mt-10">

                        </div>
                    </div>
                    <div className="w-full">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div className="flex lg:flex-row flex-col gap-5">
                                <TextField type="name" {...register("name", { required: true })} fullWidth label="Name" id="name" />
                                <TextField type="position" {...register("position", { required: true })} fullWidth label="Apply Position" id="position" />
                                <TextField type="phone" {...register("phone", { required: true })} fullWidth label="Phone" id="phone" />
                            </div>
                            <TextField type="email" {...register("email", { required: true })} fullWidth label="Email" id="email" />
                            <TextField type="cv" {...register("cv", { required: true })} fullWidth label="CV or Resume Google Drive Link" id="cv" />
                            <TextareaAutosize
                                {...register("message", { required: true })} fullWidth
                                style={{ width: '100%', minHeight: '100px', border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}
                                placeholder="Your Massage"
                                error
                            />
                            {errors.cv && <p className="text-red-500">Please upload your CV</p>}
                            <div className="flex justify-left"> {/* Add this container for right alignment */}
                                <input type="submit" className="hover:bg-white bg-[#134391] font-semibold text-white transition-all duration-300 hover:text-[#134391] hover:border-[#134391] py-3 px-8 border border-transparent rounded cursor-pointer" />
                            </div>
                        </form>
                    </div>
                    <Toaster containerStyle={{
                        top: 100,
                        left: 20,
                        bottom: 20,
                        right: 20,
                    }} />
                </div>
            </div>
        </div>
    );
};

export default Career;