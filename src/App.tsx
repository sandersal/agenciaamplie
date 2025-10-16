import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Article from "./pages/Article";
import BlogList from "./pages/BlogList";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Portfolio from "./pages/admin/Portfolio";
import PortfolioForm from "./pages/admin/PortfolioForm";
import Blog from "./pages/admin/Blog";
import BlogForm from "./pages/admin/BlogForm";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/artigo" element={<Article />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<Article />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/portfolio" element={<Portfolio />} />
            <Route path="/admin/portfolio/new" element={<PortfolioForm />} />
            <Route path="/admin/portfolio/edit/:id" element={<PortfolioForm />} />
            <Route path="/admin/blog" element={<Blog />} />
            <Route path="/admin/blog/new" element={<BlogForm />} />
            <Route path="/admin/blog/edit/:id" element={<BlogForm />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
