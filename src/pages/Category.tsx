// File: src/pages/Category.tsx
import * as React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { api, Listing } from '../api/clients.tsx';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Box, Typography } from '@mui/material';
import Filters, { FilterState } from '../components/Filters.tsx';
import { SmallItemCard } from '../components/ui/index.ts';


export default function Category(){
  const { category = '' } = useParams();
  const [params, setParams] = useSearchParams();
  const [items, setItems] = React.useState<Listing[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [filters, setFilters] = React.useState<FilterState>({
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
      <Typography variant="h2" mb={2}>{category.replaceAll('_',' ')}</Typography>

      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} alignItems="flex-start">
        <Filters value={filters} onChange={setFilters} onApply={apply} disabled={loading} asSidebar />

        <Box sx={{ flex: 1, width: '100%' }}>
          <Grid container spacing={2}>
            {items.map((it) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, xl: 3 }} key={it._id}>
                <SmallItemCard item={it} />
              </Grid>
            ))}
          </Grid>
          {(!loading && items.length === 0) && <Typography mt={3}>No results.</Typography>}
        </Box>
      </Stack>
    </Box>
  );
}