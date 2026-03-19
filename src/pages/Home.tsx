// src/pages/Home.tsx
import * as React from 'react';
import { Box, Typography, Card, CardActionArea, Grid, Skeleton, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api, Listing } from '../api/clients.tsx';
import { AppButton, GroupItemCard, SmallItemCard, TextInput } from '../components/ui/index.ts';

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
  const [search, setSearch] = React.useState('');

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
    <Stack spacing={4} p={2}>
      <Box
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 6,
          color: 'common.white',
          background: 'linear-gradient(135deg, #2432D4 0%, #869EFF 100%)',
          boxShadow: '0 30px 70px rgba(36, 50, 212, 0.24)',
        }}
      >
        <Typography variant="h1" sx={{ maxWidth: 560, mb: 1.5 }}>
          Buy and sell faster with a cleaner marketplace flow.
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 540, color: 'rgba(255,255,255,0.86)', mb: 3 }}>
          The home page now uses the new typography scale, search field, action buttons, and card styling from your UI kit notes.
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextInput
            inputSize="search"
            placeholder="Search electronics, vehicles, furniture and more"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            sx={{ flex: 1, '& .MuiOutlinedInput-root': { backgroundColor: 'rgba(255,255,255,0.96)' } }}
          />
          <AppButton variantStyle="master" onClick={() => nav(search ? `/c/${search}` : '/c/ELECTRONICS')}>
            Start browsing
          </AppButton>
        </Stack>
      </Box>

      <Box>
      <Typography variant="h2" mb={2}>Browse Categories</Typography>
      <Grid container spacing={2}>
        {CATS.map((c) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={c}>
            <Card sx={{ height: '100%' }}>
              <CardActionArea onClick={() => nav(`/c/${c}`)} sx={{ p: 3.5, minHeight: 160 }}>
                <Typography variant="h3" sx={{ mb: 1 }}>{c.replaceAll('_',' ')}</Typography>
                <Typography variant="body1" color="text.secondary">
                  Explore curated ads in {c.replaceAll('_', ' ').toLowerCase()}.
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Box>

      <Box>
      <Typography variant="h2" mb={2}>Latest Ads</Typography>
      <Grid container spacing={2}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
                <Skeleton variant="rectangular" height={200} />
                <Skeleton />
                <Skeleton width="60%" />
              </Grid>
            ))
          : latestListings.map((item) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item._id}>
                <SmallItemCard item={item} />
              </Grid>
            ))}
      </Grid>
      {(!loading && latestListings.length === 0) && <Typography mt={3}>No recent ads found.</Typography>}
      </Box>

      {!loading && latestListings.length > 0 && (
        <GroupItemCard
          title="Fresh arrivals"
          description="A grouped card layout that matches your UI spec: title, description, and four small item cards inside."
          items={latestListings}
        />
      )}
    </Stack>
  );
}
