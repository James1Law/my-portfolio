import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hi! I'm James's AI assistant. I can help answer questions about his background, experience, skills, and more. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Hardcoded Q&A based on your portfolio content
  const qaDatabase = {
    // Conversational AI responses
    "hello": "Hi! How are you today? I'm here to answer any questions you have about James.",
    "hi": "Hi there! How are you doing? I'm James's AI assistant and I'd be happy to help you learn more about him.",
    "hey": "Hey! How's it going? I'm here to chat about James and answer any questions you might have.",
    "good morning": "Good morning! How are you today? I'm James's AI assistant, ready to help you learn more about him.",
    "good afternoon": "Good afternoon! How are you doing? I'm here to answer any questions about James.",
    "good evening": "Good evening! How are you? I'm James's AI assistant and I'd be happy to help you learn more about him.",
    "how are you": "I'm doing well, thank you for asking! I'm an AI assistant designed to help people learn about James Law. How can I help you today?",
    "what can you do": "I'm an AI assistant that can answer questions about James Law! I know about his background, work experience, skills, contact information, and personal interests. I can help you learn about his journey from maritime operations to product management, his current role, or anything else about him. What would you like to know?",
    "what are you": "I'm an AI assistant created to help people learn about James Law. I can answer questions about his professional background, skills, experience, and personal interests. Think of me as a helpful guide to James's portfolio!",
    "who created you": "I was created as part of James's portfolio website to help visitors learn more about him in an interactive way. I'm designed to provide information about his background, experience, and skills.",
    "are you real": "I'm an AI assistant, not a real person! I'm a chatbot designed to help you learn about James Law. While I'm not human, I can provide accurate information about James's background, experience, and skills.",
    "are you human": "No, I'm not human - I'm an AI assistant! I'm designed to help you learn about James Law by answering questions about his background, experience, and skills. I aim to be helpful and informative while being clear that I'm an artificial intelligence.",
    "thanks": "You're welcome! Is there anything else you'd like to know about James?",
    "thank you": "You're very welcome! Feel free to ask me anything else about James - I'm here to help!",
    "bye": "Goodbye! Thanks for chatting with me. Feel free to come back if you have more questions about James!",
    "goodbye": "Goodbye! It was nice chatting with you. Don't hesitate to return if you want to learn more about James!",
    "see you": "See you later! Thanks for stopping by to learn about James. Have a great day!",
    
    // About section
    "who are you": "James Law is a Product Manager specialising in maritime technology solutions. He's a former Deck Officer with 11 years at sea, and has been in product management for the past 5 years, combining his seafaring knowledge with technology to develop solutions for maritime professionals.",
    "what do you do": "James is a Product Manager specialising in maritime technology solutions. He bridges the gap between seafaring expertise and digital innovation to create intuitive maritime products that solve real industry challenges.",
    "where are you based": "James is based in Dorset, UK.",
    "what's your background": "James has a unique background as a former Deck Officer with 11 years at sea, followed by 5 years in product management. He started as a Deck Cadet and worked his way up to Senior Second Officer, gaining deep insights into maritime operations and challenges.",
    "tell me about yourself": "James Law is a Product Manager with a unique background in maritime operations. He spent 11 years as a Deck Officer at sea before transitioning to product management, where he now combines his seafaring knowledge with technology to develop solutions for the maritime industry. He's based in Dorset, UK.",
    
    // Experience section
    "what's your work experience": "James has diverse experience across multiple industries. Currently, he's a Product Manager at Ninety Percent of Everything, leading maritime technology development. Previously, he worked at Thames Water as a Digital Product Owner, Smartstream Technologies as a Product Owner, OneOcean Group as a Product Manager, MSC Cruises UK as a Maritime Support Officer, and Princess Cruises where he progressed from Deck Cadet to Senior Second Officer over 11 years.",
    "where do you work": "James currently works as a Product Manager at Ninety Percent of Everything, where he's leading the development of a new product for the maritime industry, focusing on commercial efficiency through technology.",
    "what companies have you worked for": "James has worked for several companies including Ninety Percent of Everything (current), Thames Water, Smartstream Technologies, OneOcean Group, MSC Cruises UK, and Princess Cruises.",
    "how long have you been a product manager": "James has been in product management for about 5 years, starting in 2020 after transitioning from his maritime career.",
    "how much product manager experience": "James has 5 years of product management experience, having started in 2020 after transitioning from his maritime career.",
    "product manager experience": "James has 5 years of product management experience, having started in 2020 after transitioning from his maritime career.",
    "years of product management": "James has 5 years of product management experience, having started in 2020 after transitioning from his maritime career.",
    
    // Skills section
    "what are your skills": "James's skills are organised into several categories: Strategic (Product Strategy, Roadmap Planning, Competitive Analysis), Process (Product Discovery, Agile Development, Backlog Prioritisation), People (Stakeholder Management, Cross-functional Collaboration, Team Leadership), Technical (Data Analysis, Engineering Proficiency, Maritime Domain Knowledge), User-Focused (User Research, User-Centric Design, Customer Journey Mapping), and Tools (Jira, Aha!, Trello, Asana, Figma, Miro).",
    "what tools do you use": "James uses various tools including Jira for project management, Aha! for product roadmapping, Trello and Asana for task management, Figma for design collaboration, and Miro for visual collaboration and planning.",
    "are you technical": "Yes, James has technical proficiency including data analysis, engineering knowledge, and maritime domain expertise. He also has experience with web development and can build web apps from scratch using AI tools.",
    
    // Contact section
    "how can i contact you": "You can contact James via email at james@jamesslaw.co.uk or phone at +44 (0)7738 401449. He's based in Dorset, UK. You can also connect with him on LinkedIn or GitHub.",
    "what's your email": "James's email is james@jamesslaw.co.uk",
    "what's your phone number": "James's phone number is +44 (0)7738 401449",
    "do you have a linkedin": "Yes, you can find James on LinkedIn at https://www.linkedin.com/in/james-law-4386b553/",
    "do you have a github": "Yes, you can find James on GitHub at https://github.com/James1Law",
    
    // Blog/Personal content
    "do you write blog posts": "Yes, James writes blog posts about his journey from maritime operations to product management, lessons learnt, and insights about working in maritime technology. You can find his blog posts on his website.",
    "what do you write about": "James writes about his career transition from sea to shore, product management lessons, maritime technology challenges, and personal stories about his life outside of work including running a marathon and his passion for music and technology.",
    "tell me about your personal life": "Outside of work, James enjoys running (he once ran a marathon from Sherborne to Castle Cary and back), playing guitar and singing (he even performed at his own wedding), and he's passionate about technology - he builds web apps as a hobby using AI tools.",
    "do you play music": "Yes, James plays guitar and sings. He started learning classical guitar in primary school and still plays today. He even performed at his own wedding and wrote and performed a song for a friend's wedding in 2023.",
    "have you run a marathon": "Yes, in July 2021 James ran a marathon from his home in Sherborne to his parents' place in Castle Cary and back. It was quite challenging, especially in the hot weather, but he completed it fuelled by digestive biscuits and stubbornness!",
    
    // General questions
    "what makes you unique": "James's unique combination of 11 years as a maritime Deck Officer combined with 5 years in product management gives him a rare perspective. He understands both the operational challenges of maritime professionals and how to translate those needs into effective technology solutions.",
    "why did you leave the maritime industry": "James left the maritime industry to be more present in his personal life. While he loved his career at sea, he was missing important life events and wanted to be surrounded by family and friends rather than spending months away from home.",
    "what's your approach to product management": "James's approach combines strategic thinking with user-centric design and efficient team leadership. He focuses on delivering value through clear prioritisation, empathy-driven design, and empowering development teams to work autonomously while maintaining alignment on goals.",
    "what industries have you worked in": "James has worked in maritime (both at sea and in technology), utilities (Thames Water), financial technology (Smartstream Technologies), and maritime technology (OneOcean Group and Ninety Percent of Everything)."
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const findBestMatch = (userInput) => {
    const input = userInput.toLowerCase().trim();
    
    // Check for exact matches first
    for (const [question, answer] of Object.entries(qaDatabase)) {
      if (input.includes(question) || question.includes(input)) {
        return answer;
      }
    }
    
    // Check for partial matches
    for (const [question, answer] of Object.entries(qaDatabase)) {
      const questionWords = question.split(' ');
      const inputWords = input.split(' ');
      
      const matchCount = questionWords.filter(word => 
        inputWords.some(inputWord => inputWord.includes(word) || word.includes(inputWord))
      ).length;
      
      if (matchCount >= 2) {
        return answer;
      }
    }
    
    return null;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = findBestMatch(inputValue);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: response || "Sorry, I don't know the answer to that yet! Feel free to ask me about James's background, experience, skills, or how to contact him.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Refocus the input after the bot responds
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-40 flex flex-col"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">JL</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">James's Assistant</h3>
                    <p className="text-xs text-blue-100">Ask me anything!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot; 