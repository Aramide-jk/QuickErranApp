import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Menu,
} from "lucide-react";
import BottomNavigation from "./BottomNavigation";
import DesktopSidebar from "./DesktopSidebar";

const WalletScreen = ({ user }) => {
  const [walletBalance] = useState(15750);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const transactions = [
    {
      id: 1,
      description: "Grocery pickup payment",
      date: "2025-01-15",
      amount: -3500,
      type: "payment",
      status: "completed",
    },
    {
      id: 2,
      description: "Wallet top-up",
      date: "2025-01-14",
      amount: 10000,
      type: "credit",
      status: "completed",
    },
    {
      id: 3,
      description: "Document delivery",
      date: "2025-01-13",
      amount: -1200,
      type: "payment",
      status: "completed",
    },
    {
      id: 4,
      description: "Refund - Cancelled order",
      date: "2025-01-12",
      amount: 2450,
      type: "refund",
      status: "completed",
    },
    {
      id: 5,
      description: "Food delivery payment",
      date: "2025-01-11",
      amount: -4500,
      type: "payment",
      status: "completed",
    },
  ];

  const handleAddMoney = (e) => {
    e.preventDefault();
    if (addAmount) {
      alert(`₦${addAmount} added to wallet successfully!`);
      setAddAmount("");
      setShowAddMoney(false);
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(Math.abs(amount));
  };

  const getTransactionIcon = (type) => {
    if (type === "credit" || type === "refund") {
      return <TrendingUp className="w-5 h-5 text-green-600" />;
    }
    return <TrendingDown className="w-5 h-5 text-red-600" />;
  };

  return (
    <div className="desktop-layout">
      {/* Desktop Sidebar */}
      <DesktopSidebar user={user} currentPage="wallet" />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setSidebarOpen(false)}>
          <div
            className="w-80 bg-white h-full"
            onClick={(e) => e.stopPropagation()}>
            <DesktopSidebar
              user={user}
              currentPage="wallet"
              mobile
              onClose={() => setSidebarOpen(false)}
            />
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
                className="lg:hidden p-2 -ml-2 mr-2 hover:bg-gray-100 rounded-lg">
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <Link to="/home" className="lg:hidden p-2">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <h1 className="text-xl lg:text-2xl font-semibold text-text-dark ml-2 lg:ml-0">
                Wallet
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 lg:p-6">
            <div className="max-w-4xl mx-auto">
              <div className="lg:grid lg:grid-cols-3 lg:gap-6">
                {/* Left Column - Wallet Balance */}
                <div className="lg:col-span-1">
                  {/* Wallet Balance Card */}
                  <div className="bg-primary text-white p-6 lg:p-8 rounded-2xl mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-white text-opacity-80 text-sm">
                          Wallet Balance
                        </p>
                        <h2 className="text-3xl lg:text-4xl font-bold">
                          {formatAmount(walletBalance)}
                        </h2>
                      </div>
                      <CreditCard className="w-8 h-8 text-white text-opacity-80" />
                    </div>

                    <button
                      onClick={() => setShowAddMoney(true)}
                      className="bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)] text-white py-3 px-4 rounded-lg font-medium flex items-center gap-2 transition-colors w-full justify-center cursor-pointer">
                      <Plus className="w-4 h-4" />
                      Add Money
                    </button>
                  </div>

                  {/* Cash Advance Section */}
                  <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-6 rounded-2xl mb-6 lg:mb-0">
                    <h3 className="font-semibold mb-2">Need Cash Advance?</h3>
                    <p className="text-sm text-white text-opacity-90 mb-4">
                      Verified runners can apply for cash advances up to ₦50,000
                    </p>
                    <button className="bg-white text-orange-500 cursor-pointer py-2 px-4 rounded-lg font-medium text-sm w-full">
                      Apply Now
                    </button>
                  </div>
                </div>

                {/* Right Column - Transaction History */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl p-6 lg:p-8">
                    <h3 className="text-lg lg:text-xl font-semibold text-text-dark mb-6">
                      Recent Transactions
                    </h3>

                    <div className="space-y-4">
                      {transactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-center">
                            <div className="p-3 bg-gray-100 rounded-full mr-4">
                              {getTransactionIcon(transaction.type)}
                            </div>
                            <div>
                              <p className="font-medium text-text-dark">
                                {transaction.description}
                              </p>
                              <p className="text-gray-500 text-sm">
                                {new Date(
                                  transaction.date
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <p
                              className={`font-semibold text-lg ${
                                transaction.amount > 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}>
                              {transaction.amount > 0 ? "+" : ""}
                              {formatAmount(transaction.amount)}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">
                              {transaction.status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add Money Modal */}
          {showAddMoney && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold text-text-dark mb-4">
                  Add Money
                </h3>

                <form onSubmit={handleAddMoney}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-text-dark mb-2">
                      Amount (₦)
                    </label>
                    <input
                      type="number"
                      value={addAmount}
                      onChange={(e) => setAddAmount(e.target.value)}
                      className="input-field"
                      placeholder="Enter amount"
                      required
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddMoney(false)}
                      className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer">
                      Cancel
                    </button>
                    <button type="submit" className="flex-1 btn-primary">
                      Add Money
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        <BottomNavigation currentPage="wallet" />
      </div>
    </div>
  );
};

export default WalletScreen;
