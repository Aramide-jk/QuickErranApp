import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import SplashScreen from "./components/SplashScreen";
import WelcomeScreen from "./components/WelcomeScreen";
import SignUpScreen from "./components/SignUpScreen";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import NewRequestScreen from "./components/NewRequestScreen";
import ChatScreen from "./components/ChatScreen";
import WalletScreen from "./components/WalletScreen";
import ProfileScreen from "./components/ProfileScreen";
import RatingScreen from "./components/RatingScreen";
import RunnerDashboard from "./components/RunnerDashboard";
import RequestsScreen from "./components/RequestsScreen";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [isRunnerMode, setIsRunnerMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              isRunnerMode ? (
                <RunnerDashboard
                  user={user}
                  setIsRunnerMode={setIsRunnerMode}
                />
              ) : (
                <HomeScreen user={user} />
              )
            ) : (
              <WelcomeScreen />
            )
          }
        />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/signup" element={<SignUpScreen setUser={setUser} />} />
        <Route path="/login" element={<LoginScreen setUser={setUser} />} />
        <Route
          path="/home"
          element={
            isRunnerMode ? (
              <RunnerDashboard user={user} setIsRunnerMode={setIsRunnerMode} />
            ) : (
              <HomeScreen user={user} />
            )
          }
        />
        <Route path="/new-request" element={<NewRequestScreen />} />
        <Route path="/requests" element={<RequestsScreen />} />
        <Route path="/chat" element={<ChatScreen />} />
        <Route path="/wallet" element={<WalletScreen />} />
        <Route
          path="/profile"
          element={
            <ProfileScreen
              user={user}
              setUser={setUser}
              isRunnerMode={isRunnerMode}
              setIsRunnerMode={setIsRunnerMode}
            />
          }
        />
        <Route path="/rating" element={<RatingScreen />} />
        <Route
          path="/runner-dashboard"
          element={
            <RunnerDashboard user={user} setIsRunnerMode={setIsRunnerMode} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
