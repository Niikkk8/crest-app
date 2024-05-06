import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import 'tailwindcss/tailwind.css';
import Home from './pages/Home';
import Learn from './pages/Learn';
import ChatBot from './components/ChatBot';
import Video from './pages/Video';
import Login from './pages/Login';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        setUser(user);
      } else {
        // User is signed out.
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/learn/:id" element={<Learn />} />
        <Route path="/learn/:id/:id" element={<Video />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      </Routes>
      <ChatBot />
    </div>
  );
}

export default App;
