import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import FeaturedCases from "@/components/FeaturedCases";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Partners />
      <FeaturedCases />
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
