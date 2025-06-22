import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, User, MessageCircle, Phone, Menu } from 'lucide-react';
import BottomNavigation from './BottomNavigation';
import DesktopSidebar from './DesktopSidebar';

const RequestsScreen = ({ user }) => {
  const [activeTab, setActiveTab] = useState('active');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeRequests = [
    {
      id: 1,
      title: 'Grocery Shopping',
      description: 'Pick up groceries from Shoprite',
      budget: 5000,
      status: 'in-progress',
      runner: {
        name: 'Michael Johnson',
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
        rating: 4.8
      },
      createdAt: '2025-01-15T10:30:00Z',
      pickupAddress: 'Shoprite, Victoria Island',
      deliveryAddress: 'Home - Lekki Phase 1'
    },
    {
      id: 2,
      title: 'Document Delivery',
      description: 'Deliver contract documents to client',
      budget: 2500,
      status: 'pending',
      createdAt: '2025-01-15T14:20:00Z',
      pickupAddress: 'Office - Victoria Island',
      deliveryAddress: 'Client Office - Ikeja'
    }
  ];

  const completedRequests = [
    {
      id: 3,
      title: 'Food Delivery',
      description: 'Order from KFC and deliver',
      budget: 3500,
      status: 'completed',
      runner: {
        name: 'Sarah Williams',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        rating: 4.9
      },
      createdAt: '2025-01-14T18:45:00Z',
      completedAt: '2025-01-14T19:30:00Z'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const RequestCard = ({ request }) => (
    <div className="bg-white rounded-xl p-4 lg:p-6 border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-text-dark text-lg mb-1">{request.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{request.description}</p>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Clock className="w-4 h-4 mr-1" />
            <span>{formatTime(request.createdAt)}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
            {request.status.replace('-', ' ').toUpperCase()}
          </span>
          <span className="text-lg font-bold text-primary mt-2">₦{request.budget.toLocaleString()}</span>
        </div>
      </div>

      {request.runner && (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-3">
          <div className="flex items-center">
            <img
              src={request.runner.avatar}
              alt={request.runner.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-medium text-text-dark text-sm">{request.runner.name}</p>
              <div className="flex items-center">
                <span className="text-yellow-500 text-sm">★</span>
                <span className="text-sm text-gray-600 ml-1">{request.runner.rating}</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Link to="/chat" className="p-2 bg-primary text-white rounded-full hover:bg-opacity-90">
              <MessageCircle className="w-4 h-4" />
            </Link>
            <button className="p-2 bg-green-600 text-white rounded-full hover:bg-opacity-90">
              <Phone className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2 text-sm">
        <div className="flex items-start">
          <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
          <div>
            <p className="text-gray-600">Pickup: {request.pickupAddress}</p>
            <p className="text-gray-600">Delivery: {request.deliveryAddress}</p>
          </div>
        </div>
      </div>

      {request.status === 'completed' && (
        <div className="mt-4 pt-3 border-t">
          <Link to="/rating" className="btn-primary w-full text-center py-2">
            Rate Runner
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <div className="desktop-layout">
      {/* Desktop Sidebar */}
      <DesktopSidebar user={user} currentPage="requests" />
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setSidebarOpen(false)}>
          <div className="w-80 bg-white h-full" onClick={(e) => e.stopPropagation()}>
            <DesktopSidebar user={user} currentPage="requests" mobile onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      <div className="container-responsive desktop-main">
        <div className="min-h-screen bg-bg-soft pb-20 lg:pb-0">
          {/* Header */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b bg-white">
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
              <h1 className="text-xl lg:text-2xl font-semibold text-text-dark ml-2 lg:ml-0">My Requests</h1>
            </div>
            <Link to="/new-request" className="hidden lg:block btn-primary">
              New Request
            </Link>
          </div>

          {/* Tabs */}
          <div className="bg-white border-b">
            <div className="flex p-4 lg:p-6">
              <button
                onClick={() => setActiveTab('active')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  activeTab === 'active'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Active ({activeRequests.length})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ml-2 ${
                  activeTab === 'completed'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Completed ({completedRequests.length})
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 lg:p-6">
            <div className="max-w-4xl mx-auto">
              {activeTab === 'active' && (
                <div className="space-y-4 lg:space-y-6">
                  {activeRequests.length > 0 ? (
                    activeRequests.map((request) => (
                      <RequestCard key={request.id} request={request} />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-2">No Active Requests</h3>
                      <p className="text-gray-500 mb-6">You don't have any active requests at the moment</p>
                      <Link to="/new-request" className="btn-primary">
                        Create New Request
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'completed' && (
                <div className="space-y-4 lg:space-y-6">
                  {completedRequests.length > 0 ? (
                    completedRequests.map((request) => (
                      <RequestCard key={request.id} request={request} />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-2">No Completed Requests</h3>
                      <p className="text-gray-500">Your completed requests will appear here</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <BottomNavigation currentPage="requests" />
      </div>
    </div>
  );
};

export default RequestsScreen;