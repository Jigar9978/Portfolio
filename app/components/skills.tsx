"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Code, Palette, Database, Smartphone, Cloud, Zap } from "lucide-react"

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

const skillCategories = [
  {
    title: "Frontend Magic",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    skills: ["React", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"],
    description: "Creating beautiful user interfaces",
  },
  {
    title: "Design & UI",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    skills: ["Figma" , "Responsive Design"],
    description: "Crafting stunning visual experiences",
  },
  {
    title: "Backend Power",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    skills: ["Node.js", "Express.js", "Python", "REST APIs"],
    description: "Building robust server solutions",
  },
  {
    title: "Database & Storage",
    icon: Database,
    color: "from-purple-500 to-violet-500",
    skills: ["MongoDB", "MySQL", "Firebase"],
    description: "Managing data efficiently",
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    color: "from-orange-500 to-amber-500",
    skills: ["React Native"],
    description: "Cross-platform mobile apps",
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    color: "from-indigo-500 to-blue-500",
    skills: ["AWS", "Vercel", "Git", "GitHub"],
    description: "Deploying and scaling applications",
  },
]

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <section
      id="skills"
      className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden"
    >
      
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="inline-block mb-6"
          >
            <Zap className="w-16 h-16 text-yellow-400" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 text-transparent bg-clip-text">
            Skills Arsenal
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">My toolkit for creating digital magic ✨</p>
        </motion.div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <motion.button
                key={index}
                onClick={() => setActiveCategory(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeCategory === index
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium text-sm sm:text-base">{category.title}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Active Category Display */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">{skillCategories[activeCategory].title}</h3>
            <p className="text-gray-300">{skillCategories[activeCategory].description}</p>
          </div>

          {/* Skills Floating Cards */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-4xl">
              {skillCategories[activeCategory].skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    delay: skillIndex * 0.1,
                    y: {
                      duration: 2 + skillIndex * 0.2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    },
                  }}
                  whileHover={{
                    scale: isMobile ? 1 : 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 },
                  }}
                  onHoverStart={() => setHoveredSkill(skill)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  className="relative group cursor-pointer"
                >
                  {/* Skill Card */}
                  <div
                    className={`bg-gradient-to-br ${skillCategories[activeCategory].color} p-6 rounded-2xl shadow-2xl transform transition-all duration-300 group-hover:shadow-3xl`}
                  >
                    <div className="text-center">
                      <div className="text-white font-bold text-sm sm:text-base mb-2">{skill}</div>

                      {/* Animated dots */}
                      <div className="flex justify-center gap-1">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-white/60 rounded-full"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.6, 1, 0.6],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Floating Particles */}
                  {hoveredSkill === skill && (
                    <>
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full"
                          initial={{
                            x: 0,
                            y: 0,
                            opacity: 1,
                            scale: 0,
                          }}
                          animate={{
                            x: (Math.random() - 0.5) * 100,
                            y: (Math.random() - 0.5) * 100,
                            opacity: 0,
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1,
                            delay: i * 0.1,
                          }}
                          style={{
                            left: "50%",
                            top: "50%",
                          }}
                        />
                      ))}
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Fun Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.p
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 text-transparent bg-clip-text"
            style={{ backgroundSize: "200% 200%" }}
          >
            "Code is poetry, design is art, and I'm the artist!" 🎨
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
