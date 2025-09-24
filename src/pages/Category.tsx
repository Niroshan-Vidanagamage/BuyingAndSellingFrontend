// File: src/pages/Category.tsx
import * as React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { api, Listing } from '../api/clients.tsx';
import Grid from '@mui/material/Grid';
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import ListingCard from '../components/ListingCard.tsx';


export default function Category(){
  const { category = '' } = useParams();
  const [params, setParams] = useSearchParams();
  const [items, setItems] = React.useState<Listing[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [filters, setFilters] = React.useState({
    minPrice: params.get('minPrice') || '',
    maxPrice: params.get('maxPrice') || '',
    condition: params.get('condition') || '',
    dateRange: params.get('dateRange') || '',
    sort: params.get('sort') || 'newest'
  });

  const load = React.useCallback(async () => {
    setLoading(true);
    const q = new URLSearchParams({ category, ...Object.fromEntries(Object.entries(filters).filter(([,v]) => v)) });
    //API call to get listings
    const { data } = await api.get(`/listings?${q.toString()}`);
    setItems(data.items || []);
    setLoading(false);
  }, [category, filters]);

  React.useEffect(() => { load(); }, [load]);

  const apply = () => {
    Object.entries(filters).forEach(([k,v]) => v ? params.set(k, String(v)) : params.delete(k));
    setParams(params, { replace: true });
    load();
  };

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2}>{category.replaceAll('_',' ')}</Typography>
      <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
        <TextField label="Min Price" size="small" value={filters.minPrice} onChange={e=>setFilters(s=>({...s,minPrice:e.target.value}))} />
        <TextField label="Max Price" size="small" value={filters.maxPrice} onChange={e=>setFilters(s=>({...s,maxPrice:e.target.value}))} />
        <TextField select size="small" label="Condition" value={filters.condition} onChange={e=>setFilters(s=>({...s,condition:e.target.value}))}>
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="new">Brand New</MenuItem>
          <MenuItem value="used">Used</MenuItem>
        </TextField>
        <TextField select size="small" label="Date Added" value={filters.dateRange} onChange={e=>setFilters(s=>({...s,dateRange:e.target.value}))}>
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="24h">Last 24h</MenuItem>
          <MenuItem value="7d">Last 7 days</MenuItem>
          <MenuItem value="30d">Last 30 days</MenuItem>
        </TextField>
        <TextField select size="small" label="Sort" value={filters.sort} onChange={e=>setFilters(s=>({...s,sort:e.target.value}))}>
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="price_asc">Price ↑</MenuItem>
          <MenuItem value="price_desc">Price ↓</MenuItem>
        </TextField>
        <Button variant="contained" onClick={apply} disabled={loading}>Apply</Button>
      </Box>

      <Grid container spacing={2}>
        {items.map((it) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={it._id}>
            <ListingCard item={it} />
          </Grid>
        ))}
      </Grid>
      {(!loading && items.length === 0) && <Typography mt={3}>No results.</Typography>}
    </Box>
  );
}