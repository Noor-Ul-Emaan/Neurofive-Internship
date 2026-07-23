import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

const API = 'http://localhost:5000/api';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));

  const logout = () => {
    localStorage.clear();
    setToken('');
    setUser(null);
  };

  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', background: '#222', color: '#fff', display: 'flex', gap: '15px' }}>
        <Link to="/" style={{ color: '#fff' }}>Dashboard</Link>
        {token ? (
          <>
            <Link to="/projects" style={{ color: '#fff' }}>Projects</Link>
            <button onClick={logout} style={{ marginLeft: 'auto' }}>Logout ({user?.name})</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#fff', marginLeft: 'auto' }}>Login</Link>
            <Link to="/register" style={{ color: '#fff' }}>Register</Link>
          </>
        )}
      </nav>

      <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/projects" element={token ? <Projects token={token} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div>
      <h1>Portfolio Management System</h1>
      <p>Welcome to Week 6 Final Capstone Application. Manage projects and tasks effortlessly.</p>
    </div>
  );
}

function Login({ setToken, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError('Please fill all fields');
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      navigate('/projects');
    } else setError(data.message || 'Login failed');
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login View</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br /><br />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br /><br />
      <button type="submit">Login</button>
    </form>
  );
}

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (data.success) navigate('/login');
    else setMsg(data.message);
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register View</h2>
      {msg && <p style={{ color: 'red' }}>{msg}</p>}
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} /><br /><br />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br /><br />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br /><br />
      <button type="submit">Register</button>
    </form>
  );
}

function Projects({ token }) {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');

  const fetchProjects = async () => {
    const res = await fetch(`${API}/projects`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (data.success) setProjects(data.data);
  };

  useEffect(() => { fetchProjects(); }, []);

  const addProject = async (e) => {
    e.preventDefault();
    if (!title) return;
    await fetch(`${API}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, description: 'Capstone Project' })
    });
    setTitle('');
    fetchProjects();
  };

  return (
    <div>
      <h2>Protected Projects View</h2>
      <form onSubmit={addProject}>
        <input type="text" placeholder="Project Title" value={title} onChange={e => setTitle(e.target.value)} />
        <button type="submit">Add Project</button>
      </form>
      {projects.length === 0 ? <p>No projects found</p> : (
        <ul>
          {projects.map(p => <li key={p._id}>{p.title}</li>)}
        </ul>
      )}
    </div>
  );
}