import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="w-full h-screen flex flex-col justify-center items-start dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">Hello, I'm</p>
          <h1 className="heading text-5xl md:text-7xl font-bold mb-4 dark:text-white">
            James Law
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
            Product Manager
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Former Chief Mate, bringing maritime expertise to software product management. 
            I combine my seafaring knowledge with a passion for technology to create 
            innovative solutions for the maritime industry.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-medium rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Contact Me
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 font-medium rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
            >
              View My Work
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
