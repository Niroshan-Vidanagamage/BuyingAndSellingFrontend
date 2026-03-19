// File: src/pages/EditingList.tsx
// Loads exsisting data from GET/listinh/:id, hydrates the form and let user to change fields or add more photos.
//submit PATCH/Listings/:id, (multipart) the same way as newListing
import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api/clients.tsx';
import { Box, MenuItem, Stack, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateListingSchema } from '../schemas/listing.ts';
import * as Zod from 'zod';
import { AppButton, TextInput } from '../components/ui/index.ts';

const EditListingFormSchema = CreateListingSchema.extend({
  photos: Zod.custom<FileList>().optional(),
});

type EditListingFormInput = Zod.input<typeof EditListingFormSchema>;
type EditListingFormOutput = Zod.output<typeof EditListingFormSchema>;
 
export default function EditListing(){
  const { id = '' } = useParams();
  const nav = useNavigate();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EditListingFormInput, unknown, EditListingFormOutput>({
    resolver: zodResolver(EditListingFormSchema),
  });
 
  React.useEffect(() => {
    (async () => {
      const { data } = await api.get(`/listings/${id}`);
      // Use reset to populate the form with fetched data
      reset({ ...data, price: Number(data.price) || 0 } as EditListingFormInput);
    })();
  }, [id, reset]);

  const onSubmit: SubmitHandler<EditListingFormOutput> = async (data) => {
    const fd = new FormData();
    const photos = data.photos;

    // Append all form fields to FormData
    for (const key in data) {
      if (key === 'photos' && photos) {
        Array.from(photos).forEach(f => fd.append('photos', f));
      } else if (data[key as keyof EditListingFormOutput] !== undefined) {
        fd.append(key, String(data[key as keyof EditListingFormOutput]));
      }
    }
    await api.patch(`/listings/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    nav('/profile'); // Navigate to profile after successful edit
  };
 
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} p={{ xs: 2, md: 3 }} maxWidth={760} mx="auto" display="grid" gap={2}>
      <Typography variant="h1">Edit Listing</Typography>
      <TextInput label="Title" {...register('title')} error={!!errors.title} helperText={errors.title?.message as string} />
      <TextInput label="Description" multiline rows={4} {...register('description')} />
      <TextInput select label="Category" defaultValue="ELECTRONICS" {...register('category')}>
        {['HOUSES_LANDS','ELECTRONICS','FURNITURE_HOUSEWARE','SPORTS_EQUIPMENT','VEHICLES'].map(c => <MenuItem key={c} value={c}>{c.replaceAll('_',' ')}</MenuItem>)}
      </TextInput>
      <TextInput type="number" label="Price" {...register('price', { valueAsNumber: true })} />
      <TextInput select label="Condition" defaultValue="new" {...register('condition')}>
        <MenuItem value="new">Brand New</MenuItem>
        <MenuItem value="used">Used</MenuItem>
      </TextInput>
      <TextInput label="City" {...register('locationCity')} />
      <Typography variant="body2" color="text.secondary">Upload new photos to add them to the listing.</Typography>
      <Stack spacing={1}>
        <input type="file" accept="image/*" multiple {...register('photos')} />
      </Stack>
      <AppButton variantStyle="master" type="submit" disabled={isSubmitting} sx={{ maxWidth: 220 }}>
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </AppButton>
    </Box>
  );
}
