import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Notes from './pages/Notes';
import Profile from './pages/Profile';
import { getProfile } from './services/api';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    (async () => {
      try {
        const profile = await getProfile(token);
        setUser(profile);
      } catch (err) {
        setUser(null);
        setToken(null);
      }
    })();
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="app-container">
      <header>
        <h1>Notes App</h1>
        <nav>
          {!token && <Link to="/login">Login</Link>}
          {!token && <Link to="/signup">Signup</Link>}
          {token && <Link to="/notes">Notes</Link>}
          {token && <Link to="/profile">Profile</Link>}
          {token && <button onClick={handleLogout}>Logout</button>}
        </nav>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/notes" /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
          <Route path="/signup" element={<Signup setToken={setToken} setUser={setUser} />} />
          <Route
            path="/notes"
            element={token ? <Notes token={token} /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={token ? <Profile token={token} user={user} /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
