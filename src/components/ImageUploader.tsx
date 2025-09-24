// File: src/components/ImageUploader.tsx
import * as React from 'react';
import { Box, Typography, Button } from '@mui/material';


interface Props {
    name?: string;
    maxFiles?: number;
    maxMb?: number;
    onFiles?: (files: File[]) => void;
}


export default function ImageUploader({ name = 'photos', maxFiles = 8, maxMb = 2, onFiles }: Props){
    const [files, setFiles] = React.useState<File[]>([]);
    const [errors, setErrors] = React.useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement | null>(null);


    const handlePick = () => inputRef.current?.click();


    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setErrors(null);
        const list = Array.from(e.target.files || []);
        const limited = list.slice(0, maxFiles);
        const bad = limited.find(f => f.size > maxMb * 1024 * 1024);
        if (bad) {
            setErrors(`Each image must be ≤ ${maxMb}MB`);
            return;
        }
        setFiles(limited);
        onFiles?.(limited);
};


    return (
        <Box>
            <input ref={inputRef} type="file" accept="image/*" multiple hidden name={name} onChange={handleChange} />
            <Button variant="outlined" onClick={handlePick}>Upload Photos</Button>
            {errors && <Typography color="error" mt={1}>{errors}</Typography>}
            <Box mt={2} display="grid" gridTemplateColumns="repeat(auto-fill, minmax(120px, 1fr))" gap={1}>
                {files.map((f, i) => (
                <img key={i} src={URL.createObjectURL(f)} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8 }} />
            ))}
            </Box>
        </Box>
    );
}