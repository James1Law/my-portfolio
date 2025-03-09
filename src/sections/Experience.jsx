import { motion } from 'framer-motion';

const experiences = [
  {
    title: "Product Manager",
    company: "Ninety Percent of Everything",
    period: "Sept 2022 - Present",
    description: "Leading the development of a new product for the maritime industry, focusing on commerical efficiency through technology."
  },
  {
    title: "Digital Product Owner",
    company: "Thames Water",
    period: "Apr 2022 - Sep 2022",
    description: "Owned the digital product for Thames Water's report a leak portal, focusing on improving customer experience."
  },
  {
    title: "Product Owner",
    company: "Smartstream Technologies",
    period: "Aug 2021 - Apr 2022",
    description: "Back office cash management product owner, focusing on improving the customer experience through digital solutions."
  },
  {
    title: "Product Manager",
    company: "OneOcean Group",
    period: "Feb 2020 - Aug 2021",
    description: "Leading multiple development teams in an Agile environment, launching a new version of their flagship product."
  },
  {
    title: "Maritime Support Officer",
    company: "MSC Cruises UK",
    period: "2018 - 2020",
    description: "Monitoring the safety and operations of the MSC Cruises UK fleet, ensuring compliance with regulations and company policies."
  },
  {
    title: "Deck Cadet to Senior Officer",
    company: "Princess Cruises",
    period: "2007 - 2018",
    description: "Started as a deck cadet and worked my way up to a senior second officer, gaining experience, responsibilties and qualifications along the way."
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
