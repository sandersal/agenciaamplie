import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ArrowRight, Tag, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  cover_image: string;
  excerpt: string;
  tags: string[];
  author: string;
  created_at: string;
  read_time: number;
}

const BlogList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedTag === "all") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.tags?.includes(selectedTag)));
    }
  }, [selectedTag, posts]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setPosts(data || []);
      setFilteredPosts(data || []);

      // Extract unique tags
      const tags = new Set<string>();
      data?.forEach(post => {
        post.tags?.forEach((tag: string) => tags.add(tag));
      });
      setAllTags(Array.from(tags));
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <p className="text-sm text-secondary uppercase tracking-wider mb-2">
              Blog
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Todos os <span className="gradient-text">Artigos</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Insights, dicas e tendências do mundo do marketing digital e design
            </p>
          </div>

          {/* Tag Filter */}
          {allTags.length > 0 && (
            <div className="flex justify-center mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <Tabs value={selectedTag} onValueChange={setSelectedTag} className="w-full max-w-4xl">
                <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-card/50 p-2">
                  <TabsTrigger value="all" className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Todos
                  </TabsTrigger>
                  {allTags.map((tag) => (
                    <TabsTrigger key={tag} value={tag} className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      {tag}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4 text-muted-foreground">Carregando artigos...</p>
            </div>
          )}

          {/* Posts Grid */}
          {!loading && filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Nenhum artigo encontrado {selectedTag !== "all" && `para a tag "${selectedTag}"`}.
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Card
                key={post.id}
                className="group overflow-hidden bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover-lift animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <div
                          key={tag}
                          className="px-3 py-1 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold flex items-center gap-1"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.created_at)}
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.read_time} min
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Subtitle/Excerpt */}
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {post.subtitle || post.excerpt}
                  </p>

                  {/* Author */}
                  {post.author && (
                    <p className="text-xs text-muted-foreground">
                      Por {post.author}
                    </p>
                  )}

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all mt-4">
                    Ler Artigo
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogList;
