import React from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded';
import TuneRounded from '@mui/icons-material/TuneRounded';
import AppButton from './AppButton.tsx';
import TextInput from './TextInput.tsx';

export type FilterState = {
  minPrice: string;
  maxPrice: string;
  condition: string;
  dateRange: string;
  sort?: string;
};

export type FiltersProps = {
  value: FilterState;
  onChange: (next: FilterState) => void;
  onApply: (q: FilterState) => void;
  disabled?: boolean;
  asSidebar?: boolean;
};

type Option = {
  value: string;
  label: string;
};

const conditionOptions: Option[] = [
  { value: '', label: 'Show All' },
  { value: 'new', label: 'Brand New' },
  { value: 'used', label: 'Used' },
];

const dateOptions: Option[] = [
  { value: '', label: 'Show All' },
  { value: '24h', label: 'Last 24h' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
];

const sortOptions: Option[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price low to high' },
  { value: 'price_desc', label: 'Price high to low' },
];

type MultipleChoiceSectionProps = {
  title: string;
  value: string;
  options: Option[];
  onChange: (next: string) => void;
};

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 0.25,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        border: '1px solid',
        borderColor: 'neutral.main',
      }}
    >
      <Typography variant="body1" sx={{ mb: 1.25 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

function MultipleChoiceSection({ title, value, options, onChange }: MultipleChoiceSectionProps) {
  return (
    <SectionBlock title={title}>
      <RadioGroup value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value || 'all'}
            value={option.value}
            control={<Radio size="small" />}
            label={<Typography variant="body2">{option.label}</Typography>}
          />
        ))}
      </RadioGroup>
    </SectionBlock>
  );
}

export default function FilterBlock({ value, onChange, onApply, disabled = false, asSidebar = false }: FiltersProps) {
  const setField = (field: keyof FilterState, fieldValue: string) => {
    onChange({ ...value, [field]: fieldValue });
  };

  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  if (asSidebar) {
    return (
      <Box
        sx={{
          width: { xs: '100%', lg: sidebarOpen ? 320 : 74 },
          flexShrink: 0,
          transition: 'width 220ms ease',
          alignSelf: 'flex-start',
          position: { lg: 'sticky' },
          top: { lg: 88 },
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            borderRadius: 0.25,
            border: '1px solid',
            borderColor: 'neutral.main',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            overflow: 'hidden',
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'neutral.main' }}>
            {sidebarOpen ? <Typography variant="h3">Filters</Typography> : <TuneRounded fontSize="small" />}
            <IconButton size="small" onClick={() => setSidebarOpen((current) => !current)} aria-label="Toggle filters panel">
              {sidebarOpen ? <ChevronLeftRounded /> : <ExpandMoreRounded sx={{ transform: 'rotate(-90deg)' }} />}
            </IconButton>
          </Stack>

          {sidebarOpen && (
            <Stack spacing={1.5} sx={{ p: 1.5 }}>
              <SectionBlock title="Price range">
                <Typography variant="body2" sx={{ mb: 1 }}>Use number inputs to set minimum and maximum price.</Typography>
                <Stack direction={{ xs: 'column', sm: 'row', lg: 'column' }} spacing={1.25}>
                  <TextInput
                    inputSize="small"
                    label="Minimum"
                    value={value.minPrice}
                    onChange={(event) => setField('minPrice', event.target.value)}
                  />
                  <TextInput
                    inputSize="small"
                    label="Maximum"
                    value={value.maxPrice}
                    onChange={(event) => setField('maxPrice', event.target.value)}
                  />
                </Stack>
              </SectionBlock>

              <MultipleChoiceSection
                title="Condition"
                value={value.condition}
                options={conditionOptions}
                onChange={(next) => setField('condition', next)}
              />

              <MultipleChoiceSection
                title="Date added"
                value={value.dateRange}
                options={dateOptions}
                onChange={(next) => setField('dateRange', next)}
              />

              {value.sort !== undefined && (
                <MultipleChoiceSection
                  title="Sort"
                  value={value.sort}
                  options={sortOptions}
                  onChange={(next) => setField('sort', next)}
                />
              )}

              <AppButton variantStyle="master" onClick={() => onApply(value)} disabled={disabled} fullWidth>
                Apply filters
              </AppButton>
            </Stack>
          )}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 0.25,
        border: '1px solid',
        borderColor: 'neutral.main',
        backgroundColor: 'rgba(255, 255, 255, 0.88)',
      }}
    >
      <Typography variant="h2" sx={{ mb: 2.5 }}>Filters</Typography>
      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} alignItems="stretch">
        <SectionBlock title="Price range">
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <TextInput inputSize="small" label="Min" value={value.minPrice} onChange={(event) => setField('minPrice', event.target.value)} />
            <TextInput inputSize="small" label="Max" value={value.maxPrice} onChange={(event) => setField('maxPrice', event.target.value)} />
          </Stack>
        </SectionBlock>

        <MultipleChoiceSection title="Condition" value={value.condition} options={conditionOptions} onChange={(next) => setField('condition', next)} />

        <MultipleChoiceSection title="Date added" value={value.dateRange} options={dateOptions} onChange={(next) => setField('dateRange', next)} />

        {value.sort !== undefined && (
          <MultipleChoiceSection title="Sort" value={value.sort} options={sortOptions} onChange={(next) => setField('sort', next)} />
        )}

        <Stack justifyContent="flex-end" sx={{ minWidth: { lg: 180 } }}>
          <AppButton variantStyle="master" onClick={() => onApply(value)} disabled={disabled} fullWidth>
            Apply filters
          </AppButton>
        </Stack>
      </Stack>
    </Box>
  );
}