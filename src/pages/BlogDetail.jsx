import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth, UserButton } from '@clerk/clerk-react';
import { ArrowLeft, Pencil, Trash2, Sun, Moon, Calendar, Clock, Tag, User, Loader2 } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

function MarkdownContent({ content }) {
  const lines = content.split('\n');
  const blocks = [];
  let inCode = false;
  let codeLines = [];

  lines.forEach((line, i) => {
    if (line.startsWith('```')) {
      if (!inCode) { inCode = true; codeLines = []; }
      else {
        blocks.push(
          <pre key={`code-${i}`} className="bg-zinc-900 dark:bg-zinc-800 rounded-xl p-6 overflow-x-auto my-6 text-sm">
            <code className="text-emerald-400 font-mono leading-relaxed">{codeLines.join('\n')}</code>
          </pre>
        );
        inCode = false;
      }
      return;
    }
    if (inCode) { codeLines.push(line); return; }

    if (line.startsWith('## '))
      return blocks.push(<h2 key={i} className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-10 mb-4">{line.slice(3)}</h2>);
    if (line.startsWith('### '))
      return blocks.push(<h3 key={i} className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-8 mb-3">{line.slice(4)}</h3>);
    if (line.startsWith('- '))
      return blocks.push(<li key={i} className="ml-6 list-disc text-zinc-700 dark:text-zinc-300 leading-relaxed">{line.slice(2)}</li>);
    if (line.trim() === '')
      return blocks.push(<div key={i} className="mb-3" />);

    const html = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`(.+?)`/g, '<code class="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono text-emerald-600 dark:text-emerald-400">$1</code>');
    blocks.push(<p key={i} className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: html }} />);
  });

  return <div>{blocks}</div>;
}

export default function BlogDetail({ isDarkMode, toggleDarkMode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPost, deletePost, loading } = useBlog();
  const { isSignedIn } = useAuth();
  const post = getPost(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-zinc-400" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Không tìm thấy bài viết</h1>
        <Link to="/blog" className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50">
          <ArrowLeft size={18} /> Về trang Blog
        </Link>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!window.confirm('Bạn chắc chắn muốn xoá bài viết này?')) return;
    await deletePost(id);
    navigate('/blog');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
        <div className="container-custom py-4 flex items-center justify-between">
          <Link to="/blog" className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors font-medium">
            <ArrowLeft size={18} />
            Tất cả bài viết
          </Link>
          <div className="flex items-center gap-3">
            {isSignedIn && (
              <>
                <Link to={`/blog/editor/${id}`} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                  <Pencil size={15} /> Sửa
                </Link>
                <button onClick={handleDelete} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
                  <Trash2 size={15} /> Xoá
                </button>
                <UserButton afterSignOutUrl="/" />
              </>
            )}
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <main className="container-custom py-16 max-w-4xl mx-auto">
        {post.coverImage && (
          <div className="aspect-[2/1] rounded-2xl overflow-hidden mb-12">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {(post.tags || []).length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {(post.tags || []).map(tag => (
              <span key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 leading-tight mb-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 pb-8 mb-10 border-b border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-2"><User size={15} />{post.author}</span>
          {post.date && (
            <span className="flex items-center gap-2">
              <Calendar size={15} />
              {new Date(post.date).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          )}
          {post.readTime && (
            <span className="flex items-center gap-2"><Clock size={15} />{post.readTime} đọc</span>
          )}
        </div>

        <MarkdownContent content={post.content} />

        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <Link to="/blog" className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors font-medium">
            <ArrowLeft size={18} />
            Về tất cả bài viết
          </Link>
        </div>
      </main>
    </div>
  );
}
