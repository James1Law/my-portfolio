import { Hero, About, Experience, Projects, Skills, Contact } from './sections';
import { Navbar, Footer } from './components';

function App() {
  return (
    <main className="relative">
      <Navbar />
      <section className="padding-x">
        <Hero />
      </section>
      
      <section className="padding" id="about">
        <About />
      </section>

      <section className="padding" id="experience">
        <Experience />
      </section>

      <section className="padding" id="projects">
        <Projects />
      </section>

      <section className="padding" id="skills">
        <Skills />
      </section>

      <section className="padding" id="contact">
        <Contact />
      </section>
      
      <Footer />
    </main>
  );
}

export default App;
