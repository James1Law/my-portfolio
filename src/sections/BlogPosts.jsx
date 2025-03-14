import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Rename to blogPosts
const blogPosts = [
  {
    title: "Changing course: From ship to shore",
    category: "Career",
    image: "/photos/me-at-work-msc.jpeg", // Updated to use your actual image
    summary: "Leaving the sea behind: My personal journey of choosing presence over progression and finding new purpose in product management.",
    content: `
      <p class="dark:text-gray-300">For over a decade, the open sea was my home. As a Senior Officer of the Watch, I carried the weight of responsibility, ensuring the safe navigation of some of the world's largest passenger vessels. The role was demanding but fulfilling—every day was a test of skill, discipline, and decision-making. Whether sailing across vast oceans or maneuvering through congested ports, my job was to anticipate, adapt, and execute with precision.</p>
      
      <h3 style="font-size: 1.25rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;" class="dark:text-blue-400 dark:border-gray-700">The Maritime Career Path</h3>
      <p class="dark:text-gray-300">Progression at sea was structured and clear. With each passing year, I climbed the ranks, earning new certifications and increasing my responsibilities. The path ahead was set—Chief Officer, then Captain. Yet, despite the steady climb, something shifted in me.</p>
      
      <h3 style="font-size: 1.25rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;" class="dark:text-blue-400 dark:border-gray-700">The Hidden Cost of Life at Sea</h3>
      <p class="dark:text-gray-300">Life at sea offers unique rewards, but it also comes with sacrifices. I spent months away from home, missing birthdays, weddings, and the simple joys of day-to-day life with friends and family. The isolation was part of the deal, but over time, I felt its weight more heavily. Calls home became moments of longing rather than connection. I realised that while I was excelling in my career, I was drifting further away from the people who mattered most.</p>
      
      <h3 style="font-size: 1.25rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;" class="dark:text-blue-400 dark:border-gray-700">Making the Difficult Decision</h3>
      <p class="dark:text-gray-300">The decision to step away from a career I had spent my life building was not easy. Many of my colleagues couldn't understand why I would trade a promising maritime future for the unknown. But I knew it was time for a change. I wanted to be present—not just as a voice on a satellite call, but as a friend, a son, a partner.</p>
      
      <h3 style="font-size: 1.25rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;" class="dark:text-blue-400 dark:border-gray-700">Finding New Purpose Ashore</h3>
      <p class="dark:text-gray-300">Transitioning ashore meant reinventing myself. I had to take the leadership, problem-solving, and strategic thinking I had honed at sea and apply them to a new industry. I found my footing in product management—building solutions, leading teams, and navigating the complexities of technology. It was a different kind of challenge but one that resonated with me. The thrill of problem-solving remained, but now, I was working in an environment that allowed me to be surrounded by the people I had missed for so long.</p>
      
      <p class="dark:text-gray-300">Looking back, I have no regrets. The skills I developed at sea—discipline, resilience, and adaptability—have been invaluable in my new career. Changing course didn't mean abandoning my past; it meant using my experiences to carve a new path forward.</p>
      
      <p class="dark:text-gray-300">For anyone facing a similar crossroads, my advice is simple: listen to what truly matters to you. A successful career is important, but so is the life you build around it. Sometimes, the bravest decision isn't staying the course—it's having the courage to change it.</p>
    `,
    date: "15th June 2020"
  },
  {
    title: "From Bridge to Backlog",
    category: "Career",
    image: "/photos/ships-berth.jpg", // Replace with actual image
    summary: "Navigating my first months in product management",
    content: `
      <p>At the end of 2020, I found myself in unfamiliar waters—not on the bridge of a ship, but in the world of product management. After years of structured responsibilities at sea, I was now navigating a new landscape filled with terms like Agile, Scrum, and Kanban. These weren't navigational charts or shipboard protocols, but frameworks for managing work in a fast-paced, ever-changing environment.</p>
      
      <p>I was a few months into my first product management role, and the learning curve was steep. I wasn't just managing a single project—I was juggling multiple initiatives, aligning with different stakeholders, and trying to understand how to deliver value effectively. In many ways, it reminded me of my time at sea—making high-stakes decisions with limited information, staying calm under pressure, and constantly adapting to new challenges.</p>
      
      <h3 style="font-size: 1.25rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">Agile, Scrum, and Kanban—Decoding the Buzzwords</h3>
      <p>At first, Agile felt more like a philosophy than a process. The idea of iterating quickly, failing fast, and continuously improving was different from the meticulous planning I was used to in maritime operations. Scrum introduced the concept of working in sprints—short cycles of focused work with clear goals—while Kanban helped visualize workflows, keeping track of tasks and bottlenecks.</p>
      
      <p>I quickly realised that while these frameworks provided structure, they weren't rigid rules. Just as no two voyages are the same, no two teams work the same way. Learning to apply Agile principles in a way that suited my team was a challenge, but it was also where I found the most growth.</p>
      
      <h3 style="font-size: 1.25rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">Managing Stakeholders—A Different Kind of Crew</h3>
      <p>Onboard a ship, leadership is clear-cut—the chain of command dictates who makes decisions. In product management, influence comes not from rank, but from collaboration and communication. I had to learn how to work with engineers, designers, sales teams, and clients, each with their own priorities and expectations.</p>
      
      <p>One of the biggest lessons I learned early on was that managing stakeholders wasn't about keeping everyone happy—it was about aligning everyone around the right priorities. It required listening, negotiating, and sometimes making tough calls. The ability to assess risk, communicate clearly, and adapt quickly—skills I had honed at sea—proved to be just as valuable in this role.</p>
      
      <h3 style="font-size: 1.25rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">Applying My Maritime Knowledge in a Tech World</h3>
      <p>Despite the differences between my old and new career, I found surprising parallels. The structured decision-making of maritime operations helped me navigate complex business processes. My experience managing bridge teams translated into leading cross-functional teams. Even my ability to remain calm in high-pressure situations gave me an edge when handling tight deadlines and shifting priorities.</p>
      
      <p>Looking back, those early months were challenging but exhilarating. Every day was an opportunity to learn, to refine my approach, and to embrace a new way of thinking. I wasn't just learning how to manage products—I was learning how to adapt, a skill that had served me well throughout my career.</p>
      
      <p>Now, with a few years of product management under my belt, I can see how those early lessons shaped me. The journey from sea to tech was never going to be easy, but just like any voyage, it was all about setting the right course and adjusting as needed along the way.</p>
    `,
    date: "20th December 2020"
  },
  {
    title: "Navigating the challenges of product management in maritime technology",
    category: "Product Development",
    image: "/photos/cruise-ship.jpg", // Replace with actual image
    summary: "Learning what product development in maritime really means",
    content: `
      <p>When I transitioned into product management, I quickly learned that no two industries approach product development the same way. In tech-driven sectors, launching a product often means rapid iterations, fast feedback loops, and instant deployment. In maritime, the reality is quite different. Onboarding new customers isn't just about getting them to sign up—it's about overcoming logistical, technical, and operational barriers that don't exist in many other industries.</p>
      
      <h3 style="font-size: 1.25rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">Maritime Moves at a Different Pace</h3>
      <p>Unlike software products that can be instantly accessed via the cloud, maritime products often require installation on vessels that are constantly on the move. Some ships lack modern hardware, stable internet connections, or even the basic infrastructure to support new technology. Deploying a software update isn't as simple as pushing a release—it might involve sending USB drives to ports, working with onboard engineers to ensure compatibility, and scheduling updates months in advance.</p>
      
      <p>Onboarding a new customer in maritime takes time. Vessels operate on strict schedules, and their priority is safe, efficient operation—not installing new software. Even when a product is ready to go, it might take weeks or months before every vessel in a fleet is equipped, trained, and fully operational.</p>
      
      <h3 style="font-size: 1.25rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">The Unique Mix of B2B and B2C</h3>
      <p>Product development in maritime isn't purely B2B or B2C—it's both. We sell software solutions to shipping companies, cruise lines, and vessel operators (B2B), but the end users are captains, officers, and crew members who interact with the product daily (B2C).</p>
      
      <p>This means that even if we convince a company to buy our product, the job isn't done. A captain at sea, an operations manager in an office, and a regulatory compliance officer all have different expectations and pain points. Understanding these perspectives is crucial for ensuring adoption and long-term success. A product that makes life easier for shore-based managers but complicates onboard workflows is unlikely to succeed.</p>
      
      <h3 style="font-size: 1.25rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">The Importance of Training and Adoption</h3>
      <p>One of the biggest lessons I've learned is that technology alone doesn't solve problems—adoption does. In maritime, software isn't always intuitive for end users. Many officers and crew members are used to traditional ways of working and don't have time to learn a complicated new system while managing daily operations.</p>
      
      <p>Rolling out a new product isn't just about deployment—it's about education. Training sessions, onboarding materials, and ongoing support are just as critical as the software itself. Without buy-in from the people using the product at sea, even the best-designed solution can fail.</p>
      
      <h3 style="font-size: 1.25rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">Developing Commercial Awareness</h3>
      <p>Understanding these challenges has given me a deeper appreciation for the commercial realities of maritime product development. Unlike SaaS startups that can experiment freely, maritime companies need to be more deliberate. Sales cycles are longer, customer relationships are built over years, and new products must align with strict safety, compliance, and operational requirements.</p>
      
      <p>As a product manager, balancing these constraints with innovation is key. It's not just about building a great product—it's about making sure it works in the complex, high-stakes world of shipping. And that's what makes maritime product management so uniquely challenging—and rewarding.</p>
    `,
    date: "4th November 2021"
  },
  {
    title: "Five years in product management: Lessons in efficiency, design, and leadership",
    category: "Career Development",
    image: "/photos/me-working-from-home.jpeg", // Replace with actual image
    summary: "Reflections on my journey from maritime operations to product management, sharing key lessons on time management, UI/UX design, and team leadership.",
    content: `
      <p>Five years ago, I took a leap from maritime operations into product management. It was a shift that required me to rethink how I worked—moving from structured, high-stakes navigation to the fast-paced, iterative world of product development. Looking back, I can see how much I've grown, not just in technical skills, but in leadership, efficiency, and team collaboration.</p>
      
      <p>Here are the biggest lessons I've learned along the way.</p>
      
      <h3 style="font-size: 1.25rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">Time Management is Everything</h3>
      <p>In my early days as a Product Manager, I often felt pulled in multiple directions—stakeholder meetings, backlog refinement, sprint planning, user interviews, and roadmap updates. It took time to develop a system that worked, but now, efficiency is second nature.</p>
      
      <p>Prioritisation is key. Not everything needs to be done immediately. Learning to focus on high-impact tasks while delegating or deferring less critical ones has been crucial.</p>
      <p>Time blocking works. I set aside deep-focus hours for strategic work, ensuring that meetings don't consume my entire day.</p>
      <p>The "two-minute rule" is powerful. If something takes less than two minutes to complete, I do it immediately instead of letting small tasks pile up.</p>
      <p>Mastering time management means I can spend more time driving value rather than firefighting distractions.</p>
      
      <h3 style="font-size: 1.25rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">UI/UX Design: More Than Just Aesthetics</h3>
      <p>Early in my career, I underestimated the role of design in product success. I saw UI/UX as something for designers to handle. But I quickly realised that a great user experience isn't just about visual appeal—it's about making products intuitive, efficient, and enjoyable to use.</p>
      
      <p>Users don't read, they scan. Clear information hierarchy and intuitive navigation are crucial for usability.</p>
      <p>Less is more. Simplicity wins over complexity. Every additional feature, button, or input field should have a purpose.</p>
      <p>Empathy drives design. Understanding user behavior and pain points is the foundation of good UX.</p>
      <p>Over time, I've become proficient in UI/UX design principles, wireframing, and usability testing. This not only helps me collaborate better with designers but ensures that user experience is at the core of every product decision.</p>
      
      <h3 style="font-size: 1.25rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">Leading from the Front: Empowering Development Teams</h3>
      <p>One of the biggest shifts in my leadership style has been moving from directing to enabling. At sea, leadership often follows a chain of command, but in product management, success comes from empowering teams rather than controlling them.</p>
      
      <p>Autonomy leads to speed. A team that has all the context and trust to make decisions will move faster than one that needs constant approvals.</p>
      <p>Communication beats micromanagement. My role is to provide clear goals, priorities, and insights—then let the development team solve problems their way.</p>
      <p>Iterate fast, fail smart. Encouraging experimentation and learning from failures has helped build a culture of innovation rather than risk aversion.</p>
      <p>A great product isn't built by a single person—it's the result of a well-aligned, motivated team working together. By leading with transparency and trust, I've seen first-hand how a fast-paced, iterative, and proficient team creates outstanding products.</p>
      
      <h3 style="font-size: 1.25rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">Final Thoughts</h3>
      <p>Five years in product management have reinforced one key truth: success isn't just about delivering features—it's about delivering value. Whether through efficiency, design, or leadership, my role is to create an environment where great products can thrive. And as with any journey, the learning never stops.</p>
    `,
    date: "1st March 2025"
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
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading mb-4 dark:text-white">Blog</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              {/* Fixed layout that doesn't change with expansion */}
              <div className="md:grid md:grid-cols-3 md:gap-6">
                {/* Image container - fixed size and position */}
                {post.image && post.image !== "gray-300" ? (
                  <div className="h-64 md:h-full">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-64 md:h-full bg-gray-300 dark:bg-gray-700"></div>
                )}
                
                {/* Content area - takes 2/3 of the width with padding */}
                <div className="col-span-2 p-6 md:pl-0">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold dark:text-white">{post.title}</h3>
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{post.category}</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{post.date}</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{post.summary}</p>
                  
                  <motion.button
                    onClick={() => togglePost(index)}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {expandedPost === index ? "Read Less" : "Read More"}
                  </motion.button>
                </div>
              </div>
              
              {/* Separate expandable content section below the grid */}
              <AnimatePresence>
                {expandedPost === index && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-8 pb-8 pt-2 blog-content dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;
