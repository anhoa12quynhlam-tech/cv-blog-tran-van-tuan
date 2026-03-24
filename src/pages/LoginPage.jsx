import React from 'react';
import { SignIn, useAuth } from '@clerk/clerk-react';
import { Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Sun, Moon } from 'lucide-react';

export default function LoginPage({ isDarkMode, toggleDarkMode }) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-50 rounded-full animate-spin" />
      </div>
    );
  }

  if (isSignedIn) {
    return <Navigate to="/blog/editor" replace />;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <Link
          to="/"
          className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors font-medium"
        >
          <ArrowLeft size={18} />
          Back to Portfolio
        </Link>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Login content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 dark:bg-zinc-50 mb-4">
            <span className="text-zinc-50 dark:text-zinc-900 text-xl font-black">&lt;SS/&gt;</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Admin Login
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Sign in to manage your blog posts
          </p>
        </div>

        {/* Clerk's pre-built SignIn component */}
        <SignIn
          appearance={{
            elements: {
              rootBox: 'w-full max-w-md',
              card: 'shadow-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 rounded-2xl',
              headerTitle: 'hidden',
              headerSubtitle: 'hidden',
              socialButtonsBlockButton: 'border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700',
              formFieldInput: 'border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 rounded-xl',
              formFieldLabel: 'text-zinc-700 dark:text-zinc-300',
              formButtonPrimary: 'bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 hover:opacity-90 rounded-xl font-semibold',
              footerActionLink: 'text-zinc-900 dark:text-zinc-50 font-semibold',
              identityPreviewEditButton: 'text-zinc-600 dark:text-zinc-400',
            },
          }}
          routing="hash"
          redirectUrl="/blog/editor"
        />
      </div>
    </div>
  );
}
