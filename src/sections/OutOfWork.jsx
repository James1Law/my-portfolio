import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const personalStories = [
  {
    title: "The time I ran a marathon",
    date: "July 2021",
    content: "In the summer of 2021, I decided—somewhat on a whim—that I would run a marathon. No official event, no cheering crowds, just me, the open road, and some questionable decision-making. The route? From my home in Sherborne to my parents' place in Castle Cary and back. A nice, scenic run through the Somerset countryside, I thought.\n\nWhat I didn't think about, however, was the weather. The day I picked turned out to be an absolute scorcher. Not quite Sahara levels, but enough to make me question my life choices before I'd even hit mile 10. Fueling strategy? Also a bit of an afterthought. I had no gels, no electrolytes—just blind optimism and a vague plan to raid my mum's biscuit tin at the halfway point.\n\nBy the time I stumbled into my parents' kitchen, red-faced and dripping with sweat, I was in desperate need of sustenance. Mum, ever the supportive figure, handed me a couple of biscuits and a look that suggested she wasn't entirely convinced this was a good idea. No time to debate, though—after a brief sit-down (read: collapse), I was back on the road, powered by a mix of digestive biscuits and sheer stubbornness.\n\nThe return leg was… character-building. My legs felt like lead, and I briefly considered calling for a lift. But pride (and the lack of an easy escape route) kept me going. Step by step, I made it back to Sherborne, exhausted but oddly pleased with myself.\n\nWas it the smartest way to run a marathon? Absolutely not. Would I do it again? Also no. But I did it, and that's enough for me."
  },
  {
    title: "Life with six strings",
    date: "July 2023",
    content: "It all started in primary school when a few of my friends signed up for group guitar lessons. Naturally, I wanted in—partly for the music, mostly because it seemed like a fun club to be part of. Instead of joining their class, though, I ended up learning with my Dad, who, in between being a great father, also happened to be a pretty good teacher. One year of classical guitar later, I was hooked.\n\nFast forward a couple of decades, and I'm still playing. In fact, I still occasionally meet up with one of those original school friends to jam, proving that some things—like dodgy chord changes and questionable song choices—never really change.\n\nSinging, on the other hand, came much later. At 21, I finally decided to give it a go, which in music years felt a bit like turning up to freshers' week in your thirties. But I stuck with it, and it's a good thing I did, because in 2023, I found myself doing something I'd never have imagined—playing and singing my bride down the aisle. No pressure, just a lifetime's worth of emotional significance riding on a single performance. Two weeks later, I was at it again, this time writing and performing a song for one of my best mates on his wedding day. Turns out, once you start using music for big life moments, it's hard to stop.\n\nThese days, music is my escape. Whether it's strumming away after a long day or belting out tunes (badly) in the car, it's my way to relax, de-stress, and occasionally, much to my wife's amusement, put on an impromptu kitchen concert.\n\nWouldn't have it any other way."
  },
  {
    title: "My life with technology",
    date: "March 2024",
    content: "I've always been a bit of a tech enthusiast, really. Ever since I was a lad, I've had this fascination with gadgets and gizmos—always the first to get my hands on the latest bit of kit, much to my wallet's dismay.\n\nDuring my time at sea, this tech obsession found its purpose. While some of my shipmates would struggle with the navigation systems, I'd be there knowing every setting on every computer, radar, and Electronic Chart Display (ECDIS) like the back of my hand. There was something rather satisfying about mastering these complex systems without any formal training. The captain would often joke that I knew more about the ship's tech than the manufacturers did—probably not far off, to be honest.\n\nWhen I eventually left life at sea, I found myself missing that technical challenge. That's when I stumbled into the world of web development. No qualifications, no formal training—just curiosity and a willingness to learn. With the help of AI tools, I've managed to build several web apps from scratch. It's quite remarkable what's possible these days with the right resources and a bit of determination.\n\nThere's something deeply satisfying about seeing your ideas come to life on screen. It scratches that creative itch I've always had, while still feeding my appetite for technical problem-solving. One minute I'm designing a user interface, the next I'm troubleshooting code—it's never dull.\n\nMy mates are always asking how I've managed to pick it all up without a computer science degree. The truth is, it's not so different from learning those ship systems—patience, persistence, and a healthy dose of trial and error. Though I must admit, having AI assistants to help with the coding bits is a far cry from the dog-eared manuals I used to pore over on night watch.\n\nI suppose that's been my approach to technology all along—jump in, figure it out, and enjoy the process. No certificates needed, just curiosity and a willingness to learn."
  }
];

const OutOfWork = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedStories, setExpandedStories] = useState({});

  const toggleStory = (index) => {
    setExpandedStories(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="mt-16 mb-8 mx-auto max-w-3xl px-4">
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center justify-center gap-3 px-5 py-2 rounded-full transition-all duration-300 mx-auto group shadow-sm ${
            isExpanded 
              ? "bg-transparent text-gray-700 dark:text-gray-300" 
              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          <motion.div
            animate={{ 
              rotate: isExpanded ? 45 : 0
            }}
            className={`flex items-center justify-center w-5 h-5 rounded-full text-gray-700 dark:text-gray-300 transition-colors ${
              isExpanded 
                ? "bg-gray-200 dark:bg-gray-700" 
                : "bg-gray-200 dark:bg-gray-700"
            }`}
            transition={{ duration: 0.3 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </motion.div>
          <span className="font-medium">Outside of Work</span>
        </button>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-8 pb-4">
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-6">Personal Stories</h3>
                
                <div className="space-y-4">
                  {personalStories.map((story, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-transparent dark:border-gray-700 shadow-sm dark:shadow-gray-900/10 overflow-hidden"
                    >
                      <button 
                        onClick={() => toggleStory(index)}
                        className="w-full text-left p-5 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
                      >
                        <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100">{story.title}</h4>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">{story.date}</span>
                          <motion.div
                            animate={{ 
                              rotate: expandedStories[index] ? 45 : 0,
                              backgroundColor: expandedStories[index] ? "#f0f0f0" : "#f0f0f0"
                            }}
                            className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            transition={{ duration: 0.3 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </motion.div>
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {expandedStories[index] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-5 pb-5"
                          >
                            <div className="text-gray-600 dark:text-gray-300 pt-2 border-t border-gray-200 dark:border-gray-700">
                              {story.content.split('\n\n').map((paragraph, i) => (
                                <p key={i} className={i > 0 ? 'mt-4' : ''}>
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OutOfWork; 