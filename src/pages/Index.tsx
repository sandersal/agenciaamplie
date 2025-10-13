import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import FeaturedCases from "@/components/FeaturedCases";
import Services from "@/components/Services";
import About from "@/components/About";
import Blog from "@/components/Blog";
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
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
