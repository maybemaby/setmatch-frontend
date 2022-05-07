import { GiTennisCourt } from "react-icons/gi";
import { BiSearchAlt } from "react-icons/bi";
import { GrSchedulePlay } from "react-icons/gr";
import styles from "./Home.module.css";
import { Hero } from "../../Hero/Hero";
import { FeatureList } from "../../Features/FeatureList";

export const Home = () => {
  const courtFeature = `
    Find partners that also play at your preferred court.
  `;

  const levelFeature = `Search for partners that match your playing level based on NTRP ratings.`;

  const scheduleFeature = `Schedule matches and keep track of your previous results.`;

  return (
    <main>
      <Hero />
      <FeatureList>
        <FeatureList.Feature Icon={GiTennisCourt} description={courtFeature} />
        <FeatureList.Feature Icon={BiSearchAlt} description={levelFeature} />
        <FeatureList.Feature
          Icon={GrSchedulePlay}
          description={scheduleFeature}
        />
      </FeatureList>
    </main>
  );
};
