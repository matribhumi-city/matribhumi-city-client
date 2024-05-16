import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Helmet } from "react-helmet";

// images
import locationPng from '../../../assets/Properties/Project-Location-Map.png'
import layoutPng from '../../../assets/Properties/projectLayout.png'
import PageParallax from "../../../component/pageParallax/pageParallax";

const achievements = [
    { _id: 1, image: locationPng, name: 'Certificate of Registration', year: '2021' },
    { _id: 2, image: layoutPng, name: 'Certificate of Registration', year: '2021' },
];

const OurAchievement = () => {
  const [index, setIndex] = useState(-1);
  const photos = achievements.map((achievement, index) => ({
    src: achievement.image,
    alt: achievement.name,
    name: achievement.name,
    year: achievement.year,
    id: index
  }));

  return (
    <div className="min-h-screen animate__animated animate__fadeIn">
      <Helmet>
        <title>Our Achievement - Matribhumi City</title>
        <meta name="description" content="Explore Matribhumi City's achievements through our photo gallery, showcasing milestones and successes in our projects." />
      </Helmet>
      <PageParallax bgImage={'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} pageTitle={'Project Location & Layout '} />
      <div className="container mx-auto py-24">
        <div className="grid grid-cols-1 gap-8">
          {achievements.map((achievement, index) => (
            <img
              key={achievement._id}
              src={achievement.image}
              alt={achievement.name}
              className="cursor-pointer border bg-white h-full object-scale-down p-2"
              onClick={() => setIndex(index)}
            />
          ))}
        </div>
        <Lightbox
          slides={photos}
          open={index >= 0}
          index={index}
          Zoom
          close={() => setIndex(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
          options={{ zoomInLabel: "Zoom In", zoomOutLabel: "Zoom Out" }}
        />
      </div>
    </div>
  );
};

export default OurAchievement;
