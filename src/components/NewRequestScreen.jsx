import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, AlertCircle, Menu } from 'lucide-react';
import DesktopSidebar from './DesktopSidebar';

const NewRequestScreen = ({ user }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    budget: '',
    pickupAddress: '',
    deliveryAddress: '',
    preferredTime: 'asap',
    paymentMethod: 'pay-now'
  });
  const [showPaymentAlert, setShowPaymentAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock request submission
    alert('Request submitted successfully!');
    navigate('/requests');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentMethodChange = (value) => {
    if (value === 'pay-on-delivery') {
      setShowPaymentAlert(true);
      setTimeout(() => setShowPaymentAlert(false), 3000);
    }
    setFormData({
      ...formData,
      paymentMethod: value
    });
  };

  return (
    <div className="desktop-layout">
      {/* Desktop Sidebar */}
      <DesktopSidebar user={user} currentPage="new-request" />
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setSidebarOpen(false)}>
          <div className="w-80 bg-white h-full" onClick={(e) => e.stopPropagation()}>
            <DesktopSidebar user={user} currentPage="new-request" mobile onClose={() => setSidebarOpen(false)} />
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
              <Link to="/home" className="lg:hidden p-2">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <h1 className="text-xl lg:text-2xl font-semibold text-text-dark ml-2 lg:ml-0">New Request</h1>
            </div>
          </div>

          {/* Form */}
          <div className="p-4 lg:p-6">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-6 lg:space-y-0">
                  {/* Item Name */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-text-dark mb-2">Item Name</label>
                    <input
                      type="text"
                      name="itemName"
                      value={formData.itemName}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="What do you need?"
                      required
                    />
                  </div>

                  {/* Short Description */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-text-dark mb-2">Short Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className="input-field resize-none"
                      placeholder="Provide more details about your request"
                      required
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-2">Budget (₦)</label>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Enter your budget"
                      required
                    />
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-2">Preferred Time</label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="preferredTime"
                          value="asap"
                          checked={formData.preferredTime === 'asap'}
                          onChange={handleChange}
                          className="mr-2 text-primary"
                        />
                        <span>ASAP</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="preferredTime"
                          value="choose-time"
                          checked={formData.preferredTime === 'choose-time'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Choose Time</span>
                      </label>
                    </div>
                  </div>

                  {/* Pickup Address */}
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-2">Pickup Address</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="pickupAddress"
                        value={formData.pickupAddress}
                        onChange={handleChange}
                        className="input-field pr-12"
                        placeholder="Where should we pick up from?"
                        required
                      />
                      <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-2">Delivery Address</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="deliveryAddress"
                        value={formData.deliveryAddress}
                        onChange={handleChange}
                        className="input-field pr-12"
                        placeholder="Where should we deliver to?"
                        required
                      />
                      <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Payment Method</label>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="pay-now"
                        checked={formData.paymentMethod === 'pay-now'}
                        onChange={(e) => handlePaymentMethodChange(e.target.value)}
                        className="mr-3 text-primary"
                      />
                      <div>
                        <div className="font-medium">Pay Now (Recommended)</div>
                        <div className="text-sm text-gray-600">Secure payment via wallet</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="pay-on-delivery"
                        checked={formData.paymentMethod === 'pay-on-delivery'}
                        onChange={(e) => handlePaymentMethodChange(e.target.value)}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-medium">Pay on Delivery</div>
                        <div className="text-sm text-gray-600">Only for verified users</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Payment Alert */}
                {showPaymentAlert && (
                  <div className="flex items-center p-3 bg-accent bg-opacity-10 border border-accent rounded-lg">
                    <AlertCircle className="w-5 h-5 text-accent mr-2" />
                    <span className="text-sm text-accent">Pay on Delivery is only available to verified users</span>
                  </div>
                )}

                {/* Submit Button */}
                <button type="submit" className="btn-primary w-full mt-8 py-4 text-lg">
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRequestScreen;