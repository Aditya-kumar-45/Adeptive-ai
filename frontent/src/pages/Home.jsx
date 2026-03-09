import React from 'react';
import HeroSection from '../components/Body/HeroSection';
import Features from '../components/Body/Features';
import Cards from '../components/Body/Cards';
import FeaturesSection from '../components/Body/FeaturesSection';
import AdaptiveComparison from '../components/AdaptiveComparison';

const Home = () => {
  return (
    <>
      <HeroSection />
      <AdaptiveComparison />
      <Features />
      <Cards />
      <FeaturesSection />
    </>
  );
};

export default Home;

