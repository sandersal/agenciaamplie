import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const Blog = () => {
  const navigate = useNavigate();
  const posts = [
    {
      title: "Como Aumentar Conversões com Marketing Digital",
      excerpt: "Descubra as estratégias mais eficazes para transformar visitantes em clientes através de técnicas comprovadas de marketing digital.",
      category: "Marketing Digital",
      date: "15 Out 2024",
      image: blog1,
      readTime: "5 min",
    },
    {
      title: "Tendências de Design para 2025",
      excerpt: "Explore as principais tendências de design que vão dominar o mercado em 2025 e como aplicá-las em seus projetos.",
      category: "Design",
      date: "10 Out 2024",
      image: blog2,
      readTime: "7 min",
    },
    {
      title: "SEO: Guia Completo para Iniciantes",
      excerpt: "Aprenda os fundamentos de SEO e como otimizar seu site para alcançar as primeiras posições do Google.",
      category: "SEO",
      date: "05 Out 2024",
      image: blog3,
      readTime: "10 min",
    },
  ];

  return (
    <section id="blog" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-sm text-secondary uppercase tracking-wider mb-2">
            Blog
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Últimas <span className="gradient-text">Novidades</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Insights, dicas e tendências do mundo do marketing digital e design
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card
              key={post.title}
              className="group overflow-hidden bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                  <span>•</span>
                  <span>{post.readTime} de leitura</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read More Button */}
                <button 
                  onClick={() => navigate("/artigo")}
                  className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all mt-4"
                >
                  Ler Artigo
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Button variant="hero-outline" size="lg">
            Ver Todos os Artigos
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
