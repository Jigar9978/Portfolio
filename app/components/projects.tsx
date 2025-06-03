"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Users, Github, ExternalLink } from "lucide-react"
import { projectsData } from "../../data/projects"

// Inline media query hook
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    media.addEventListener("change", listener)

    return () => media.removeEventListener("change", listener)
  }, [matches, query])

  return matches
}

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10 w-full relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
              Portfolio
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 text-transparent bg-clip-text">
            My Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Discover my work showcasing innovative solutions and cutting-edge technologies
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              onMouseEnter={() => !isMobile && setHoveredProject(project.id)}
              onMouseLeave={() => !isMobile && setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white rounded-full text-xs font-medium backdrop-blur-sm">
                  {project.category}
                </span>
              </div>

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-xs font-medium">
                    Featured
                  </span>
                </div>
              )}

              {/* Quick Action Links - Only show if links exist */}
              {(project.github || project.live) && (
                <div
                  className={`absolute bottom-4 right-4 flex gap-2 transition-all duration-300 ${
                    hoveredProject === project.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                    >
                      <Github size={16} className="text-white" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                    >
                      <ExternalLink size={16} className="text-white" />
                    </a>
                  )}
                </div>
              )}

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{project.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{project.team}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">{project.subtitle}</p>

                <p className="text-gray-700 dark:text-gray-300 text-sm mb-6 line-clamp-3">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* View Details Button */}
                <Link href={`/projects/${project.id}`}>
                  <button className="w-full group/btn bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2">
                    <span>View Details</span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
