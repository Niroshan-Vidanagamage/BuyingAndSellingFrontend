// src/pages/Home.tsx
import * as React from 'react';
import { Box, Typography, Card, CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

const CATS = [
  'HOUSES_LANDS',
  'ELECTRONICS',
  'FURNITURE_HOUSEWARE',
  'SPORTS_EQUIPMENT',
  'VEHICLES',
];

export default function Home() {
  const nav = useNavigate();
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
    </Box>
  );
}
