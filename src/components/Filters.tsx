// components/Filters.tsx
import { Box, TextField, MenuItem, Button } from '@mui/material';
import React from 'react';


export default function Filters({ onApply }: { onApply: (q: any)=>void }){
    const [state, setState] = React.useState({ minPrice:'', maxPrice:'', condition:'', dateRange:''});
    return (
        <Box display="flex" gap={2} >
            <TextField label="Min Price" size="small" value={state.minPrice} onChange={e=>setState(s=>({...s,minPrice:e.target.value}))} />
            <TextField label="Max Price" size="small" value={state.maxPrice} onChange={e=>setState(s=>({...s,maxPrice:e.target.value}))} />
            <TextField select label="Condition"  value={state.condition} onChange={e=>setState(s=>({...s,condition:e.target.value}))} style={{minWidth:'120px'}}>
                <MenuItem value="">Show All</MenuItem>
                <MenuItem value="new">Brand New</MenuItem>
                <MenuItem value="used">Used</MenuItem>
            </TextField>
            <TextField select label="Date Added" size="medium" value={state.dateRange} onChange={e=>setState(s=>({...s,dateRange:e.target.value}))}>
                <MenuItem value="">Show All</MenuItem>
                <MenuItem value="24h">Last 24h</MenuItem>
                <MenuItem value="7d">Last 7 days</MenuItem>
                <MenuItem value="30d">Last 30 days</MenuItem>
            </TextField>
            <Button variant="contained" onClick={()=>onApply(state)} >Apply</Button>
        </Box>
    );
}