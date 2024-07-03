import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import { Signup } from './pages/signup';
import ProtectedRoute from './components/protected-route';
import GuestRoute from './components/guest-route';

function App() {
  return (
      <Router>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Routes>
      </Router>
  );
}

export default App;
