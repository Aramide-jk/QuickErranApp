import { Link } from 'react-router-dom';

const WelcomeScreen = () => {
  return (
    <div className="container-mobile gradient-bg">
      <div className="flex flex-col min-h-screen">
        {/* Header Section */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 pt-16">
          {/* Logo */}
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-8 shadow-lg animate-bounce-in">
            <div className="text-white text-3xl font-bold">QE</div>
          </div>
          
          {/* Welcome Text */}
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-3xl font-bold text-primary mb-4">Welcome to QuickErran</h1>
            <p className="text-lg text-text-dark font-medium">Run errands fast & safe.</p>
          </div>
          
          {/* Illustration placeholder */}
          <div className="w-64 h-48 bg-white bg-opacity-50 rounded-2xl mb-8 flex items-center justify-center animate-fade-in">
            <div className="text-primary text-6xl">🏃‍♂️</div>
          </div>
        </div>
        
        {/* Buttons Section */}
        <div className="px-6 pb-8 space-y-4 animate-slide-up">
          <Link to="/signup" className="block">
            <button className="btn-primary w-full">Sign Up</button>
          </Link>
          
          <Link to="/login" className="block">
            <button className="btn-secondary w-full">Login</button>
          </Link>
          
          <button className="btn-google w-full">
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;