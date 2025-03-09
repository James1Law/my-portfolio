import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-1/3"
          >
            <div className="relative">
              <div className="w-full h-80 bg-gray-300 rounded-lg overflow-hidden">
                {/* Replace with your image */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Your Photo Here
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border-4 border-blue-600 rounded-lg -z-10"></div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full md:w-2/3"
          >
            <h3 className="text-2xl font-bold mb-4">Frontend Developer & UI/UX Enthusiast</h3>
            <p className="text-gray-600 mb-4">
              I'm a passionate frontend developer with a keen eye for design and user experience. 
              With over 5 years of experience in building responsive web applications, I specialize in 
              creating intuitive interfaces that provide exceptional user experiences.
            </p>
            <p className="text-gray-600 mb-6">
              My journey in web development started when I built my first website in college. 
              Since then, I've worked with various technologies and frameworks, always staying 
              up-to-date with the latest trends and best practices in the industry.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Name:</p>
                <p className="text-gray-600">James Law</p>
              </div>
              <div>
                <p className="font-medium">Email:</p>
                <p className="text-gray-600">james@example.com</p>
              </div>
              <div>
                <p className="font-medium">Location:</p>
                <p className="text-gray-600">San Francisco, CA</p>
              </div>
              <div>
                <p className="font-medium">Availability:</p>
                <p className="text-gray-600">Open to opportunities</p>
              </div>
            </div>
            
            <div className="mt-8">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
