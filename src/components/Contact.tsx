import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "ampliemarketingtec@gmail.com",
      link: "mailto:contato@agencia.com.br",
    },
    {
      icon: Phone,
      title: "Telefone",
      content: "(93) 99187-2819",
      link: "tel:+5593991872819",
    },
    {
      icon: MapPin,
      title: "Localização",
      content: "Santarém, PA",
      link: "#",
    },
  ];

  return (
    <section id="contato" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-sm text-primary uppercase tracking-wider mb-2">
            Entre em Contato
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Vamos Conversar sobre <span className="gradient-text">Seu Projeto</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Estamos prontos para transformar suas ideias em realidade
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="p-8 bg-card border-border/50 animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nome Completo
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seu nome"
                  required
                  className="bg-background border-border/50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  required
                  className="bg-background border-border/50"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Telefone
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(93) 99187-2819"
                  className="bg-background border-border/50"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Conte-nos sobre seu projeto..."
                  required
                  rows={6}
                  className="bg-background border-border/50 resize-none"
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                Enviar Mensagem
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="space-y-6">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <a
                    key={info.title}
                    href={info.link}
                    className="flex items-start gap-4 p-6 rounded-xl bg-muted/30 hover:bg-muted/50 border border-border/50 hover:border-primary/50 transition-all hover-lift group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center glow-effect group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">{info.title}</div>
                      <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {info.content}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* CTA Box */}
            <Card className="p-8 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-primary/20">
              <h3 className="text-2xl font-bold mb-4">
                Prefere conversar pelo WhatsApp?
              </h3>
              <p className="text-muted-foreground mb-6">
                Estamos disponíveis para tirar suas dúvidas e falar sobre seu projeto.
              </p>
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={() => window.open('https://wa.me/5593991872819', '_blank')}
              >
                Iniciar Conversa
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
