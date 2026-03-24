import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
      <div className="container-custom py-12 text-center">
        <p className="text-zinc-600 dark:text-zinc-400 font-medium">
          &copy; {currentYear} | Designed and coded with ❤️ by Sagar Shah
        </p>
      </div>
    </footer>
  );
}
