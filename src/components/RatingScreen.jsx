import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Menu } from 'lucide-react';
import DesktopSidebar from './DesktopSidebar';

const RatingScreen = ({ user }) => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    
    // Mock submission
    alert('Thank you for your feedback!');
    navigate('/requests');
  };

  const StarButton = ({ index, filled, onHover, onClick }) => (
    <button
      type="button"
      className={`p-1 transition-colors ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(0)}
      onClick={() => onClick(index)}
    >
      <Star className="w-8 h-8 lg:w-10 lg:h-10 fill-current" />
    </button>
  );

  return (
    <div className="desktop-layout">
      {/* Desktop Sidebar */}
      <DesktopSidebar user={user} currentPage="rating" />
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setSidebarOpen(false)}>
          <div className="w-80 bg-white h-full" onClick={(e) => e.stopPropagation()}>
            <DesktopSidebar user={user} currentPage="rating" mobile onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      <div className="container-responsive desktop-main">
        <div className="min-h-screen bg-white">
          {/* Header */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b">
            <div className="flex items-center">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 mr-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <Link to="/requests" className="lg:hidden p-2">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <h1 className="text-xl lg:text-2xl font-semibold text-text-dark ml-2 lg:ml-0">Rate Runner</h1>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 lg:p-6">
            <div className="max-w-2xl mx-auto">
              {/* Runner Info */}
              <div className="text-center mb-8 lg:mb-12">
                <img
                  src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="Runner"
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-full mx-auto mb-4 shadow-lg"
                />
                <h2 className="text-xl lg:text-2xl font-bold text-text-dark mb-1">Michael Johnson</h2>
                <p className="text-gray-600">Grocery Pickup • Completed</p>
                <div className="flex items-center justify-center mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-green-600">Order delivered successfully</span>
                </div>
              </div>

              {/* Rating Form */}
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Star Rating */}
                <div className="text-center">
                  <h3 className="text-lg lg:text-xl font-semibold text-text-dark mb-6">How was your experience?</h3>
                  <div className="flex justify-center space-x-2 mb-4">
                    {[1, 2, 3, 4, 5].map((index) => (
                      <StarButton
                        key={index}
                        index={index}
                        filled={index <= (hoveredRating || rating)}
                        onHover={setHoveredRating}
                        onClick={setRating}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">
                    {rating === 1 && 'Poor'}
                    {rating === 2 && 'Fair'}
                    {rating === 3 && 'Good'}
                    {rating === 4 && 'Very Good'}
                    {rating === 5 && 'Excellent'}
                    {rating === 0 && 'Tap a star to rate'}
                  </p>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Write a short review (Optional)
                  </label>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows="4"
                    className="input-field resize-none"
                    placeholder="Share your experience with other users..."
                  />
                </div>

                {/* Quick Review Options */}
                <div>
                  <p className="text-sm font-medium text-text-dark mb-3">Quick feedback:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Professional',
                      'On Time',
                      'Polite',
                      'Careful handling',
                      'Good communication',
                      'Reliable'
                    ].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setReview(prev => prev ? `${prev}, ${tag}` : tag)}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tips Section */}
                <div className="bg-secondary bg-opacity-30 p-6 rounded-xl">
                  <h4 className="font-medium text-text-dark mb-2">💡 Leave a tip?</h4>
                  <p className="text-sm text-gray-600 mb-4">Show appreciation for great service</p>
                  <div className="flex gap-3">
                    {['₦100', '₦200', '₦500'].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:border-primary hover:text-primary transition-colors"
                      >
                        {amount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn-primary w-full py-4 text-lg">
                  Submit Rating
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingScreen;