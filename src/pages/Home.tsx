// src/pages/Home.tsx
import * as React from 'react';
import { Box, Typography, Card, CardActionArea, Grid, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api, Listing } from '../api/clients.tsx';
import ListingCard from '../components/ListingCard.tsx';

const CATS = [
  'HOUSES_LANDS',
  'ELECTRONICS',
  'FURNITURE_HOUSEWARE',
  'SPORTS_EQUIPMENT',
  'VEHICLES',
];

export default function Home() {
  const nav = useNavigate();
  const [latestListings, setLatestListings] = React.useState<Listing[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const { data } = await api.get('/listings?sort=newest&limit=10');
      if (mounted) {
        setLatestListings(data.items || []);
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);
  return (
    <Box p={2}>
      <Typography variant="h4" mb={2}>Browse Categories</Typography>
      <Grid container spacing={2}>
        {CATS.map((c) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={c}>
            <Card>
              <CardActionArea onClick={() => nav(`/c/${c}`)} sx={{ p: 3 }}>
                <Typography variant="h6">{c.replaceAll('_',' ')}</Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" mt={4} mb={2}>Latest Ads</Typography>
      <Grid container spacing={2}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <Skeleton variant="rectangular" height={200} />
                <Skeleton />
                <Skeleton width="60%" />
              </Grid>
            ))
          : latestListings.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <ListingCard item={item} />
              </Grid>
            ))}
      </Grid>
      {(!loading && latestListings.length === 0) && <Typography mt={3}>No recent ads found.</Typography>}
    </Box>
  );
}
