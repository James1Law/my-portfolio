const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">James Law</h3>
            <p className="text-gray-400 dark:text-gray-300">Product Manager</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400 dark:text-gray-300 flex items-center justify-center md:justify-end gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              james@jamesslaw.co.uk
            </p>
            <p className="text-gray-400 dark:text-gray-300">
              Designed and built by me, using AI 🤖
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
