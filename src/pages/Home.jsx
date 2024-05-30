
import OverviewSection from "../components/OverviewSection";
import TestimonialSection from "../components/TestimonialSection";
import WelcomeSection from "../components/WelcomeSection";
const Home = () => {
  return <div className="flex flex-col gap-2 ">
    <WelcomeSection  />
    <OverviewSection />
    <TestimonialSection/>

  </div>;
};

export default Home;
