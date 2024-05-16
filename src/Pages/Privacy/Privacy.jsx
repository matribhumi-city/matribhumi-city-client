import React from 'react';
import { Helmet } from 'react-helmet';
import PageParallax from '../../component/pageParallax/pageParallax';
const terms = 'https://images.unsplash.com/photo-1586281380426-f644f2dc6ada?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

const Privacy = () => {
    return (
        <div className='min-h-screen animate__animated animate__fadeIn'>
            <Helmet>
                <title>Privacy policy - Matribhumi City</title>
                <meta name="description" content="Meet the dedicated members of Matribhumi City's team, including our Chairman, Managing Director, and Human Resources personnel." />
            </Helmet>
            <PageParallax bgImage={terms} pageTitle={'Terms & Conditions'} />

            <div className='container mx-auto py-20'>
                <div className='xl:mx-0 mx-5'>
                    <div className='mb-5'>
                        <h1 className='text-xl font-semibold mb-3 underline'>Terms and Conditions</h1>
                        <p>
                            These Terms and Conditions govern your use of the <strong>Matribhumi City website</strong> operated by Matribhumi City.
                            Please read these Terms and Conditions carefully before using our website.
                            <br />
                            Please read these Terms and Conditions carefully before using our website.
                            <br /><br />
                            <strong>
                                Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
                            </strong>
                            <br /><br />
                            By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
                        </p>
                    </div>
                    <div className='mb-5'>
                        <h3 className='text-xl font-semibold mb-3 underline'>Purchases</h3>
                        <p>
                            If you wish to purchase any Property or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your name, address, contact information, and payment details.
                        </p>
                    </div>
                    <div className='mb-5'>
                        <h3 className='text-xl font-semibold mb-3 underline'>Changes</h3>
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                        </p>
                    </div>
                    <div className='mb-5'>
                        <h3 className='text-xl font-semibold mb-3 underline'>Content</h3>
                        <p>
                            Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.<br /><br />

                            By posting Content on or through the Service, you represent and warrant that:
                        </p>
                        <br />
                        <ul class="list-disc pl-5 space-y-3">
                            <li>The Content is yours and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and conditions.</li>
                            <li>That the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity.</li>
                            <li>That the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity. We reserve the right to terminate the account of anyone found to be infringing on a copyright.</li>
                        </ul>
                    </div>
                    <div className='mb-5'>
                        <h3 className='text-xl font-semibold mb-3 underline'>Contact Us</h3>
                        <p>
                            If you have any questions about these Terms, please contact us.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;