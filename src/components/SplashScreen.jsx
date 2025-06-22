import { useEffect, useState } from 'react';

const SplashScreen = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="container-mobile flex flex-col items-center justify-center gradient-bg">
      <div className={`text-center ${animate ? 'animate-bounce-in' : 'opacity-0'}`}>
        {/* Logo */}
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
          <div className="text-white text-4xl font-bold">QE</div>
        </div>
        
        {/* App Name */}
        <h1 className="text-3xl font-bold text-primary mb-4">QuickErran</h1>
        
        {/* Tagline */}
        <p className="text-lg text-gray-600 font-medium">Get Things Done. Instantly.</p>
      </div>
      
      {/* Loading indicator */}
      <div className="absolute bottom-16">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;