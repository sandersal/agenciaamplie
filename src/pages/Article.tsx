import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  cover_image: string;
  content: string;
  created_at: string;
  author?: string;
}

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("blog")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) console.error("Erro ao buscar post:", error);
      else setPost(data);

      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Carregando artigo...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Artigo não encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <article>
          <header className="mb-10">
            <h1 className="text-4xl font-bold mb-3">{post.title}</h1>
            {post.subtitle && (
              <p className="text-lg text-muted-foreground">{post.subtitle}</p>
            )}
            <div className="text-sm text-gray-400 mt-3">
              Publicado em{" "}
              {new Date(post.created_at).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
              {post.author && ` • por ${post.author}`}
            </div>
          </header>

          {post.cover_image && (
            <img
              src={post.cover_image}
              alt={post.title}
              className="rounded-2xl shadow-lg mb-10 w-full"
            />
          )}

          <section
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Article;