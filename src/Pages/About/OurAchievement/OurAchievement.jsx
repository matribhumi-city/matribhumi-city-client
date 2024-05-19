import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Helmet } from "react-helmet";
import PageParallax from "../../../component/pageParallax/pageParallax";

// images
import achievement1 from "../../../assets/achievements/achievement1.jpg";
import achievement2 from "../../../assets/achievements/achievement1.png";
import achievement3 from "../../../assets/achievements/achievement2.jpg";
import achievement4 from "../../../assets/achievements/achievement2.png";
import achievement5 from "../../../assets/achievements/achievement3.jpg";
import achievement6 from "../../../assets/achievements/achievement4.jpg";
import achievement7 from "../../../assets/achievements/achievement4.png";
import achievement8 from "../../../assets/achievements/achievement5.jpg";
import achievement9 from "../../../assets/achievements/achievement5.png";
import achievement10 from "../../../assets/achievements/achievement6.png";
import achievement11 from "../../../assets/achievements/achievement7.jpg";

const achievements = [
    { _id: 11, image: achievement11, name: 'Certificate of Registration', year: '2021' },
    { _id: 10, image: achievement10, name: 'Certificate of Registration', year: '2021' },
    { _id: 2, image: achievement2, name: 'E-Trade Licence', year: '2022' },
    { _id: 3, image: achievement3, name: 'Certificate Of Incorporation', year: '2021' },
    { _id: 9, image: achievement9, name: 'IQRA Translation', year: '2021' },
    { _id: 4, image: achievement4, name: 'Clearance', year: '2023' },
    { _id: 6, image: achievement6, name: 'Environmental clearance', year: '2022' },
    { _id: 7, image: achievement7, name: 'Environmental Impact Assesment (EIA)', year: '2021' },
    { _id: 8, image: achievement8, name: 'E-Trade Licence', year: '2022' },
    { _id: 1, image: achievement1, name: 'Bangladesh Land Developers Association (BLDA)', year: '2021' },
  { _id: 5, image: achievement5, name: 'Certificate of Registration', year: '2021' },
];

const OurAchievement = () => {
  const [index, setIndex] = useState(-1);
  const photos = achievements?.map((achievement, index) => ({
    src: achievement?.image,
    alt: achievement?.name,
    name: achievement?.name,
    year: achievement?.year,
    id: index
  }));

  return (
    <div className="min-h-screen animate__animated animate__fadeIn">
      <Helmet>
        <title>Our Achievement - Matribhumi City</title>
        <meta name="description" content="Explore Matribhumi City's achievements through our photo gallery, showcasing milestones and successes in our projects." />
      </Helmet>
      <PageParallax bgImage={'https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} pageTitle={'Our Achievement'} />
      <div className="container mx-auto py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <img
              key={index}
              src={achievement?.image}
              alt={achievement?.name}
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
