import HeroSection from "@/components/hero-section";
import LogoCloud from "@/components/logo-cloud-one";
import FooterAnimated from "@/components/mvpblocks/footer-animated";
import { Marquee3D } from "@/components/testimonial-component";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function Home() {
  return (
    <>
    <HeroSection/>
    <LogoCloud/>
    <Marquee3D/>
    <TextHoverEffect text='CONGO'/>
    <FooterAnimated/>
    </>
  );
}
