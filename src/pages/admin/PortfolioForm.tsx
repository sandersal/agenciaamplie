import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, Loader2, Upload } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const PortfolioForm = () => {
  const { id } = useParams();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    short_description: '',
    full_description: '',
    cover_image: '',
    project_link: '',
    tags: '',
    category: '',
    published: false,
  });

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (id && user && isAdmin) {
      fetchItem();
    }
  }, [id, user, isAdmin]);

  const fetchItem = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setFormData({
        title: data.title,
        short_description: data.short_description,
        full_description: data.full_description,
        cover_image: data.cover_image,
        project_link: data.project_link || '',
        tags: data.tags.join(', '),
        category: data.category,
        published: data.published,
      });
    } catch (error: any) {
      toast.error('Erro ao carregar projeto: ' + error.message);
      navigate('/admin/portfolio');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.short_description || !formData.full_description || !formData.category || !formData.cover_image) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);

    try {
      const slug = generateSlug(formData.title);
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);

      const dataToSave = {
        title: formData.title,
        slug,
        short_description: formData.short_description,
        full_description: formData.full_description,
        cover_image: formData.cover_image,
        project_link: formData.project_link || null,
        tags: tagsArray,
        category: formData.category,
        published: formData.published,
      };

      if (id) {
        const { error } = await supabase
          .from('portfolio')
          .update(dataToSave)
          .eq('id', id);

        if (error) throw error;
        toast.success('Projeto atualizado com sucesso!');
      } else {
        const { error } = await supabase
          .from('portfolio')
          .insert([dataToSave]);

        if (error) throw error;
        toast.success('Projeto criado com sucesso!');
      }

      navigate('/admin/portfolio');
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
            <Link to="/admin/portfolio">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">
              {id ? 'Editar Projeto' : 'Novo Projeto'}
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Projeto</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Nome do projeto"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Ex: Branding, Web Design, Marketing Digital"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="short_description">Descrição Curta *</Label>
                <Textarea
                  id="short_description"
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="Breve descrição do projeto"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="full_description">Descrição Completa *</Label>
                <Textarea
                  id="full_description"
                  value={formData.full_description}
                  onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                  placeholder="Descrição detalhada do projeto"
                  rows={8}
                  required
                />
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
                <Label htmlFor="project_link">Link do Projeto</Label>
                <Input
                  id="project_link"
                  value={formData.project_link}
                  onChange={(e) => setFormData({ ...formData, project_link: e.target.value })}
                  placeholder="https://exemplo.com"
                  type="url"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="branding, design, marketing (separadas por vírgula)"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
                <Label htmlFor="published">Publicar projeto</Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading || uploading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    'Salvar Projeto'
                  )}
                </Button>
                <Link to="/admin/portfolio">
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PortfolioForm;
