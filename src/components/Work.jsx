import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Fiskil',
    description:
      'A fintech platform that aggregates open banking data to power real-time financial decisioning. Built with a React frontend and a Node.js microservices backend, handling 1M+ API calls per day.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Figma', 'Cypress', 'Storybook', 'Git'],
    // Real app-like screenshot from Unsplash
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Dot Squad',
    description:
      'A project management SaaS for creative agencies. Includes real-time collaboration, kanban boards, time tracking, and client portals — all built with React and Node.js.',
    tags: ['React', 'Node.js', 'MongoDB', 'Tailwind', 'Figma', 'Cypress', 'Storybook', 'Git'],
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
    liveUrl: '#',
    githubUrl: '#',
  },
];

export default function Work() {
  return (
    <section id="work" className="section-padding bg-zinc-50 dark:bg-zinc-950/50">
      <div className="container-custom">
        <div className="flex flex-col gap-12">
          <div className="text-center space-y-4">
            <span className="badge">Work</span>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Some of the noteworthy projects I have built:
            </p>
          </div>

          <div className="flex flex-col gap-12 max-w-5xl mx-auto w-full">
            {PROJECTS.map((project, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-100 dark:border-zinc-800 hover:shadow-lg transition-all duration-300 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Screenshot */}
                <div className="flex-1 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover min-h-[240px] hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 p-8 md:p-12 space-y-6 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                    {project.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 pt-2">
                    <a
                      href={project.liveUrl}
                      className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors font-medium"
                    >
                      <ExternalLink size={20} />
                      <span className="text-sm">Live Site</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors font-medium"
                    >
                      <Github size={20} />
                      <span className="text-sm">Source</span>
                    </a>
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
