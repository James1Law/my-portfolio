import { motion } from 'framer-motion';
import { FaJira, FaTrello, FaFigma } from 'react-icons/fa';
import { SiAsana, SiMiro } from 'react-icons/si';

const AhaIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="#2673E8">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);

const skillCategories = [
  {
    category: "Strategic",
    skills: ["Product Strategy", "Roadmap Planning", "Competitive Analysis", "Product Vision & Execution"]
  },
  {
    category: "Process",
    skills: ["Product Discovery", "Roadmap Planning", "Agile Product Development", "Backlog Prioritisation"]
  },
  {
    category: "People",
    skills: ["Stakeholder Management", "Cross-functional Collaboration", "Team Leadership", "Client Relations"]
  },
  {
    category: "Technical",
    skills: ["Data Analysis", "Technical/Engineering Proficiency", "Maritime Domain Knowledge", "Product Specifications"]
  },
  {
    category: "User-Focused",
    skills: ["User Research", "User Centric Design", "Customer Journey Mapping", "User Testing"]
  },
  {
    category: "Tools",
    skills: [
      { name: "Jira", icon: <FaJira className="text-[#0052CC]" /> },
      { name: "Aha!", icon: <AhaIcon /> },
      { name: "Trello", icon: <FaTrello className="text-[#0079BF]" /> },
      { name: "Asana", icon: <SiAsana className="text-[#F06A6A]" /> },
      { name: "Figma", icon: <FaFigma className="text-[#F24E1E]" /> },
      { name: "Miro", icon: <SiMiro className="text-[#FFD02F]" /> }
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading text-4xl md:text-5xl font-bold mb-4 dark:text-white">Skills</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          As a Product Manager, I bring a well-rounded skill set, shaped by experience and a deep understanding of what drives successful product development and delivery. My expertise is organised into key competency areas, each playing a vital role in turning ideas into impactful solutions.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">{category.category}</h3>
              
              {category.category === "Tools" ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center">
                      <span className="mr-2 text-lg">
                        {skill.icon}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="flex items-center">
                      <span className="text-blue-500 dark:text-blue-400 mr-2">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
