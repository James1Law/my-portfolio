import { motion } from 'framer-motion';

const skills = [
  { name: "Product Strategy", level: 90 },
  { name: "Agile/Scrum", level: 95 },
  { name: "User Research", level: 90 },
  { name: "Stakeholder Management", level: 85 },
  { name: "Maritime Domain Knowledge", level: 95 },
  { name: "Roadmap Planning", level: 80 },
  { name: "Data Analysis", level: 75 },
  { name: "Requirements Definition", level: 90 },
  { name: "Technical/Engineering Proficiency", level: 70 },
  { name: "Project Management", level: 85 },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading mb-4 dark:text-white">My Skills</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I've worked with a variety of technologies and tools throughout my career.
            Here's an overview of my technical skills and proficiency levels.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium dark:text-white">{skill.name}</h3>
                <span className="text-blue-600 dark:text-blue-400 font-medium">{skill.level}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
