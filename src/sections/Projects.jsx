import { motion } from 'framer-motion';

const projects = [
  {
    title: "E-commerce Platform",
    category: "Web Development",
    image: "gray-300", // Replace with actual image
    description: "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "#"
  },
  {
    title: "Portfolio Website",
    category: "UI/UX Design",
    image: "gray-300", // Replace with actual image
    description: "A personal portfolio website showcasing projects and skills with modern design elements.",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    link: "#"
  },
  {
    title: "Task Management App",
    category: "Web Application",
    image: "gray-300", // Replace with actual image
    description: "A task management application with drag-and-drop functionality, user authentication, and real-time updates.",
    technologies: ["React", "Firebase", "Material UI"],
    link: "#"
  },
  {
    title: "Weather Dashboard",
    category: "API Integration",
    image: "gray-300", // Replace with actual image
    description: "A weather dashboard that displays current and forecasted weather data for multiple locations.",
    technologies: ["JavaScript", "OpenWeather API", "Chart.js"],
    link: "#"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each project represents different skills and technologies I've mastered.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className={`h-60 bg-${project.image} relative overflow-hidden`}>
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Project Image
                </div>
                <div className="absolute inset-0 bg-blue-600 bg-opacity-80 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <a 
                    href={project.link} 
                    className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                  </a>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <span className="text-sm text-blue-600 font-medium">{project.category}</span>
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
