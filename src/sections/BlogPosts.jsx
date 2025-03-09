import { useState } from 'react';
import { motion } from 'framer-motion';

// Rename to blogPosts
const blogPosts = [
  {
    title: "How I Transitioned from Ship to Shore",
    category: "Career",
    image: "gray-300", // Replace with actual image
    summary: "My journey from navigating vessels as a deck officer to navigating product decisions in maritime tech.",
    content: `
      <p>After spending 11 years at sea as a deck officer, I found myself increasingly drawn to the technological aspects of maritime operations. The transition from ship to shore wasn't always smooth sailing, but it's been an incredible journey.</p>
      
      <h3>The Call to Change Course</h3>
      <p>My maritime career began with a passion for the sea and a desire to explore the world. As a deck officer, I navigated vessels through challenging waters, managed crew operations, and ensured safety protocols were followed. However, I noticed a gap between the technology we used onboard and what was possible.</p>
      
      <p>The turning point came when I was involved in testing a new navigation system. I found myself more interested in how the software could be improved than in using it as is. This sparked my interest in product development and how technology could solve real maritime challenges.</p>
      
      <h3>Navigating New Waters</h3>
      <p>Transitioning to product management wasn't straightforward. I had to learn a new language – not of nautical terms, but of user stories, sprints, and MVPs. My maritime experience became my compass, helping me understand the needs of users who were just like my former colleagues at sea.</p>
      
      <p>I started by taking online courses in product management and software development fundamentals. Then I sought opportunities where my maritime expertise would be valued, landing my first role at a company developing solutions for the shipping industry.</p>
      
      <h3>Bringing Maritime Knowledge Ashore</h3>
      <p>What I discovered was that my years at sea weren't just relevant – they were invaluable. I could speak the language of both worlds: translating technical requirements for developers while deeply understanding the needs of maritime professionals.</p>
      
      <p>Today, I leverage my unique background to create products that truly address the challenges faced by those at sea. The perspective gained from standing watch on the bridge now helps me watch over product development with a keen eye for what really matters to maritime users.</p>
    `,
    date: "October 15, 2023"
  },
  {
    title: "The Future of Maritime Technology",
    category: "Industry Insights",
    image: "gray-300", // Replace with actual image
    summary: "Exploring emerging technologies that are transforming the maritime industry and how they'll shape the future of shipping.",
    content: `
      <p>The maritime industry is undergoing a technological revolution that promises to transform how ships operate, how crews work, and how the entire shipping ecosystem functions. Here's my perspective on what's coming next.</p>
      
      <h3>Autonomous Vessels: Reality or Hype?</h3>
      <p>While fully autonomous ships have captured headlines, the reality is more nuanced. We're seeing a gradual evolution toward increased automation rather than an overnight revolution. Systems that assist navigation in congested waters, optimize route planning based on weather and traffic, and monitor engine performance are already being implemented.</p>
      
      <p>Having navigated vessels manually through challenging conditions, I believe human oversight will remain crucial for the foreseeable future. The most promising approach is human-machine collaboration, where technology handles routine operations while seafarers manage exceptions and emergencies.</p>
      
      <h3>Digital Twins and Predictive Maintenance</h3>
      <p>One of the most exciting developments is the creation of "digital twins" – virtual replicas of physical vessels that simulate performance under various conditions. These models allow operators to predict maintenance needs before failures occur, optimizing vessel performance and reducing downtime.</p>
      
      <p>During my time at sea, unexpected equipment failures could lead to costly delays and potentially dangerous situations. The shift toward predictive rather than reactive maintenance represents a significant advancement in maritime operations.</p>
      
      <h3>Connectivity and Crew Welfare</h3>
      <p>Improved satellite connectivity is transforming life at sea. Beyond operational benefits, better connectivity addresses one of the biggest challenges of seafaring: isolation. Access to high-speed internet enables video calls with family, online education, and entertainment options that were unimaginable when I first went to sea.</p>
      
      <p>As someone who spent months away from home, I can't overstate the impact this has on crew welfare and retention. The shipping companies that embrace these technologies will have a significant advantage in attracting and keeping talented seafarers.</p>
    `,
    date: "January 8, 2024"
  },
  {
    title: "Bridging the Gap: What Developers Should Know About Maritime Users",
    category: "Product Development",
    image: "gray-300", // Replace with actual image
    summary: "Insights for software developers on the unique needs and challenges of maritime professionals using their products.",
    content: `
      <p>As someone who's stood on both sides of the divide – as a maritime professional using software and as a product manager helping develop it – I've seen firsthand the disconnect that can occur. Here's what developers should understand about creating software for maritime users.</p>
      
      <h3>Context Matters: The Maritime Environment</h3>
      <p>Maritime software is often used in challenging environments: on bridges with glare from sunlight, in engine rooms with vibration and noise, or on vessels with limited connectivity. Interfaces that work perfectly in an office may be unusable at sea.</p>
      
      <p>I recall trying to use a newly installed system during rough weather in the North Sea. The small touch targets and complex menus that seemed intuitive in port became nearly impossible to navigate while bracing against the ship's motion. Simple, clear interfaces with large touch targets aren't just good design – they're essential for maritime applications.</p>
      
      <h3>Connectivity Constraints</h3>
      <p>Despite advances in maritime connectivity, bandwidth limitations and intermittent connections remain common challenges. Applications need to function offline and synchronize efficiently when connection is restored.</p>
      
      <p>The most successful maritime applications I've worked with employ thoughtful data prioritization – ensuring critical information transfers first when bandwidth is limited, while deferring less urgent updates.</p>
      
      <h3>Safety-Critical Operations</h3>
      <p>Unlike many consumer applications, maritime software often supports safety-critical operations. A system crash during navigation in congested waters or while monitoring cargo conditions can have serious consequences.</p>
      
      <p>This reality demands exceptional reliability, clear error states, and graceful degradation when problems occur. Features like automatic saving, robust recovery mechanisms, and redundancy are not luxuries but necessities.</p>
      
      <h3>The Human Element</h3>
      <p>Perhaps most importantly, developers should remember that maritime professionals often work long hours in challenging conditions. Cognitive load is a real concern when an officer has been on watch for hours during a busy port approach.</p>
      
      <p>The best maritime software reduces mental burden rather than adding to it. This means thoughtful automation, clear prioritization of information, and interfaces that require minimal training to operate effectively.</p>
    `,
    date: "March 22, 2024"
  },
  {
    title: "Product Management in Specialized Industries: Lessons Learned",
    category: "Career Development",
    image: "gray-300", // Replace with actual image
    summary: "Key insights from my experience as a product manager in the maritime sector that apply to any specialized industry.",
    content: `
      <p>Product management in a specialized industry like maritime technology comes with unique challenges and opportunities. Here are the key lessons I've learned that apply to product managers in any niche industry.</p>
      
      <h3>Domain Expertise Is Your Superpower</h3>
      <p>In specialized industries, domain knowledge isn't just helpful – it's transformative. My background as a deck officer has been invaluable in understanding user needs at a deep level. When users describe problems, I can visualize the context because I've lived it.</p>
      
      <p>If you're a product manager without industry experience, invest heavily in learning the domain. Spend time with users in their environment, learn the terminology, and understand the regulatory landscape. This knowledge will earn you credibility and lead to better product decisions.</p>
      
      <h3>Translate Between Worlds</h3>
      <p>One of the most valuable roles a product manager plays in specialized industries is that of translator. You need to convert user needs expressed in industry jargon into clear requirements for developers, while also explaining technical constraints to users in terms they understand.</p>
      
      <p>I've found that creating a shared vocabulary and using visual communication tools helps bridge this gap. Wireframes, user journey maps, and prototypes become even more important when working across knowledge domains.</p>
      
      <h3>Balance Innovation with Tradition</h3>
      <p>Specialized industries often have established ways of working that have evolved over decades or even centuries. The maritime industry has traditions dating back hundreds of years, and change can be met with resistance.</p>
      
      <p>Successful product innovation respects these traditions while demonstrating clear value for new approaches. I've learned to introduce change incrementally, showing how new technology enhances rather than replaces valued skills and knowledge.</p>
      
      <h3>Regulatory Awareness Is Essential</h3>
      <p>Many specialized industries are heavily regulated, and maritime is no exception. Understanding the regulatory environment is crucial for product success.</p>
      
      <p>Build relationships with regulatory experts and make compliance a core part of your product strategy, not an afterthought. Some of our most successful features have turned regulatory requirements from burdens into opportunities for efficiency.</p>
    `,
    date: "May 5, 2024"
  }
];

const BlogPosts = () => {
  // State to track which blog post is expanded
  const [expandedPost, setExpandedPost] = useState(null);
  
  // Toggle expanded state
  const togglePost = (index) => {
    if (expandedPost === index) {
      setExpandedPost(null); // collapse if already expanded
    } else {
      setExpandedPost(index); // expand this post
    }
  };
  
  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading mb-4">Blog</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Thoughts and insights from my journey in maritime technology and product management.
          </p>
        </motion.div>
        
        <div className="space-y-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <span className="text-sm text-blue-600 font-medium">{post.category}</span>
                </div>
                <p className="text-gray-500 text-sm mb-3">{post.date}</p>
                <p className="text-gray-600 mb-4">{post.summary}</p>
                
                <motion.button
                  onClick={() => togglePost(index)}
                  className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {expandedPost === index ? "Read Less" : "Read More"}
                </motion.button>
                
                {expandedPost === index && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 blog-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;
