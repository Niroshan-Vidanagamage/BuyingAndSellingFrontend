// File: src/pages/EditingList.tsx
// Loads exsisting data from GET/listinh/:id, hydrates the form and let user to change fields or add more photos.
//submit PATCH/Listings/:id, (multipart) the same way as newListing
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/clients.tsx';
import { Box, TextField, MenuItem, Button, Typography } from '@mui/material';
import ImageUploader from '../components/ImageUploader.tsx';

export default function EditingList(){
  const { id = '' } = useParams();
  const [form, setForm] = React.useState<any>({ title:'', description:'', category:'ELECTRONICS', price:'', condition:'new', locationCity:'' });
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { data } = await api.get(`/listings/${id}`);
      setForm({ ...data, price: data.price?.toString() });
    })();
  }, [id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k,v]) => {
      if (v !== undefined && v !== null) fd.append(k, String(v));
    });
    selectedFiles.forEach(f => fd.append('photos', f));
    await api.patch(`/listings/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    setSaving(false);
  };

  return (
    <Box component="form" onSubmit={submit} p={2} display="grid" gap={2}>
      <Typography variant="h5">Edit Listing</Typography>
      <TextField label="Title" value={form.title} onChange={e=>setForm(s=>({...s,title:e.target.value}))} />
      <TextField label="Description" multiline rows={4} value={form.description} onChange={e=>setForm(s=>({...s,description:e.target.value}))} />
      <TextField select label="Category" value={form.category} onChange={e=>setForm(s=>({...s,category:e.target.value}))}>
        {['HOUSES_LANDS','ELECTRONICS','FURNITURE_HOUSEWARE','SPORTS_EQUIPMENT','VEHICLES'].map(c => <MenuItem key={c} value={c}>{c.replaceAll('_',' ')}</MenuItem>)}
      </TextField>
      <TextField type="number" label="Price" value={form.price} onChange={e=>setForm(s=>({...s,price:e.target.value}))} />
      <TextField select label="Condition" value={form.condition} onChange={e=>setForm(s=>({...s,condition:e.target.value}))}>
        <MenuItem value="new">Brand New</MenuItem>
        <MenuItem value="used">Used</MenuItem>
      </TextField>
      <TextField label="City" value={form.locationCity} onChange={e=>setForm(s=>({...s,locationCity:e.target.value}))} />
      <ImageUploader onFiles={setSelectedFiles} />
      <Button variant="contained" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</Button>
    </Box>
  );
}
