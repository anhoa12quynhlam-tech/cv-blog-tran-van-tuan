import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, UserButton } from '@clerk/clerk-react';
import {
  ArrowLeft, PenSquare, Sun, Moon, Search,
  Calendar, Clock, Tag, RefreshCw, ServerCrash,
} from 'lucide-react';
import { useBlog } from '../context/BlogContext';

// Skeleton loading card
function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden animate-pulse">
      <div className="aspect-[16/9] bg-zinc-200 dark:bg-zinc-800" />
      <div className="p-6 space-y-3">
        <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full w-1/4" />
        <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded-full w-full" />
        <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded-full w-4/5" />
        <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full w-full mt-2" />
        <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full w-3/4" />
      </div>
    </div>
  );
}

// Banner lỗi khi json-server chưa chạy
function ServerErrorBanner({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center">
        <ServerCrash size={32} className="text-red-500" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          Không kết nối được json-server
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-sm">
          Hãy chắc chắn json-server đang chạy trên cổng <code className="font-mono bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm">3001</code>
        </p>
        <div className="mt-3 p-3 rounded-xl bg-zinc-900 text-left inline-block">
          <code className="text-emerald-400 font-mono text-sm">npm run dev:server</code>
        </div>
      </div>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-medium hover:opacity-90 transition-opacity"
      >
        <RefreshCw size={16} />
        Thử lại
      </button>
    </div>
  );
}

export default function BlogList({ isDarkMode, toggleDarkMode }) {
  const { posts, loading, error, refetch } = useBlog();
  const { isSignedIn } = useAuth();
  const [search,    setSearch]    = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const allTags = ['All', ...new Set(posts.flatMap((p) => p.tags || []))];

  const filtered = posts.filter((post) => {
    const matchSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchTag = activeTag === 'All' || (post.tags || []).includes(activeTag);
    return matchSearch && matchTag;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="font-medium hidden sm:inline">Portfolio</span>
            </Link>
            <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-700" />
            <span className="font-bold text-zinc-900 dark:text-zinc-50 text-lg">Blog</span>
          </div>

          <div className="flex items-center gap-3">
            {isSignedIn ? (
              <>
                <Link
                  to="/blog/editor"
                  className="flex items-center gap-2 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 px-4 py-2 rounded-xl font-medium hover:opacity-90 transition-opacity text-sm"
                >
                  <PenSquare size={16} />
                  <span>Bài mới</span>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
              >
                Admin Login
              </Link>
            )}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <main className="container-custom py-16">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="badge mb-4">Blog</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 leading-tight mb-4">
            Bài viết & Chia sẻ
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            Tôi viết về lập trình web, thiết kế và những điều tôi học được trên hành trình.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Lỗi server */}
        {!loading && error && <ServerErrorBanner onRetry={refetch} />}

        {/* Nội dung chính */}
        {!loading && !error && (
          <>
            {/* Search */}
            <div className="relative max-w-xl mb-6">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 transition-all"
              />
            </div>

            {/* Tags */}
            {allTags.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-10">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      activeTag === tag
                        ? 'bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {/* Grid bài viết */}
            {filtered.length === 0 ? (
              <div className="text-center py-24 text-zinc-500 dark:text-zinc-400">
                <p className="text-xl font-medium">Không tìm thấy bài viết.</p>
                <p className="mt-2 text-sm">Thử từ khoá hoặc tag khác.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    {/* Cover */}
                    <div className="aspect-[16/9] overflow-hidden">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center">
                          <span className="text-4xl opacity-30">✍️</span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      {/* Tags */}
                      {(post.tags || []).length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {(post.tags || []).slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full"
                            >
                              <Tag size={10} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 mt-5 pt-5 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
                        {post.date && (
                          <span className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            {new Date(post.date).toLocaleDateString('vi-VN', {
                              day: 'numeric', month: 'short', year: 'numeric',
                            })}
                          </span>
                        )}
                        {post.readTime && (
                          <span className="flex items-center gap-1.5">
                            <Clock size={12} />
                            {post.readTime} đọc
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
