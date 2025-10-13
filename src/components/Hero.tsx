import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Hero background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Desde 2013 amplificando marcas</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            Transformamos
            <br />
            <span className="gradient-hero-text">Ideias em Resultados</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Criamos experiências digitais que conectam, engajam e convertem. 
            Design, tecnologia e estratégia para marcas que querem ir além.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button href="contato" variant="hero" size="xl" className="group">
              Solicitar Orçamento
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="hero-outline" size="xl">
              Ver Portfólio
            </Button>
          </div>

          {/* Quick Services */}
          <div className="pt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {["Design & Branding", "Web & App", "Vídeo & Produção", "Tráfego Pago"].map((service) => (
              <div key={service} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                <span>{service}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient Overlay Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
