import { Card } from "./ui/card";
import { Target, Users, Lightbulb, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Foco em Resultados",
      description: "Cada projeto é pensado estrategicamente para gerar impacto mensurável e real.",
    },
    {
      icon: Users,
      title: "Time Especializado",
      description: "Profissionais experientes em design, tecnologia e estratégia digital.",
    },
    {
      icon: Lightbulb,
      title: "Inovação Constante",
      description: "Sempre atualizados com as últimas tendências e tecnologias do mercado.",
    },
    {
      icon: Award,
      title: "Qualidade Premium",
      description: "Excelência em cada detalhe, do planejamento à entrega final.",
    },
  ];

  return (
    <section id="sobre" className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in">
            <div>
              <p className="text-sm text-accent uppercase tracking-wider mb-2">
                Sobre Nós
              </p>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Amplificamos Marcas
                <br />
                <span className="gradient-text">Desde 2013</span>
              </h2>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Somos uma agência de marketing digital especializada em transformar 
              ideias em experiências memoráveis. Com mais de uma década de atuação, 
              combinamos criatividade, tecnologia e estratégia para criar soluções 
              que realmente fazem a diferença.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Nossa missão é ampliar o alcance e os resultados das marcas que 
              atendemos, construindo relacionamentos duradouros baseados em 
              confiança, transparência e entrega de valor.
            </p>

            <div className="pt-4">
              <div className="flex flex-wrap gap-4">
                <div className="px-6 py-3 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="text-2xl font-bold text-primary">150+</div>
                  <div className="text-sm text-muted-foreground">Projetos</div>
                </div>
                <div className="px-6 py-3 rounded-lg bg-secondary/10 border border-secondary/20">
                  <div className="text-2xl font-bold text-secondary">50+</div>
                  <div className="text-sm text-muted-foreground">Clientes</div>
                </div>
                <div className="px-6 py-3 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="text-2xl font-bold text-accent">10+</div>
                  <div className="text-sm text-muted-foreground">Anos</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Values Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={value.title}
                  className="p-6 bg-card border-border/50 hover:border-primary/50 transition-all hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 glow-effect">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
