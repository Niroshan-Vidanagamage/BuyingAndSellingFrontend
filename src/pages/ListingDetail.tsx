// src/pages/ListingDetail.tsx

// shows main image and thumbnail srtips. Renders title, price, condition, category, posted date and description
// Display sellers phone number and E-mail
import * as React from 'react';
import Grid from '@mui/material/Grid'; // classic Grid API (uses container/item)
import {
  Box,
  Typography,
  Chip,
  Divider,
  Stack,
  Skeleton,
  Button,
  Paper,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { api, Listing } from '../api/clients.tsx';

const CURRENCY = 'LKR';

function friendlyCategory(c: Listing['category']) {
  return c.replaceAll('_', ' ');
}

function friendlyCondition(c: Listing['condition']) {
  return c === 'new' ? 'Brand New' : 'Used';
}

export default function ListingDetail() {
  const { id = '' } = useParams();
  const [item, setItem] = React.useState<Listing | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [imgIdx, setImgIdx] = React.useState(0);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await api.get(`/listings/${id}`);
        // Backend may return either the object directly or wrapped as { item: {...} }
        const listing: Listing = data?.item ?? data;
        if (mounted) {
          setItem(listing);
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handlePayment = async () => {
    if (!item) return;
    try {
      // Request a checkout session from the backend
      const { data } = await api.post(`/listings/${item._id}/create-checkout-session`);
      if (data.url) {
        // Redirect the user to Stripe's checkout page
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Failed to create payment session:', err);
      // You can add a user-facing error message here, e.g., using a snackbar
      alert('Could not connect to payment provider. Please try again later.');
    }
  };


  if (loading) {
    return (
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Skeleton variant="rectangular" height={360} />
            <Stack direction="row" spacing={1} mt={1}>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} variant="rectangular" width={80} height={80} />
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Skeleton width={280} height={40} />
            <Skeleton width={180} height={32} />
            <Skeleton height={24} width="60%" />
            <Divider sx={{ my: 2 }} />
            <Skeleton height={24} width="50%" />
            <Skeleton height={24} width="40%" />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (!item) {
    return (
      <Box p={2}>
        <Typography>Listing not found.</Typography>
      </Box>
    );
  }

  // Prefer original images for main carousel; use thumbs for the strip when available
  const originals = (item.images || []).filter((i) => i.kind !== 'thumb');
  const thumbs = (item.images || []).filter((i) => i.kind === 'thumb');
  const mainImages = originals.length ? originals : item.images || [];
  const hasImages = mainImages.length > 0;
  const mainImg = hasImages ? mainImages[Math.min(imgIdx, mainImages.length - 1)] : null;

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {/* Left: images */}
        <Grid item xs={12} md={7}>
          <Paper variant="outlined" sx={{ p: 1, borderRadius: 2 }}>
            {mainImg ? (
              <Box
                component="img"
                src={mainImg.url}
                alt={item.title}
                sx={{ width: '100%', height: 360, objectFit: 'cover', borderRadius: 1 }}
              />
            ) : (
              <Box sx={{ width: '100%', height: 360, bgcolor: 'grey.200', borderRadius: 1 }} />
            )}
          </Paper>

          {/* Thumbnails */}
          <Stack direction="row" spacing={1} mt={1} sx={{ overflowX: 'auto' }}>
            {(thumbs.length ? thumbs : mainImages).map((img, i) => (
              <Box
                key={i}
                component="img"
                src={img.url}
                alt={`thumb-${i}`}
                onClick={() => setImgIdx(i)}
                sx={{
                  width: 84,
                  height: 84,
                  objectFit: 'cover',
                  borderRadius: 1,
                  cursor: 'pointer',
                  outline: i === imgIdx ? '3px solid rgba(25,118,210,0.7)' : '1px solid rgba(0,0,0,0.12)',
                }}
              />
            ))}
          </Stack>
        </Grid>

        {/* Right: details */}
        <Grid item xs={12} md={5}>
          <Typography variant="h5" gutterBottom>
            {item.title}
          </Typography>

          <Typography variant="h4" sx={{ mb: 1 }}>
            {new Intl.NumberFormat(undefined, { style: 'currency', currency: CURRENCY }).format(
              item.price ?? 0
            )}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <Chip size="small" label={friendlyCondition(item.condition)} />
            <Chip size="small" label={friendlyCategory(item.category)} />
            {item.locationCity && <Chip size="small" label={item.locationCity} />}
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Posted on {new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(item.createdAt))}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {item.description || 'No description provided.'}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Seller Contact
          </Typography>
          <Typography variant="body1">
            {/* Expecting backend to expose public contact on the listing, e.g., item.seller or flattened fields */}
            Phone:{' '}
            <strong>
              {(item as any)?.seller?.phone || (item as any)?.sellerPhone || 'Not available'}
            </strong>
          </Typography>
          <Typography variant="body1">
            Email:{' '}
            <strong>
              {(item as any)?.seller?.email || (item as any)?.sellerEmail || 'Not available'}
            </strong>
          </Typography>

          <Button variant="contained" color="primary" sx={{ mt: 3, width: '100%' }} onClick={handlePayment}>
            Pay with Stripe
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}