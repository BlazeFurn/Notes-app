import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/api';

export default function Signup({ setToken, setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { token, user } = await signup({ name, email, password });
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      navigate('/notes');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" required />
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        <button type="submit">Sign Up</button>
        {error && <div className="alert">{error}</div>}
      </form>
    </div>
  );
}
