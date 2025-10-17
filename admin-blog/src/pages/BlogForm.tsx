import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, Loader2, Eye, X, Wand2 } from 'lucide-react';
import { TiptapEditor } from '@/components/TiptapEditor';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import DOMPurify from 'dompurify';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const BlogForm = () => {
  const { id } = useParams();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    cover_image: '',
    content: '',
    excerpt: '',
    tags: [] as string[],
    author: '',
    category: '',
    read_time: 5,
    seo_title: '',
    seo_description: '',
    status: 'draft' as 'draft' | 'published' | 'scheduled',
    scheduled_date: '',
  });

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/login');
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (id && user && isAdmin) {
      fetchPost();
    }
    fetchAvailableTags();
  }, [id, user, isAdmin]);

  useEffect(() => {
    if (autoSaveTimer.current) {
      clearTimeout(autoSaveTimer.current);
    }

    autoSaveTimer.current = setTimeout(() => {
      if (id && formData.title) {
        autoSave();
      }
    }, 30000);

    return () => {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current);
      }
    };
  }, [formData, id]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setFormData({
        title: data.title,
        subtitle: data.subtitle || '',
        cover_image: data.cover_image,
        content: data.content,
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        author: data.author,
        category: data.category,
        read_time: data.read_time,
        seo_title: data.seo_title || '',
        seo_description: data.seo_description || '',
        status: data.published ? 'published' : 'draft',
        scheduled_date: data.scheduled_date || '',
      });
    } catch (error: any) {
      toast.error('Erro ao carregar post: ' + error.message);
      navigate('/blog');
    }
  };

  const fetchAvailableTags = async () => {
    try {
      const { data, error } = await supabase
        .from('blog')
        .select('tags');

      if (error) throw error;

      const allTags = new Set<string>();
      data?.forEach((post) => {
        post.tags?.forEach((tag: string) => allTags.add(tag));
      });

      setAvailableTags(Array.from(allTags));
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const autoSave = async () => {
    if (!id || saving) return;

    setSaving(true);
    try {
      const slug = generateSlug(formData.title);
      const readTime = estimateReadTime(formData.content);
      const sanitizedContent = DOMPurify.sanitize(formData.content);

      const dataToSave = {
        title: formData.title,
        slug,
        subtitle: formData.subtitle || null,
        cover_image: formData.cover_image,
        content: sanitizedContent,
        excerpt: formData.excerpt || null,
        tags: formData.tags,
        author: formData.author,
        category: formData.category,
        read_time: readTime,
        seo_title: formData.seo_title || null,
        seo_description: formData.seo_description || null,
        published: formData.status === 'published',
        scheduled_date: formData.scheduled_date || null,
      };

      await supabase.from('blog').update(dataToSave).eq('id', id);
      
      toast.success('Rascunho salvo automaticamente', {
        duration: 2000,
      });
    } catch (error) {
      console.error('Auto-save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione uma imagem');
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      setFormData({ ...formData, cover_image: data.publicUrl });
      toast.success('Imagem enviada com sucesso!');
    } catch (error: any) {
      toast.error('Erro ao enviar imagem: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const estimateReadTime = (content: string) => {
    const text = content.replace(/<[^>]*>/g, '');
    const wordCount = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  const generateMetaWithAI = async () => {
    if (!formData.title || !formData.content) {
      toast.error('Preencha título e conteúdo antes de gerar meta tags');
      return;
    }

    setLoading(true);
    try {
      const textContent = formData.content.replace(/<[^>]*>/g, '').slice(0, 500);
      
      const seoTitle = formData.title.length > 60 ? formData.title.slice(0, 57) + '...' : formData.title;
      const seoDescription = textContent.slice(0, 157) + '...';

      setFormData({
        ...formData,
        seo_title: seoTitle,
        seo_description: seoDescription,
      });

      toast.success('Meta tags geradas com sucesso!');
    } catch (error: any) {
      toast.error('Erro ao gerar meta tags: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData({ ...formData, tags: [...formData.tags, trimmedTag] });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.category || !formData.cover_image || !formData.author) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);

    try {
      const slug = generateSlug(formData.title);
      const readTime = estimateReadTime(formData.content);
      const sanitizedContent = DOMPurify.sanitize(formData.content);

      const dataToSave = {
        title: formData.title,
        slug,
        subtitle: formData.subtitle || null,
        cover_image: formData.cover_image,
        content: sanitizedContent,
        excerpt: formData.excerpt || null,
        tags: formData.tags,
        author: formData.author,
        category: formData.category,
        read_time: readTime,
        seo_title: formData.seo_title || null,
        seo_description: formData.seo_description || null,
        published: formData.status === 'published',
        scheduled_date: formData.scheduled_date || null,
      };

      if (id) {
        const { error } = await supabase
          .from('blog')
          .update(dataToSave)
          .eq('id', id);

        if (error) throw error;
        toast.success('Post atualizado com sucesso!');
      } else {
        const { error } = await supabase
          .from('blog')
          .insert([dataToSave]);

        if (error) throw error;
        toast.success('Post criado com sucesso!');
      }

      navigate('/blog');
    } catch (error: any) {
      toast.error('Erro ao salvar: ' + error.message);
    } finally {
      setLoading(false);
    }
  };


  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/blog">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-4 flex-1">
              <h1 className="text-2xl font-bold">
                {id ? 'Editar Post' : 'Novo Post'}
              </h1>
              {saving && (
                <span className="text-sm text-muted-foreground">Salvando...</span>
              )}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowPreview(true)}
            >
              <Eye className="mr-2 h-4 w-4" />
              Visualizar
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Título do post"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtítulo</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Subtítulo opcional"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Autor *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Nome do autor"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Ex: Marketing Digital"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cover_image">Imagem de Capa *</Label>
                <div className="flex gap-2">
                  <Input
                    id="cover_image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                  {uploading && <Loader2 className="h-5 w-5 animate-spin" />}
                </div>
                {formData.cover_image && (
                  <img
                    src={formData.cover_image}
                    alt="Preview"
                    className="mt-2 h-40 object-cover rounded-md"
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Resumo</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Breve resumo do post"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Conteúdo *</Label>
                <TiptapEditor
                  content={formData.content}
                  onChange={(html) => setFormData({ ...formData, content: html })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag(tagInput);
                      }
                    }}
                    placeholder="Digite uma tag e pressione Enter"
                    list="tag-suggestions"
                  />
                  <datalist id="tag-suggestions">
                    {availableTags.map((tag) => (
                      <option key={tag} value={tag} />
                    ))}
                  </datalist>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addTag(tagInput)}
                  >
                    Adicionar
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">SEO</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateMetaWithAI}
                    disabled={loading || !formData.title || !formData.content}
                  >
                    <Wand2 className="mr-2 h-4 w-4" />
                    Gerar Meta Tags
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seo_title">Meta Title</Label>
                    <Input
                      id="seo_title"
                      value={formData.seo_title}
                      onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                      placeholder="Título para motores de busca"
                      maxLength={60}
                    />
                    <p className="text-xs text-muted-foreground">{formData.seo_title.length}/60 caracteres</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seo_description">Meta Description</Label>
                    <Textarea
                      id="seo_description"
                      value={formData.seo_description}
                      onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                      placeholder="Descrição para motores de busca"
                      rows={3}
                      maxLength={160}
                    />
                    <p className="text-xs text-muted-foreground">{formData.seo_description.length}/160 caracteres</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status do Post</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: 'draft' | 'published' | 'scheduled') =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Rascunho</SelectItem>
                      <SelectItem value="published">Publicado</SelectItem>
                      <SelectItem value="scheduled">Agendado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.status === 'scheduled' && (
                  <div className="space-y-2">
                    <Label htmlFor="scheduled_date">Data de Publicação</Label>
                    <Input
                      id="scheduled_date"
                      type="datetime-local"
                      value={formData.scheduled_date}
                      onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading || uploading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    'Salvar Post'
                  )}
                </Button>
                <Link to="/blog">
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Pré-visualização do Post</DialogTitle>
            <DialogDescription>
              Veja como seu post ficará no site
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {formData.cover_image && (
              <img
                src={formData.cover_image}
                alt={formData.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
            <div>
              <h1 className="text-4xl font-bold mb-2">{formData.title}</h1>
              {formData.subtitle && (
                <p className="text-xl text-muted-foreground">{formData.subtitle}</p>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{formData.author}</span>
              <span>•</span>
              <span>{formData.read_time} min de leitura</span>
              <span>•</span>
              <span>{formData.category}</span>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formData.content) }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogForm;
