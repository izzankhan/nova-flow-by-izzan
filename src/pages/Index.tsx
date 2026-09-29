import { Loader } from "@/components/Loader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustLogos } from "@/components/TrustLogos";
import { Stats } from "@/components/Stats";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { About } from "@/components/About";
import { FounderStory } from "@/components/FounderStory";
import { MissionVision } from "@/components/MissionVision";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { CaseStudies } from "@/components/CaseStudies";
import { VideoShowcase } from "@/components/VideoAndDemo";
import { Testimonials } from "@/components/Testimonials";
import { Awards } from "@/components/Awards";
import { Team } from "@/components/Team";
import { TechStack, Integrations } from "@/components/TechStack";
import { Industries } from "@/components/Industries";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { Articles, Resources } from "@/components/Articles";
import { FreeAudit } from "@/components/FreeAudit";
import { BookCall } from "@/components/BookCall";
import { Contact, GoogleMap } from "@/components/Contact";
import {
  Newsletter,
  Partners,
  Community,
  SocialMedia,
} from "@/components/Community";
import { Timeline } from "@/components/Timeline";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { EndingAnimation } from "@/components/EndingAnimation";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <TrustLogos />
        <Stats />
        <WhyChooseUs />
        <About />
        <FounderStory />
        <MissionVision />
        <Services />
        <Portfolio />
        <CaseStudies />
        <VideoShowcase />

        <Testimonials />
        <Awards />
        <Team />
        <TechStack />
        <Integrations />
        <Industries />
        <Pricing />
        <FAQ />
        <Articles />
        <Resources />
        <FreeAudit />
        <BookCall />
        <Contact />
        <GoogleMap />
        <Newsletter />
        <Partners />
        <Community />
        <SocialMedia />
        <Timeline />
        <FinalCTA />
      </main>
      <Footer />
      <EndingAnimation />
    </div>
  );
};

export default Index;
