import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, UserButton } from '@clerk/clerk-react';
import { Menu, X, Sun, Moon, BookOpen, LogIn } from 'lucide-react';

export default function Navbar({ isDarkMode, toggleDarkMode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md dark:bg-zinc-950/80 border-b border-zinc-100 dark:border-zinc-800">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            &lt;SS /&gt;
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}

            {/* Blog Link */}
            <Link
              to="/blog"
              className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors font-medium"
            >
              <BookOpen size={16} />
              Blog
            </Link>

            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800" />

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {isDarkMode ? <Sun size={20} className="text-zinc-600 dark:text-zinc-400" /> : <Moon size={20} className="text-zinc-600 dark:text-zinc-400" />}
            </button>

            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors font-medium"
              >
                <LogIn size={16} />
                Login
              </Link>
            )}

            <button
              onClick={() => navigate('/blog')}
              className="bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 px-4 py-2 rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Download CV
            </button>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              {isDarkMode ? <Sun size={20} className="text-zinc-600 dark:text-zinc-400" /> : <Moon size={20} className="text-zinc-600 dark:text-zinc-400" />}
            </button>
            {isSignedIn && <UserButton afterSignOutUrl="/" />}
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-zinc-600 dark:text-zinc-400">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-zinc-100 dark:border-zinc-800 mt-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/blog"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-1.5 py-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 font-medium"
            >
              <BookOpen size={16} />
              Blog
            </Link>
            {!isSignedIn && (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1.5 py-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 font-medium"
              >
                <LogIn size={16} />
                Admin Login
              </Link>
            )}
            <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <button className="w-full bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 px-4 py-2 rounded-xl font-medium">
                Download CV
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
