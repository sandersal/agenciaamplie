import { Card } from "./ui/card";
import { 
  Palette, 
  Monitor, 
  Video, 
  Mic, 
  TrendingUp, 
  Printer 
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Palette,
      title: "Design & Branding",
      description: "Criamos identidades visuais que comunicam propósito e constroem valor de marca duradouro.",
      items: ["Identidade Visual", "Branding Estratégico", "Design de Embalagens", "Material Institucional"],
    },
    {
      icon: Monitor,
      title: "Web & App",
      description: "Desenvolvemos experiências digitais que encantam usuários e geram resultados mensuráveis.",
      items: ["Sites Responsivos", "E-commerce", "Aplicativos Mobile", "Sistemas Web"],
    },
    {
      icon: Video,
      title: "Vídeo & Produção",
      description: "Produzimos conteúdo audiovisual que conta histórias e engaja audiências de forma memorável.",
      items: ["Vídeos Institucionais", "Motion Graphics", "Animação 2D/3D", "Edição Profissional"],
    },
    {
      icon: Mic,
      title: "Áudio & Locução",
      description: "Criamos experiências sonoras que complementam e amplificam a mensagem da sua marca.",
      items: ["Locução Profissional", "Trilhas Originais", "Áudio Branding", "Podcasts"],
    },
    {
      icon: TrendingUp,
      title: "Tráfego & Performance",
      description: "Estratégias de marketing digital baseadas em dados para maximizar ROI e crescimento.",
      items: ["Google Ads", "Meta Ads", "SEO & SEM", "Análise de Dados"],
    },
    {
      icon: Printer,
      title: "Impressos & Materiais",
      description: "Materiais gráficos de alta qualidade que fortalecem a presença física da sua marca.",
      items: ["Cartões de Visita", "Folders & Catálogos", "Banners", "Material Promocional"],
    },
  ];

  return (
    <section id="servicos" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-sm text-secondary uppercase tracking-wider mb-2">
            Nossos Serviços
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Soluções <span className="gradient-text">Completas</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Serviços integrados de marketing e tecnologia para impulsionar seu negócio
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className="group p-8 bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform glow-effect">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
