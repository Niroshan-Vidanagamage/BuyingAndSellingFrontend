// pages/NewListing.tsx
//Collects Title, description, photos etc... 
//Build formdata with fields+ image files from ImageUploader then post/listings
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateListingSchema } from '../schemas/listing.ts';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import { api } from '../api/clients.tsx';
import * as Zod from 'zod';


// Define a type for the form data that includes the photos
type NewListingFormData = Zod.infer<typeof CreateListingSchema> & {
    photos: FileList;
};

export default function NewListing(){
    
    // Use the new type with useForm
    const { register, handleSubmit, formState: { errors } } = useForm<NewListingFormData>({
        resolver: zodResolver(CreateListingSchema),
        defaultValues: { category: 'ELECTRONICS', condition: 'new' }
    });
    const onSubmit = async (data:any) => {
        // react-hook-form's `data` object now includes the files.
        const fd = new FormData();
        for (const key in data) {
            if (key === 'photos') Array.from(data.photos as FileList).forEach(f => fd.append('photos', f));
            else fd.append(key, data[key]);
        }
        await api.post('/listings', fd);
    };
    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} display="grid" gap={2}>
            <TextField label="Title" {...register('title')} error={!!errors.title} helperText={errors.title?.message as string} />
            <TextField label="Description" multiline rows={4} {...register('description')} />
            <TextField select label="Category" {...register('category')}>
                {['HOUSES_LANDS','ELECTRONICS','FURNITURE_HOUSEWARE','SPORTS_EQUIPMENT','VEHICLES'].map(c=>
                    <MenuItem key={c} value={c}>{c.replace('_',' ')}</MenuItem>)}
            </TextField>
            <TextField type="number" label="Price" {...register('price', { valueAsNumber: true })} />
            <TextField select label="Condition" {...register('condition')}>
                <MenuItem value="new">Brand New</MenuItem>
                <MenuItem value="used">Used</MenuItem>
            </TextField>
            <TextField label="City" {...register('locationCity')} />
            <input type="file" accept="image/*" multiple {...register('photos')} />
            <Button variant="contained" type="submit">Publish</Button>
            {/* what happens on lick? isn't it not publishing with sending a post request to the serever */}

        
        </Box>
    );
}