import React from 'react';
import HeroSection from '../features/landing/HeroSection';
import Features from '../features/landing/Features';
import Cards from '../features/landing/Cards';
import FeaturesSection from '../features/landing/FeaturesSection';
import AdaptiveComparison from '../features/landing/AdaptiveComparison';
import { useTheme } from '../context/Theme'; 

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