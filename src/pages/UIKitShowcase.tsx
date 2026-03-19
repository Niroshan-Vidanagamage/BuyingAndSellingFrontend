import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { Listing } from '../api/clients';
import Filters from '../components/Filters.tsx';
import { AppButton, GroupItemCard, SmallItemCard, TextInput, TinyItemCard } from '../components/ui/index.ts';
import { designTokens } from '../design/theme.ts';

const colorEntries = Object.entries(designTokens.colors);

const prettyName = (name: string) =>
  name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase());

const sampleItems: Listing[] = [
  {
    _id: 'sample-1',
    title: 'iPhone 14 Pro Max',
    description: 'Excellent condition, charger included.',
    category: 'ELECTRONICS',
    price: 325000,
    condition: 'used',
    locationCity: 'Colombo',
    sellerId: 'user-1',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: [
      {
        key: 'placeholder-1',
        url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
        kind: 'thumb',
      },
    ],
  },
  {
    _id: 'sample-2',
    title: 'Wooden Study Desk',
    description: 'Solid teak finish with drawers.',
    category: 'FURNITURE_HOUSEWARE',
    price: 48000,
    condition: 'new',
    locationCity: 'Galle',
    sellerId: 'user-2',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: [
      {
        key: 'placeholder-2',
        url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
        kind: 'thumb',
      },
    ],
  },
  {
    _id: 'sample-3',
    title: 'Yamaha FZ Bike',
    description: 'Single owner, low mileage.',
    category: 'VEHICLES',
    price: 675000,
    condition: 'used',
    locationCity: 'Kandy',
    sellerId: 'user-3',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: [
      {
        key: 'placeholder-3',
        url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80',
        kind: 'thumb',
      },
    ],
  },
  {
    _id: 'sample-4',
    title: 'Badminton Kit',
    description: 'Rackets and shuttle tubes included.',
    category: 'SPORTS_EQUIPMENT',
    price: 12500,
    condition: 'new',
    locationCity: 'Negombo',
    sellerId: 'user-4',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: [
      {
        key: 'placeholder-4',
        url: 'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?auto=format&fit=crop&w=900&q=80',
        kind: 'thumb',
      },
    ],
  },
];

export default function UIKitShowcase() {
  return (
    <Stack spacing={4} sx={{ py: 2 }}>
      <Box>
        <Typography variant="h1" sx={{ mb: 1.5 }}>
          UI Kit Preview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This page is the working reference for the typography, cards, buttons, and filter patterns defined from your Figma notes.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2.5}>
            <Typography variant="h2">Buttons</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flexWrap="wrap">
              <AppButton variantStyle="master">Master Button</AppButton>
              <AppButton variantStyle="slave">Slave Button</AppButton>
              <AppButton variantStyle="white">White Button</AppButton>
              <AppButton variantStyle="drop">Drop Button</AppButton>
            </Stack>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2.5}>
            <Typography variant="h2">Inputs</Typography>
            <TextInput inputSize="search" placeholder="Search ads, categories, or locations" />
            <TextInput label="Text input" placeholder="Type something" />
            <TextInput inputSize="small" label="Small text input" placeholder="12px helper-style field" />
            <TextInput select label="Drop button style field" defaultValue="new">
              <MenuItem value="new">Brand New</MenuItem>
              <MenuItem value="used">Used</MenuItem>
            </TextInput>
          </Stack>
        </Grid>
      </Grid>

      <Filters
        value={{ minPrice: '', maxPrice: '', condition: '', dateRange: '', sort: 'newest' }}
        onChange={() => undefined}
        onApply={() => undefined}
      />

      <Box>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Cards
        </Typography>
        <Grid container spacing={3}>
          {sampleItems.slice(0, 2).map((item) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={item._id}>
              <SmallItemCard item={item} />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h3" sx={{ mt: 3, mb: 1.5 }}>
          Tiny item card
        </Typography>
        <Grid container spacing={2}>
          {sampleItems.slice(0, 4).map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={`tiny-${item._id}`}>
              <TinyItemCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <GroupItemCard
        title="Featured collection"
        description="Group card pattern with a heading, short description, and four item cards inside."
        items={sampleItems}
      />

      <Box>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Color Tokens
        </Typography>
        <Grid container spacing={2}>
          {colorEntries.map(([name, value]) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={name}>
              <Stack spacing={1}>
                <Box
                  sx={{
                    height: 84,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'neutral.main',
                    backgroundColor: value,
                  }}
                />
                <Typography variant="h4">{prettyName(name)}</Typography>
                <Typography variant="body2" sx={{ letterSpacing: 0.8 }}>
                  {value.toUpperCase()}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
}