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
    description: "Started as a Deck Cadet and worked my way up to Senior Second Officer, gaining experience, responsibilties and qualifications along the way."
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading mb-4 dark:text-white">Work Experience</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>
        
        {/* Added Image Section */}
        <div className="flex flex-col md:flex-row items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/3 mb-8 md:mb-0"
          >
            <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-lg border-4 border-blue-600 dark:border-blue-500 shadow-xl">
              <img 
                src="/photos/me-under-prop.JPG" 
                alt="Me under ship propeller" 
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-2/3 md:pl-12"
          >
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg mb-4">
              From the high seas and travelling the world, to navigating diverse digital products.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
              Below is a timeline of my professional experience, showcasing my growth and experiences I've developed along the way.
            </p>
          </motion.div>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-800"></div>
          
          {/* Experience items */}
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row items-start md:items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-5 md:left-1/2 transform md:-translate-x-1/2 top-8 md:top-auto w-6 h-6 rounded-full bg-blue-600 z-10 border-4 border-white dark:border-gray-800"></div>
              
              {/* Content */}
              <div className="w-full md:w-5/12 pl-12 md:pl-0 md:px-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-1 dark:text-white">{exp.title}</h3>
                  <div className="flex flex-wrap items-center mb-3">
                    <span className="text-blue-600 dark:text-blue-400 font-medium">{exp.company}</span>
                    <span className="mx-2 dark:text-gray-400">•</span>
                    <span className="text-gray-500 dark:text-gray-400">{exp.period}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
                </div>
              </div>
              
              {/* Empty space for alignment */}
              <div className="hidden md:block w-full md:w-5/12"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
