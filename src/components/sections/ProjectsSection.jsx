import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, Tag, Layers } from 'lucide-react';
import projects from '../../data/projects.json';

export default function ProjectsSection({ filter, projectId }) {
  // If a specific project ID is requested
  if (projectId) {
    const project = projects.find(p => p.id === projectId || p.name.toLowerCase() === projectId.toLowerCase());
    if (project) {
      return <ProjectDetail project={project} />;
    }
    return (
      <div className="text-[var(--danger)] text-sm">
        ✗ Project "{projectId}" not found. Type <code className="text-[var(--warning)]">projects</code> to see all available projects.
      </div>
    );
  }

  // Filter projects if filter is provided
  let filteredProjects = projects;
  if (filter) {
    const filterLower = filter.toLowerCase();
    filteredProjects = projects.filter(p => 
      p.sector.toLowerCase().includes(filterLower) ||
      p.type.toLowerCase().includes(filterLower) ||
      p.year === filter ||
      (filter === 'featured' && p.featured)
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
          <span className="text-[var(--accent)]">📦</span>
          {filter ? `Projects: ${filter}` : 'All Projects'}
        </h2>
        <span className="text-xs text-[var(--foreground-dim)]">
          {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Filters hint */}
      <p className="text-xs text-[var(--foreground-dim)]">
        Filter by sector: <code className="text-[var(--primary)]">projects fintech</code> | 
        View details: <code className="text-[var(--primary)]">project invoyce</code>
      </p>

      {/* Projects Grid */}
      <div className="grid gap-3">
        {filteredProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-[var(--warning)] text-sm">
          No projects found matching "{filter}". Try: fintech, e-commerce, 2025, featured
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      className="p-4 bg-[var(--background-secondary)] rounded-lg border border-[var(--foreground-dim)]/10 hover:border-[var(--primary)]/30 transition-all duration-200 group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Project Name & Featured Badge */}
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
              {project.featured && <span className="text-[var(--warning)]">✨ </span>}
              {project.name}
            </h3>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--foreground-dim)] mb-2">
            <span className="flex items-center gap-1">
              <Tag size={10} />
              {project.type}
            </span>
            <span className="flex items-center gap-1">
              <Layers size={10} />
              {project.sector}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={10} />
              {project.year}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-[var(--foreground-muted)] line-clamp-2 mb-3">
            {project.description}
          </p>

          {/* Tech Stack */}
          {project.tech && (
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 4).map(tech => (
                <span 
                  key={tech}
                  className="px-2 py-0.5 text-xs bg-[var(--background)] rounded border border-[var(--foreground-dim)]/10 text-[var(--primary)]"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="px-2 py-0.5 text-xs text-[var(--foreground-dim)]">
                  +{project.tech.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2 shrink-0">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 text-xs bg-[var(--primary)]/10 text-[var(--primary)] rounded hover:bg-[var(--primary)]/20 transition-colors"
          >
            <ExternalLink size={12} />
            Live
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 text-xs bg-[var(--foreground-dim)]/10 text-[var(--foreground-muted)] rounded hover:bg-[var(--foreground-dim)]/20 transition-colors"
          >
            <Github size={12} />
            Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectDetail({ project }) {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">
          {project.featured && <span className="text-[var(--warning)]">✨ </span>}
          {project.name}
        </h2>
        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--foreground-dim)]">
          <span className="px-2 py-0.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded">
            {project.type}
          </span>
          <span className="px-2 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] rounded">
            {project.sector}
          </span>
          <span>{project.year}</span>
        </div>
      </div>

      {/* Screenshot */}
      {project.deskimg && (
        <motion.div 
          className="rounded-lg overflow-hidden border border-[var(--foreground-dim)]/20"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <img 
            src={project.deskimg} 
            alt={project.name}
            className="w-full h-auto"
          />
        </motion.div>
      )}

      {/* Description */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-[var(--foreground-dim)] uppercase tracking-wider">Description</h3>
        <p className="text-[var(--foreground-muted)] leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Tech Stack */}
      {project.tech && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-[var(--foreground-dim)] uppercase tracking-wider">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map(tech => (
              <span 
                key={tech}
                className="px-3 py-1 bg-[var(--background-secondary)] rounded-full border border-[var(--foreground-dim)]/10 text-sm text-[var(--primary)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      <div className="flex gap-3">
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--background)] rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          <ExternalLink size={16} />
          View Live Demo
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[var(--background-secondary)] text-[var(--foreground)] rounded-lg font-medium border border-[var(--foreground-dim)]/20 hover:border-[var(--primary)]/30 transition-colors"
        >
          <Github size={16} />
          Source Code
        </a>
      </div>

      {/* Back hint */}
      <p className="text-xs text-[var(--foreground-dim)]">
        Type <code className="text-[var(--warning)]">projects</code> to go back to all projects
      </p>
    </motion.div>
  );
}

