import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Blog', href: '#blog' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    // Function to determine which section is currently in view
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1)); // Remove # from href
      
      // Find which section is currently in view
      let currentSection = '';
      let minDistance = Infinity;
      
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Consider a section in view if its top is within viewport or just above it
          const distance = Math.abs(rect.top);
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = sectionId;
          }
        }
      });
      
      // Check if we're at the top of the page
      const isAtTop = window.scrollY < 100; // You can adjust this threshold
      
      // Update URL without causing a page reload
      if (isAtTop) {
        // Clear the hash if at the top of the page
        window.history.replaceState(null, null, window.location.pathname);
        setActiveSection('');
      } else if (currentSection && currentSection !== activeSection) {
        // Update hash for other sections
        setActiveSection(currentSection);
        window.history.replaceState(null, null, `#${currentSection}`);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Initial check on component mount
    handleScroll();
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection, navLinks]);

  // Function to handle smooth scrolling when clicking nav links
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm">
      <nav className="flex items-center justify-between padding-x py-4">
        <a href="/" className="text-xl font-bold">James Law</a>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-12">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a 
                href={link.href}
                className={`transition-colors ${
                  activeSection === link.href.substring(1)
                    ? 'text-black font-medium'
                    : 'text-gray-600 hover:text-black'
                }`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white md:hidden">
            <ul className="flex flex-col items-center py-4">
              {navLinks.map((link) => (
                <li key={link.label} className="w-full">
                  <a 
                    href={link.href}
                    className={`block py-2 text-center hover:bg-gray-50 ${
                      activeSection === link.href.substring(1)
                        ? 'text-black font-medium bg-gray-100'
                        : 'text-gray-600'
                    }`}
                    onClick={(e) => {
                      handleNavClick(e, link.href);
                      setIsMenuOpen(false);
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar; 