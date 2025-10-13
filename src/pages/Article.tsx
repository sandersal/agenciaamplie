import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import articleHero from "@/assets/article-hero.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const Article = () => {
  const navigate = useNavigate();

  const relatedPosts = [
    {
      title: "Tendências de Design para 2025",
      category: "Design",
      image: blog2,
      date: "10 Out 2024",
    },
    {
      title: "SEO: Guia Completo para Iniciantes",
      category: "SEO",
      image: blog3,
      date: "05 Out 2024",
    },
  ];

  const tableOfContents = [
    { id: "introducao", title: "Introdução" },
    { id: "estrategias", title: "Estratégias Principais" },
    { id: "ferramentas", title: "Ferramentas Essenciais" },
    { id: "metricas", title: "Métricas de Sucesso" },
    { id: "conclusao", title: "Conclusão" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Article Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={articleHero}
            alt="Article hero"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
        </div>

        <div className="relative container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar ao Blog
          </Button>

          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-sm font-semibold flex items-center gap-1">
                <Tag className="w-3 h-3" />
                Marketing Digital
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Como Aumentar Conversões com{" "}
              <span className="gradient-text">Marketing Digital</span>
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Sander</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>15 Out 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>8 min de leitura</span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Compartilhar:
              </span>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
            {/* Main Content */}
            <article className="lg:col-span-8 space-y-8">
              {/* Featured Image */}
              <div className="relative aspect-video rounded-2xl overflow-hidden animate-fade-in">
                <img
                  src={blog1}
                  alt="Article featured"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Article Body */}
              <div className="prose prose-lg prose-invert max-w-none space-y-6 text-foreground/90">
                <div id="introducao" className="scroll-mt-24">
                  <h2 className="text-3xl font-bold mb-4 text-foreground">Introdução</h2>
                  <p>
                    No mundo digital de hoje, aumentar as conversões é o objetivo principal de qualquer 
                    estratégia de marketing. Não basta apenas atrair visitantes para o seu site; é 
                    fundamental transformá-los em leads qualificados e, eventualmente, em clientes fiéis.
                  </p>
                  <p>
                    Neste artigo, vamos explorar as estratégias mais eficazes para otimizar suas taxas 
                    de conversão utilizando técnicas comprovadas de marketing digital. Desde a otimização 
                    da experiência do usuário até o uso de dados para tomar decisões estratégicas.
                  </p>
                </div>

                <div id="estrategias" className="scroll-mt-24">
                  <h2 className="text-3xl font-bold mb-4 text-foreground">Estratégias Principais</h2>
                  <p>
                    Para aumentar significativamente suas conversões, é essencial implementar uma 
                    combinação estratégica de técnicas testadas. Aqui estão as mais importantes:
                  </p>
                  
                  <h3 className="text-2xl font-bold mt-6 mb-3 text-foreground">1. Otimização de Landing Pages</h3>
                  <p>
                    As landing pages são o coração de qualquer campanha de conversão. Uma página 
                    bem otimizada deve ter um propósito claro, design limpo e um call-to-action 
                    (CTA) irresistível. Elimine distrações e foque no objetivo principal.
                  </p>

                  <h3 className="text-2xl font-bold mt-6 mb-3 text-foreground">2. Testes A/B Contínuos</h3>
                  <p>
                    Nunca subestime o poder dos testes A/B. Teste diferentes versões de headlines, 
                    CTAs, cores de botões e layouts. Pequenas mudanças podem resultar em grandes 
                    aumentos nas taxas de conversão.
                  </p>

                  <h3 className="text-2xl font-bold mt-6 mb-3 text-foreground">3. Personalização da Experiência</h3>
                  <p>
                    Utilize dados comportamentais para personalizar a experiência de cada visitante. 
                    Mostre conteúdo relevante baseado em suas ações anteriores, localização e 
                    interesses demonstrados.
                  </p>
                </div>

                <Card className="p-6 bg-primary/5 border-primary/20">
                  <div className="flex items-start gap-4">
                    <div className="w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full" />
                    <div>
                      <p className="text-lg font-semibold mb-2 text-foreground">💡 Dica Pro</p>
                      <p className="text-muted-foreground">
                        Empresas que implementam estratégias de personalização veem em média um 
                        aumento de 20% nas taxas de conversão. Comece pequeno e expanda 
                        gradualmente suas iniciativas de personalização.
                      </p>
                    </div>
                  </div>
                </Card>

                <div id="ferramentas" className="scroll-mt-24">
                  <h2 className="text-3xl font-bold mb-4 text-foreground">Ferramentas Essenciais</h2>
                  <p>
                    Para implementar essas estratégias com sucesso, você precisará das ferramentas certas:
                  </p>
                  
                  <ul className="space-y-3 my-4">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span><strong>Google Analytics:</strong> Fundamental para entender o comportamento dos usuários</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span><strong>Hotjar:</strong> Visualize como os visitantes interagem com suas páginas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span><strong>Optimizely:</strong> Plataforma robusta para testes A/B</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span><strong>HubSpot:</strong> All-in-one para automação de marketing</span>
                    </li>
                  </ul>
                </div>

                <div id="metricas" className="scroll-mt-24">
                  <h2 className="text-3xl font-bold mb-4 text-foreground">Métricas de Sucesso</h2>
                  <p>
                    Acompanhar as métricas certas é crucial para medir o sucesso de suas estratégias. 
                    Foque nestes indicadores principais:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 my-6">
                    <Card className="p-4 bg-card border-border/50">
                      <h4 className="font-bold mb-2 text-foreground">Taxa de Conversão</h4>
                      <p className="text-sm text-muted-foreground">
                        Porcentagem de visitantes que completam a ação desejada
                      </p>
                    </Card>
                    <Card className="p-4 bg-card border-border/50">
                      <h4 className="font-bold mb-2 text-foreground">Custo por Conversão</h4>
                      <p className="text-sm text-muted-foreground">
                        Quanto você gasta para conquistar cada conversão
                      </p>
                    </Card>
                    <Card className="p-4 bg-card border-border/50">
                      <h4 className="font-bold mb-2 text-foreground">Taxa de Rejeição</h4>
                      <p className="text-sm text-muted-foreground">
                        Visitantes que saem sem interagir com o site
                      </p>
                    </Card>
                    <Card className="p-4 bg-card border-border/50">
                      <h4 className="font-bold mb-2 text-foreground">ROI de Marketing</h4>
                      <p className="text-sm text-muted-foreground">
                        Retorno sobre investimento das campanhas
                      </p>
                    </Card>
                  </div>
                </div>

                <div id="conclusao" className="scroll-mt-24">
                  <h2 className="text-3xl font-bold mb-4 text-foreground">Conclusão</h2>
                  <p>
                    Aumentar conversões com marketing digital não é um processo instantâneo, mas sim 
                    uma jornada contínua de otimização e aprendizado. As estratégias apresentadas 
                    neste artigo formam a base de uma abordagem sólida para melhorar seus resultados.
                  </p>
                  <p>
                    Lembre-se: teste, analise, ajuste e repita. O sucesso vem da implementação 
                    consistente e da disposição para adaptar suas estratégias com base nos dados 
                    que você coleta.
                  </p>
                </div>
              </div>

              {/* Author Bio */}
              <Card className="p-6 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-primary/20 mt-12">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                    JS
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">João Silva</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Especialista em Marketing Digital com mais de 10 anos de experiência 
                      ajudando empresas a crescerem online. Apaixonado por dados e estratégias 
                      que geram resultados reais.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Twitter className="w-4 h-4 mr-2" />
                        Twitter
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Table of Contents */}
              <Card className="p-6 bg-card border-border/50 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Índice</h3>
                <nav className="space-y-2">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors py-2 border-l-2 border-transparent hover:border-primary pl-3"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </Card>

              {/* Related Posts */}
              <Card className="p-6 bg-card border-border/50">
                <h3 className="text-xl font-bold mb-4">Artigos Relacionados</h3>
                <div className="space-y-4">
                  {relatedPosts.map((post) => (
                    <a
                      key={post.title}
                      href="#"
                      className="block group"
                    >
                      <div className="flex gap-3">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="text-xs text-primary mb-1">{post.category}</div>
                          <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h4>
                          <div className="text-xs text-muted-foreground mt-1">{post.date}</div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </Card>

              {/* CTA Box */}
              <Card className="p-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-primary/20">
                <h3 className="text-xl font-bold mb-3">
                  Precisa de Ajuda com Marketing?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Nossa equipe está pronta para transformar seus resultados digitais.
                </p>
                <Button variant="hero" size="sm" className="w-full">
                  Falar com Especialista
                </Button>
              </Card>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Article;
