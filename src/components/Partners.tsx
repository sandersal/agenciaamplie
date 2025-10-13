const Partners = () => {
  const partners = [
    "Tech Corp",
    "Digital Start",
    "Creative Co",
    "Brand Studio",
    "Media Group",
    "Design Lab",
    "Startup Hub",
    "Innova",
  ];

  return (
    <section className="py-20 border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
            Confiado por
          </p>
          <h2 className="text-2xl md:text-3xl font-bold">
            Marcas que <span className="gradient-text">Confiam</span> em Nós
          </h2>
        </div>

        {/* Partners Grid */}
        <div className="relative overflow-hidden">
          <div className="flex items-center justify-center gap-12 md:gap-16 flex-wrap">
            {partners.map((partner, index) => (
              <div
                key={partner}
                className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-muted/30 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:border-primary/50 transition-all hover:scale-110">
                  <span className="text-xs md:text-sm font-semibold text-center px-2">
                    {partner}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border/50">
          {[
            { number: "1000+", label: "Projetos Entregues" },
            { number: "10+", label: "Anos de Experiência" },
            { number: "98%", label: "Clientes Satisfeitos" },
            { number: "50+", label: "Marcas Atendidas" },
          ].map((stat) => (
            <div key={stat.label} className="text-center animate-fade-in">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
