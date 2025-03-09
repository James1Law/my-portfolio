const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">James Law</h3>
            <p className="text-gray-400">Product Manager</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400">
              &copy; {currentYear} All Rights Reserved
            </p>
            <p className="text-gray-400">
              Designed and built by me, using AI 🤖
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
