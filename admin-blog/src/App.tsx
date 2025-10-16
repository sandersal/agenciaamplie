import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BlogList from './pages/BlogList';
import BlogForm from './pages/BlogForm';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/new" element={<BlogForm />} />
      <Route path="/blog/edit/:id" element={<BlogForm />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
