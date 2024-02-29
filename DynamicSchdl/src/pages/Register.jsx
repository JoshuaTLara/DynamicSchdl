import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // New state for displaying messages
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    const bodyObj = {
      email,
      password,
    };

    try {
      const res = await axios.post('/api/register', bodyObj);

      if (res.data.success) {
        setMessage(res.data.message);
        navigate('/navbar');
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setMessage('Registration failed. Please try again.');
    }
  };
  return (
    <>
    <h1>Register</h1>
    {message && <p>{message}</p>}
    <form onSubmit={handleRegister}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  </>
  )
}

export default Register