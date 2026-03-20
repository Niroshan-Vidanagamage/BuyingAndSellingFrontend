// src/pages/Home.tsx
import * as React from 'react';
import { Box, Typography, Stack, Grid, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api, Listing } from '../api/clients.tsx';
import { AppButton, GroupItemCard, TextInput } from '../components/ui/index.ts';

const CATS = [
  'HOUSES_LANDS',
  'ELECTRONICS',
  'FURNITURE_HOUSEWARE',
  'SPORTS_EQUIPMENT',
  'VEHICLES',
] as const;

function formatCategoryLabel(category: (typeof CATS)[number]) {
  return category.replaceAll('_', ' ');
}

export default function Home() {
  const nav = useNavigate();
  const [latestListings, setLatestListings] = React.useState<Listing[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const { data } = await api.get('/listings?sort=newest&limit=60');
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
        <Typography variant="h2" mb={2}>Browse by Category</Typography>
        <Stack spacing={3}>
          {loading && <Typography>Loading category sections...</Typography>}

          {!loading && (
            <Grid container spacing={2}>
              {CATS.map((category) => {
                const categoryItems = latestListings.filter((item) => item.category === category);
                const label = formatCategoryLabel(category);

                return (
                  <Grid key={category} size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                    <GroupItemCard
                      title={label}
                      description={`Explore curated ads in ${label.toLowerCase()}.`}
                      items={categoryItems}
                    />
                  </Grid>
                );
              })}
            </Grid>
          )}

          {!loading && latestListings.length === 0 && (
            <Typography>No recent ads found.</Typography>
          )}
        </Stack>
      </Box>

      <GroupItemCard
        title="Fresh arrivals"
        description="A grouped card layout that matches your UI spec: title, description, and four small item cards inside."
        items={latestListings}
      />

      <Box>
        <Grid container spacing={2}>
          <Grid size={{ sm: 6, md: 4, lg: 4 }}>
            <Card
              sx={{
                backgroundColor: '#2432D4',
                color: 'common.white',
                minHeight: 100,
                width: '100%',
                p: 3,
                borderRadius: 0.5,
                textAlign: 'center',
              }}
            >
              <Typography variant="body1">
                100 000+ products sold
              </Typography>
            </Card>
          </Grid>
          <Grid size={{ sm: 6, md: 4, lg: 4 }}>
            <Card
              sx={{
                backgroundColor: '#869EFF',
                color: 'common.black',
                minHeight: 100,
                width: '100%',
                p: 3,
                borderRadius: 0.5,
                textAlign: 'center',
              }}
            >
              <Typography variant="body1">
                2 500+ monthly users
              </Typography>
            </Card>
          </Grid>
          <Grid size={{ sm: 6, md: 4, lg: 4 }}>
            <Card
              sx={{
                backgroundColor: '#2432D4',
                color: 'common.white',
                minHeight: 100,
                width: '100%',
                p: 3,
                borderRadius: 0.5,
                textAlign: 'center',
              }}
            >
              <Typography variant="body1">
                400+ ADs today
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}
