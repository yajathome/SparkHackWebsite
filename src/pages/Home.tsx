import React from 'react';
import Hero from '../components/home/Hero';
import TeamSection from '../components/home/TeamSection';
import FaqSection from '../components/home/FaqSection';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <TeamSection />
      <FaqSection />
    </div>
  );
};

export default Home;