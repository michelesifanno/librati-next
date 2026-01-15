import { Box } from '@mui/material';
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ScrollingText from "@/components/ScrollingText";
import PrenotaSection from "@/components/PrenotaSection";
import ImageSection from "@/components/ImageSection";
import MenuCTAsection from "@/components/MenuCTAsection";
import Teddy from "@/components/Teddy";
import ReferenceSection from "@/components/ReferenceSection";
import ScrollGallery from "@/components/ScrollGallery";
import MainHeader from '@/components/layout/MainHeader.client';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <MainHeader />
      <Box>
        <HeroSection />

        <AboutSection />

        <ScrollingText />

        <PrenotaSection />

        <ImageSection />

        <MenuCTAsection />

        <Teddy />

        <ScrollGallery />

        <ReferenceSection />
      </Box>

      <Footer />
    </>
  );
}