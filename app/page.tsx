import Landing from "./components/landing"
import About from "./components/about"
import Projects from "./components/projects"
import Skills from "./components/skills"
import Contact from "./components/contact"
import CustomCursor from "./components/custom-cursor"
import Certificates from "./components/certificates"

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Landing />
      <About />
      <Projects />
      <Skills />
      <Certificates/>
      <Contact />
    </>
  )
}

