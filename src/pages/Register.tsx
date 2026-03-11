// File: src/pages/Register.tsx
//POST /auth/register with name/email/phone/password
//Logs in and store the token like Login
//redirect to Home

import * as React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { api } from '../api/clients.tsx';
import { useNavigate, Link as RouterLink } from 'react-router-dom';


export default function Register(){
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await api.post('/auth/register', { name, email, phone, password });
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('access_token', data.accessToken);
      nav('/');
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <Box component="form" onSubmit={submit} p={2} display="grid" gap={2} maxWidth={420} mx="auto">
      <Typography variant="h5">Create Account</Typography>
      <TextField label="Name" value={name} onChange={e=>setName(e.target.value)} />
      <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <TextField label="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
      <TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" type="submit">Register</Button>
      <Typography variant="body2">Have an account? <RouterLink to="/login">Login</RouterLink></Typography>
    </Box>
  );
}
