// File: src/pages/EditingList.tsx
// Loads exsisting data from GET/listinh/:id, hydrates the form and let user to change fields or add more photos.
//submit PATCH/Listings/:id, (multipart) the same way as newListing
import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api/clients.tsx';
import { Box, TextField, MenuItem, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateListingSchema } from '../schemas/listing.ts';
import * as Zod from 'zod';

type EditListingFormData = Zod.infer<typeof CreateListingSchema> & {
  photos: FileList;
};
 
export default function EditListing(){
  const { id = '' } = useParams();
  const nav = useNavigate();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EditListingFormData>({
    resolver: zodResolver(CreateListingSchema),
  });
 
  React.useEffect(() => {
    (async () => {
      const { data } = await api.get(`/listings/${id}`);
      // Use reset to populate the form with fetched data
      reset({ ...data, price: data.price?.toString() });
    })();
  }, [id, reset]);

  const onSubmit = async (data: EditListingFormData) => {
    const fd = new FormData();
    // Append all form fields to FormData
    for (const key in data) {
      if (key === 'photos') {
        Array.from(data.photos as FileList).forEach(f => fd.append('photos', f));
      } else if (data[key as keyof EditListingFormData] !== undefined) {
        fd.append(key, data[key as keyof EditListingFormData] as string);
      }
    }
    await api.patch(`/listings/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    nav('/profile'); // Navigate to profile after successful edit
  };
 
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} p={2} display="grid" gap={2}>
      <Typography variant="h5">Edit Listing</Typography>
      <TextField label="Title" {...register('title')} error={!!errors.title} helperText={errors.title?.message as string} />
      <TextField label="Description" multiline rows={4} {...register('description')} />
      <TextField select label="Category" defaultValue="ELECTRONICS" {...register('category')}>
        {['HOUSES_LANDS','ELECTRONICS','FURNITURE_HOUSEWARE','SPORTS_EQUIPMENT','VEHICLES'].map(c => <MenuItem key={c} value={c}>{c.replaceAll('_',' ')}</MenuItem>)}
      </TextField>
      <TextField type="number" label="Price" {...register('price', { valueAsNumber: true })} />
      <TextField select label="Condition" defaultValue="new" {...register('condition')}>
        <MenuItem value="new">Brand New</MenuItem>
        <MenuItem value="used">Used</MenuItem>
      </TextField>
      <TextField label="City" {...register('locationCity')} />
      <Typography variant="body2" color="text.secondary">Upload new photos to add them to the listing.</Typography>
      <input type="file" accept="image/*" multiple {...register('photos')} />
      <Button variant="contained" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving…' : 'Save Changes'}</Button>
    </Box>
  );
}
