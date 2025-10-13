import { Card } from "./ui/card";
import { ArrowRight } from "lucide-react";
import caseWeb from "@/assets/case-web.jpg";
import caseBranding from "@/assets/case-branding.jpg";
import caseVideo from "@/assets/case-video.jpg";

const FeaturedCases = () => {
  const cases = [
    {
      title: "E-commerce Moderno",
      category: "Web & UX Design",
      image: caseWeb,
      result: "+300% em conversões",
      description: "Redesign completo de plataforma e-commerce com foco em conversão e experiência do usuário.",
    },
    {
      title: "Identidade Visual",
      category: "Branding & Design",
      image: caseBranding,
      result: "+200% de reconhecimento",
      description: "Criação de identidade visual completa para startup de tecnologia com posicionamento premium.",
    },
    {
      title: "Campanha Digital",
      category: "Vídeo & Conteúdo",
      image: caseVideo,
      result: "5M+ visualizações",
      description: "Produção de vídeos para campanha de lançamento de produto com alcance nacional.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-sm text-primary uppercase tracking-wider mb-2">
            Portfólio em Destaque
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Cases de <span className="gradient-text">Sucesso</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Projetos que transformaram negócios e geraram resultados reais
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((item, index) => (
            <Card
              key={item.title}
              className="group overflow-hidden bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Result Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold">
                  {item.result}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="text-sm text-primary font-medium">
                  {item.category}
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {item.description}
                </p>
                
                <button className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all mt-4">
                  Ver Case Completo
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCases;
