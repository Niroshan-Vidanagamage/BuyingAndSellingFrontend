// pages/NewListing.tsx
//Collects Title, description, photos etc... 
//Build formdata with fields+ image files from ImageUploader then post/listings
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateListingSchema } from '../schemas/listing.ts';
import { Box, MenuItem, Stack, Typography } from '@mui/material';
import { api } from '../api/clients.tsx';
import * as Zod from 'zod';
import { AppButton, TextInput } from '../components/ui/index.ts';

const NewListingFormSchema = CreateListingSchema.extend({
    photos: Zod.custom<FileList>().optional(),
});

type NewListingFormInput = Zod.input<typeof NewListingFormSchema>;
type NewListingFormOutput = Zod.output<typeof NewListingFormSchema>;

export default function NewListing(){
    
    // Use the new type with useForm
    const { register, handleSubmit, formState: { errors } } = useForm<NewListingFormInput, unknown, NewListingFormOutput>({
        resolver: zodResolver(NewListingFormSchema),
        defaultValues: { category: 'ELECTRONICS', condition: 'new' }
    });
    const onSubmit: SubmitHandler<NewListingFormOutput> = async (data) => {
        // react-hook-form's `data` object now includes the files.
        const fd = new FormData();
        const photos = data.photos;

        for (const key in data) {
            if (key === 'photos' && photos) Array.from(photos).forEach(f => fd.append('photos', f));
            else if (key !== 'photos' && data[key as keyof NewListingFormOutput] !== undefined) fd.append(key, String(data[key as keyof NewListingFormOutput]));
        }
        await api.post('/listings', fd);
    };
    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} display="grid" gap={2} maxWidth={760} mx="auto" p={{ xs: 2, md: 3 }}>
            <Typography variant="h1">Create Listing</Typography>
            <Typography variant="body1" color="text.secondary">Use the reusable input fields and button styles from the UI kit to publish a new item.</Typography>
            <TextInput label="Title" {...register('title')} error={!!errors.title} helperText={errors.title?.message as string} />
            <TextInput label="Description" multiline rows={4} {...register('description')} />
            <TextInput select label="Category" {...register('category')}>
                {['HOUSES_LANDS','ELECTRONICS','FURNITURE_HOUSEWARE','SPORTS_EQUIPMENT','VEHICLES'].map(c=>
                    <MenuItem key={c} value={c}>{c.replace('_',' ')}</MenuItem>)}
            </TextInput>
            <TextInput type="number" label="Price" {...register('price', { valueAsNumber: true })} />
            <TextInput select label="Condition" {...register('condition')}>
                <MenuItem value="new">Brand New</MenuItem>
                <MenuItem value="used">Used</MenuItem>
            </TextInput>
            <TextInput label="City" {...register('locationCity')} />
            <Stack spacing={1}>
                <Typography variant="body1">Photos</Typography>
                <input type="file" accept="image/*" multiple {...register('photos')} />
            </Stack>
            <AppButton variantStyle="master" type="submit" sx={{ maxWidth: 220 }}>Publish</AppButton>
            {/* what happens on lick? isn't it not publishing with sending a post request to the serever */}

        
        </Box>
    );
}