"use client"

import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-mobile"

const skillCategories = [
  {
    category: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS","Python","React Native"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express"],
  },
  {
    category: "Database",
    skills: ["MongoDB", "MySQL", "Firebase"],
  },
  {
    category: "Tools & Others",
    skills: ["Git", "GitHub", "VS Code", "Figma", "Responsive Design", "RESTful APIs"],
  },
]

const Skills = () => {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <section id="skills" className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center"
        >
          My Skills
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 + skillIndex * 0.05 }}
                    whileHover={isMobile ? {} : { scale: 1.05, backgroundColor: "var(--hover-bg)" }}
                    style={{ "--hover-bg": "rgb(59, 130, 246, 0.2)" } as any}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-xs sm:text-sm font-medium transition-all"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

