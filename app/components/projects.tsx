"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-mobile"

const projects = [
  {
    id: 1,
    title: "GetMyPass: A Seamless Event Ticketing Platform",
    description:
      "GetMyPass is a fully responsive event ticketing platform designed to streamline the process of buying and selling event passes. With an intuitive admin panel, organizers can effortlessly manage events, categories, and ticket sales. The platform ensures a smooth user experience with secure OTP-based login, seamless Cloudinary image uploads, and a modern UI/UX. Built with Next.js 15 and MongoDB Atlas, EventEase guarantees fast performance, scalability, and a hassle-free event management experience. 🚀🎟️",
    image: "/getmypass.jpeg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/Jigar9978/GetMyPass",
    live: "https://get-my-pass.vercel.app/  ",
  },
]

const Projects = () => {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <section id="projects" className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center"
        >
          My Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={isMobile ? {} : { y: -5 }}
              className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-600 group h-full flex flex-col"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={340}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4 gap-2">
                  <a
                    href={project.github}
                    className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors"
                  >
                    <Github size={20} className="text-white" />
                  </a>
                  <a
                    href={project.live}
                    className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors"
                  >
                    <ExternalLink size={20} className="text-white" />
                  </a>
                </div>
              </div>
              <div className="p-4 sm:p-6 flex-grow">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-auto">
                  <h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

