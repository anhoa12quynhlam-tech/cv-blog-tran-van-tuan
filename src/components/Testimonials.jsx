import React from 'react';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Krisztian Juhasz',
    role: 'Founder of dot.squad',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&q=80',
    feedback:
      'Sagar is an exceptional developer who delivered our entire platform ahead of schedule. His attention to detail, clean code, and ability to translate design into pixel-perfect UI is unmatched.',
  },
  {
    name: 'Emily Chen',
    role: 'Product Manager at Fiskil',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face&q=80',
    feedback:
      'Working with Sagar was a fantastic experience. He consistently brought creative solutions to complex problems and communicated proactively throughout the project. Would hire again without hesitation.',
  },
  {
    name: 'Marcus Reid',
    role: 'CTO at Startify',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face&q=80',
    feedback:
      'If you need a reliable full-stack developer who cares deeply about the product, Sagar is your person. He took ownership from day one and shipped features we thought would take months in just weeks.',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-zinc-50 dark:bg-zinc-950/50">
      <div className="container-custom">
        <div className="flex flex-col gap-12 text-center">
          <div className="space-y-4">
            <span className="badge">Testimonials</span>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Nice things people have said about me:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, index) => (
              <div
                key={index}
                className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-sm border border-zinc-100 dark:border-zinc-800 hover:shadow-md transition-all text-left flex flex-col"
              >
                {/* Quote icon */}
                <Quote size={28} className="text-zinc-300 dark:text-zinc-700 mb-4 flex-shrink-0" />

                {/* Feedback */}
                <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed flex-1 mb-6">
                  "{t.feedback}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-zinc-100 dark:border-zinc-800"
                    onError={(e) => {
                      // fallback: initials avatar
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  {/* Initials fallback (hidden by default) */}
                  <div
                    className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-700 items-center justify-center text-zinc-700 dark:text-zinc-300 font-bold text-sm hidden flex-shrink-0"
                  >
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-50 text-base">
                      {t.name}
                    </h4>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
