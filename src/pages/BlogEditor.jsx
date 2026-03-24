import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth, UserButton, RedirectToSignIn } from '@clerk/clerk-react';
import { ArrowLeft, Save, Eye, EyeOff, Plus, X, Sun, Moon, ImageIcon, Loader2 } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

const Field = ({ label, hint, error, children }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">{label}</label>
    {children}
    {hint && !error && <p className="text-xs text-zinc-400 dark:text-zinc-500">{hint}</p>}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

export default function BlogEditor({ isDarkMode, toggleDarkMode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useAuth();
  const { getPost, createPost, updatePost, loading: ctxLoading } = useBlog();
  const isEditing = Boolean(id);

  const [form, setForm] = useState({ title: '', excerpt: '', content: '', tags: [], coverImage: '', author: 'Admin' });
  const [tagInput, setTagInput] = useState('');
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!ctxLoading && isEditing) {
      const p = getPost(id);
      if (p) {
        setForm({
          title: p.title || '',
          excerpt: p.excerpt || '',
          content: p.content || '',
          tags: p.tags || [],
          coverImage: p.coverImage || '',
          author: p.author || 'Admin',
        });
      }
    }
  }, [id, ctxLoading]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-zinc-400" />
      </div>
    );
  }

  if (!isSignedIn) return <RedirectToSignIn />;

  const set = (key) => (e) => {
    setForm(f => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors(err => ({ ...err, [key]: '' }));
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) setForm(f => ({ ...f, tags: [...f.tags, t] }));
    setTagInput('');
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Tiêu đề không được để trống';
    if (!form.excerpt.trim()) e.excerpt = 'Mô tả ngắn không được để trống';
    if (!form.content.trim()) e.content = 'Nội dung không được để trống';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      if (isEditing) {
        await updatePost(id, form);
        navigate(`/blog/${id}`);
      } else {
        const post = await createPost(form);
        navigate(`/blog/${post.id}`);
      }
    } catch (err) {
      alert('Lưu thất bại: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="container-custom py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/blog" className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors text-sm font-medium">
              <ArrowLeft size={16} />Blog
            </Link>
            <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-700" />
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {isEditing ? 'Sửa bài viết' : 'Bài viết mới'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setPreview(!preview)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              {preview ? <EyeOff size={15} /> : <Eye size={15} />}
              {preview ? 'Editor' : 'Xem trước'}
            </button>
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              {saving ? 'Đang lưu...' : isEditing ? 'Cập nhật' : 'Đăng bài'}
            </button>
            <UserButton afterSignOutUrl="/" />
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400">
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      <main className="container-custom py-10 max-w-5xl mx-auto">
        {preview ? (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 md:p-12">
            <div className="flex flex-wrap gap-2 mb-4">
              {form.tags.map(t => (
                <span key={t} className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">{t}</span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-4">{form.title || 'Chưa có tiêu đề'}</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 pb-8 border-b border-zinc-200 dark:border-zinc-800">{form.excerpt}</p>
            {form.coverImage && <img src={form.coverImage} alt="" className="w-full rounded-xl mb-8 aspect-[2/1] object-cover" />}
            <pre className="whitespace-pre-wrap text-zinc-700 dark:text-zinc-300 leading-relaxed font-mono text-sm">{form.content}</pre>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-5">
                <Field label="Tiêu đề" error={errors.title}>
                  <input value={form.title} onChange={set('title')} placeholder="Nhập tiêu đề bài viết..."
                    className={`w-full px-4 py-3 rounded-xl border bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all text-lg font-semibold ${errors.title ? 'border-red-400 focus:ring-red-400' : 'border-zinc-200 dark:border-zinc-700 focus:ring-zinc-900 dark:focus:ring-zinc-50'}`}
                  />
                </Field>

                <Field label="Mô tả ngắn" hint="Hiển thị ở trang danh sách bài viết" error={errors.excerpt}>
                  <textarea value={form.excerpt} onChange={set('excerpt')} placeholder="Tóm tắt bài viết trong 1–2 câu..." rows={3}
                    className={`w-full px-4 py-3 rounded-xl border bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all resize-none ${errors.excerpt ? 'border-red-400 focus:ring-red-400' : 'border-zinc-200 dark:border-zinc-700 focus:ring-zinc-900 dark:focus:ring-zinc-50'}`}
                  />
                </Field>

                <Field label="Nội dung" hint="Hỗ trợ Markdown cơ bản: ## Tiêu đề, **đậm**, - danh sách, ```code```" error={errors.content}>
                  <textarea value={form.content} onChange={set('content')} placeholder="Viết nội dung bài viết bằng Markdown..." rows={20}
                    className={`w-full px-4 py-3 rounded-xl border bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all font-mono text-sm resize-y ${errors.content ? 'border-red-400 focus:ring-red-400' : 'border-zinc-200 dark:border-zinc-700 focus:ring-zinc-900 dark:focus:ring-zinc-50'}`}
                  />
                </Field>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Publish */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-4">
                <h3 className="font-bold text-zinc-900 dark:text-zinc-50">Đăng bài</h3>
                <Field label="Tác giả">
                  <input value={form.author} onChange={set('author')}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 text-sm transition-all"
                  />
                </Field>
                <button onClick={handleSave} disabled={saving}
                  className="w-full flex items-center justify-center gap-2 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  {saving ? 'Đang lưu...' : isEditing ? 'Cập nhật' : 'Đăng bài'}
                </button>
              </div>

              {/* Tags */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-4">
                <h3 className="font-bold text-zinc-900 dark:text-zinc-50">Tags</h3>
                <div className="flex gap-2">
                  <input value={tagInput} onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Thêm tag..."
                    className="flex-1 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 text-sm transition-all"
                  />
                  <button onClick={addTag} className="p-2 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-xl hover:opacity-90 transition-opacity">
                    <Plus size={16} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      {tag}
                      <button onClick={() => setForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }))} className="hover:text-red-500 transition-colors">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                  {form.tags.length === 0 && <p className="text-xs text-zinc-400">Chưa có tag nào.</p>}
                </div>
              </div>

              {/* Cover Image */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-4">
                <h3 className="font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2"><ImageIcon size={16} />Ảnh bìa</h3>
                <Field label="URL ảnh" hint="Dán URL ảnh (Unsplash, v.v.)">
                  <input value={form.coverImage} onChange={set('coverImage')} placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 text-sm transition-all"
                  />
                </Field>
                {form.coverImage && <img src={form.coverImage} alt="" className="w-full rounded-xl aspect-video object-cover" />}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
