// File: src/pages/Login.tsx
//post /auth/login with email+ password
//stores acess_token in localStorage( Axios client picks it automatically)
//redirect to home
import * as React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { api } from '../api/clients.tsx';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

export default function Login(){
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('access_token', data.accessToken);
      nav('/');
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Login failed');
    }
  };

  return (
    <Box component="form" onSubmit={submit} p={2} display="grid" gap={2} maxWidth={420} mx="auto">
      <Typography variant="h5">Login</Typography>
      <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" type="submit">Login</Button>
      <Typography variant="body2">No account? <RouterLink to="/register">Register</RouterLink></Typography>
    </Box>
  );
}
