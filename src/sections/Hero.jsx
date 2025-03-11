import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="w-full min-h-screen pt-20 pb-10 flex flex-col justify-center items-center dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">Hello, I'm</p>
            <h1 className="heading text-4xl md:text-7xl font-bold mb-3 dark:text-white">
              James Law
            </h1>
            <h2 className="text-xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Product Manager
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6">
              Former Merchant Navy Deck Officer, bringing maritime expertise to software product management. 
              I combine my seafaring knowledge with a passion for technology to create 
              innovative solutions for the maritime industry.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8 md:mb-0">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 bg-blue-600 dark:bg-blue-700 text-white font-medium rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Contact Me
              </motion.a>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 font-medium rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
              >
                Read My Blog
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 md:mt-0"
          >
            <div className="relative w-56 h-56 md:w-80 md:h-80 overflow-hidden rounded-full border-4 border-blue-600 dark:border-blue-500 shadow-xl">
              <img 
                src="/photos/me-driving.jpg" 
                alt="James Law driving" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
