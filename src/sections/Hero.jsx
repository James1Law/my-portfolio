import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="w-full h-screen flex flex-col justify-center items-start">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-lg font-medium text-blue-600 mb-2">Hello, I'm</p>
          <h1 className="heading text-5xl md:text-7xl font-bold mb-4">
            James Law
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-700 mb-6">
            Frontend Developer
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            I build exceptional and accessible digital experiences for the web.
            Focused on creating clean, user-friendly interfaces that solve real problems.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Contact Me
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors"
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
