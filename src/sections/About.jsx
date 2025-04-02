import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading mb-4 dark:text-white">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hidden md:block md:w-1/3 lg:w-2/5"
          >
            <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-lg border-4 border-blue-600 dark:border-blue-500 shadow-xl">
              <img 
                src="/photos/me-standing.JPG" 
                alt="James Law standing" 
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full md:w-2/3 lg:w-3/5"
          >
            <h3 className="text-2xl font-bold mb-4 dark:text-white">Product Manager & UI/UX Enthusiast</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              I'm a dedicated Product Manager specialising in maritime technology solutions.
              With a unique background as a former Deck Officer and a passion for software development,
              I bridge the gap between seafaring expertise and digital innovation to create
              intuitive maritime products that solve real industry challenges.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              My professional journey began with 11 years as a Deck Officer at sea, giving me deep 
              insights into maritime operations and challenges. For the past 5 years, I've leveraged 
              this expertise in product management, where I combine my seafaring knowledge with 
              technology to develop solutions that truly address the needs of maritime professionals.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="font-medium dark:text-white">Name:</p>
                <p className="text-gray-600 dark:text-gray-300">James Law</p>
              </div>
              <div>
                <p className="font-medium dark:text-white">Email:</p>
                <p className="text-gray-600 dark:text-gray-300 break-words">james@jamesslaw.co.uk</p>
              </div>
              <div>
                <p className="font-medium dark:text-white">Location:</p>
                <p className="text-gray-600 dark:text-gray-300">Dorset, UK</p>
              </div>
            </div>
            
            {/* Mobile-only image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:hidden mt-8 mb-8"
            >
              <div className="relative w-full max-w-xs mx-auto overflow-hidden rounded-lg border-4 border-blue-600 dark:border-blue-500 shadow-xl">
                <img 
                  src="/photos/me-standing.JPG" 
                  alt="James Law standing" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
            
            <div className="mt-8">
              <motion.a
                href="/documents/james_law_resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Download CV
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
