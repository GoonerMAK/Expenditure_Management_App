import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Role from './pages/roles';
import AddCategory from './pages/add-category';
import AddFinancial from './pages/add-financial';
import AddProject from './pages/add-project';
import UpdateProject from './pages/update-project';
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
            <Route path="/users-roles" element={<ProtectedRoute><Role /></ProtectedRoute>} />
            <Route path="/add-category" element={<ProtectedRoute><AddCategory /></ProtectedRoute>} />
            <Route path="/add-project" element={<ProtectedRoute><AddProject /></ProtectedRoute>} />
            <Route path="/projects/:id" element={<ProtectedRoute><UpdateProject /></ProtectedRoute>} />
            <Route path="/add-financial-info" element={<ProtectedRoute><AddFinancial /></ProtectedRoute>} />
          </Routes>
      </Router>
      
  );
}

export default App;
