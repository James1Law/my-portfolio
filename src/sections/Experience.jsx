import { motion } from 'framer-motion';

const experiences = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    period: "2021 - Present",
    description: "Led the frontend development team in building a SaaS platform. Implemented modern UI components using React and TypeScript. Improved site performance by 40%."
  },
  {
    title: "Frontend Developer",
    company: "Digital Innovations",
    period: "2018 - 2021",
    description: "Developed responsive web applications using React and Redux. Collaborated with designers to implement pixel-perfect UIs. Mentored junior developers."
  },
  {
    title: "Web Developer",
    company: "Creative Agency",
    period: "2016 - 2018",
    description: "Built websites for various clients using HTML, CSS, and JavaScript. Implemented responsive designs and ensured cross-browser compatibility."
  },
  {
    title: "Intern",
    company: "StartUp Hub",
    period: "2015 - 2016",
    description: "Assisted in developing website features. Learned modern web development practices and collaborated with senior developers."
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading mb-4">Work Experience</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-200"></div>
          
          {/* Experience items */}
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 z-10 border-4 border-white"></div>
              
              {/* Content */}
              <div className="w-full md:w-5/12 ml-8 md:ml-0 md:px-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                  <div className="flex items-center mb-3">
                    <span className="text-blue-600 font-medium">{exp.company}</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-500">{exp.period}</span>
                  </div>
                  <p className="text-gray-600">{exp.description}</p>
                </div>
              </div>
              
              {/* Empty space for alignment */}
              <div className="w-full md:w-5/12"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
