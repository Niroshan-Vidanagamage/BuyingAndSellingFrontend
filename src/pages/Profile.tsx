// File: src/pages/Profile.tsx
//On load, request GET /me and GET /listing?mine=True
//shows editablle fields (name,phone, city) and grid of your listings
//saves profile changes with PATCH /me

import * as React from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api, Listing, User } from '../api/clients.tsx';
import { SmallItemCard } from '../components/ui/index.ts';

export default function Profile(){
  const [me, setMe] = React.useState<User | null>(null);
  const [myListings, setMyListings] = React.useState<Listing[]>([]);
  const [msg, setMsg] = React.useState<string | null>(null);
  const nav = useNavigate();


  // By adding the access token to the dependency array, this effect will re-run
  // whenever a user logs in or out, ensuring the data is always fresh.
  const token = localStorage.getItem('access_token');

  React.useEffect(() => {
    (async () => {
      try {
        if (!token) {
          nav('/login');
          return;
        }
        const p = api.get('/users/me');
        const l = api.get('/listings?mine=true');
        const [{ data: meData }, { data: lData }] = await Promise.all([p, l]);
        setMe(meData);
        setMyListings(lData.items || []);
      } catch (error) {
        // If there's an error (e.g., invalid token), redirect to login
        localStorage.removeItem('access_token');
        nav('/login');
      }
    })();
  }, [token, nav]);

  const save = async () => {
    if (!me) return;
    await api.patch('/users/me', { name: me.name, phone: me.phone, city: me.city });
    setMsg('Saved');
    setTimeout(() => setMsg(null), 1500);
  };

  const onEdit = (id: string) => {
    nav(`/listing/edit/${id}`);
  };

  const onDelete = async (id: string) => {
    // It's a good practice to ask for confirmation before deleting
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await api.delete(`/listings/${id}`);
        setMyListings(currentListings => currentListings.filter(l => l._id !== id));
      } catch (error) {
        console.error('Failed to delete listing:', error);
      }
    }
  };

  if (!me) return <Box p={2}><Typography>Loading…</Typography></Box>;

  return (
    <Box p={2} display="grid" gap={3}>
      <Box display="grid" gap={2} maxWidth={480}>
        <Typography variant="h5">My Profile</Typography>
        <TextField label="Name" value={me.name} onChange={e=>setMe({ ...me!, name: e.target.value })} />
        <TextField label="Email" value={me.email} disabled />
        <TextField label="Phone" value={me.phone} onChange={e=>setMe({ ...me!, phone: e.target.value })} />
        <TextField label="City" value={me.city || ''} onChange={e=>setMe({ ...me!, city: e.target.value })} />
        <Button variant="contained" onClick={save}>Save</Button>
        {msg && <Typography color="success.main">{msg}</Typography>}
      </Box>

      <Box>
        <Typography variant="h6" mb={1}>My Listings</Typography>
        <Grid container spacing={2}>
          {myListings.map(it => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={it._id}>
              <SmallItemCard item={it} onEdit={onEdit} onDelete={onDelete} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
