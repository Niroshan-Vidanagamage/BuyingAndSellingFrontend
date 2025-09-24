// File: src/pages/Profile.tsx
//On load, request GET /me and GET /listing?mine=True
//shows editablle fields (name,phone, city) and grid of your listings
//saves profile changes with PATCH /me

import * as React from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { api, Listing, User } from '../api/clients.tsx';
import ListingCard from '../components/ListingCard.tsx';
import Axios from 'axios';

export default function Profile(){
  const [me, setMe] = React.useState<User | null>(null);
  const [myListings, setMyListings] = React.useState<Listing[]>([]);
  const [msg, setMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      const p = api.get('/me');
      const l = api.get('/listings?mine=true'); // implement server-side optional mine filter
      const [{ data: meData }, { data: lData }] = await Promise.all([p, l]);
      setMe(meData);
      setMyListings(lData.items || []);
    })();
  }, []);

  const save = async () => {
    if (!me) return;
    await api.patch('/me', { name: me.name, phone: me.phone, city: me.city });
    setMsg('Saved');
    setTimeout(() => setMsg(null), 1500);
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
              <ListingCard item={it} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
