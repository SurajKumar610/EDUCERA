import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { isAuthenticated } from './services/api';
import './App.css';
import Sidebar from './components/Sidebar';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Attendance from './pages/Attendance';
import Notes from './pages/Notes';
import Profile from './pages/Profile';

// Protected route wrapper
function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <AppLayout />;
}

// Main app layout with sidebar
function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-50 bg-gradient-mesh">
      <Sidebar 
        isMobileOpen={mobileMenuOpen} 
        onCloseMobile={() => setMobileMenuOpen(false)} 
      />
      
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-lg border-b border-dark-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-xl hover:bg-dark-50 transition-colors"
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <h1 className="text-lg font-extrabold font-display gradient-text">EDUCERA <span className="text-xs text-dark-400 font-normal">: Your Full Time Batchie</span></h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      {/* Main content */}
      <main className="lg:ml-72 transition-all duration-300">
        <div className="p-6 pt-20 lg:pt-8 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

// Public route wrapper (redirect to dashboard if already logged in)
function PublicRoute({ children }) {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public landing page */}
        <Route path="/" element={
          isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Landing />
        } />

        {/* Auth routes */}
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;