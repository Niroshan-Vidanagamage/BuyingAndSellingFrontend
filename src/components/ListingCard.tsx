// File: src/components/ListingCard.tsx
import * as React from 'react';
import { Card, CardContent, CardActions, Typography, Button, CardMedia, Box } from '@mui/material';
import { Listing } from '../api/clients';
import { Link as RouterLink } from 'react-router-dom';


export default function ListingCard({ item }: { item: Listing }){
    const thumb = item.images?.find(i => i.kind === 'thumb') || item.images?.[0];
    return (
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
            {thumb ? (
                <CardMedia component="img" height="160" image={thumb.url} alt={item.title} />
            ) : (
            <Box height={160} sx={{ bgcolor: 'grey.200' }} />
            )}
            <CardContent>
                <Typography variant="subtitle1" noWrap>{item.title}</Typography>
                <Typography variant="h6">{new Intl.NumberFormat(undefined, { style: 'currency', currency: 'LKR' }).format(item.price)}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {item.condition === 'new' ? 'Brand New' : 'Used'}{item.locationCity ? ` · ${item.locationCity}` : ''}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" component={RouterLink} to={`/listing/${item._id}`}>View</Button>
            </CardActions>
        </Card>
    );
}