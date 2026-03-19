import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Listing } from '../../api/clients.tsx';
import AppButton from './AppButton.tsx';

export type SmallItemCardProps = {
	item: Listing;
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
	compact?: boolean;
};

export function SmallItemCard({ item, onEdit, onDelete, compact = false }: SmallItemCardProps) {
	const thumb = item.images?.find((image) => image.kind === 'thumb') || item.images?.[0];
	const price = new Intl.NumberFormat(undefined, {
		style: 'currency',
		currency: 'LKR',
		maximumFractionDigits: 0,
	}).format(item.price);

	return (
		<Card
			variant="outlined"
			sx={{
				height: '100%',
				overflow: 'hidden',
				transition: 'transform 180ms ease, box-shadow 180ms ease',
				'&:hover': {
					transform: 'translateY(-4px)',
					boxShadow: '0 22px 50px rgba(36, 50, 212, 0.14)',
				},
			}}
		>
			{thumb ? (
				<CardMedia component="img" height={compact ? '150' : '190'} image={thumb.url} alt={item.title} />
			) : (
				<Box height={compact ? 150 : 190} sx={{ bgcolor: 'grey.200' }} />
			)}
			<CardContent sx={{ p: compact ? 2 : 2.5 }}>
				<Stack spacing={1.5}>
					<Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
						<Typography variant="h4" sx={{ pr: 1 }}>
							{item.title}
						</Typography>
						<Chip
							label={item.condition === 'new' ? 'Brand New' : 'Used'}
							size="small"
							sx={{
								bgcolor: item.condition === 'new' ? 'secondary.main' : 'accent.main',
								color: 'common.black',
								fontSize: '12px',
							}}
						/>
					</Stack>

					<Typography variant="body1" sx={{ fontWeight: 600 }}>
						{price}
					</Typography>

					<Typography variant="body1" color="text.secondary">
						{item.locationCity || 'Location not specified'}
					</Typography>

					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
						<AppButton variantStyle="master" href={`/listing/${item._id}`} fullWidth>
							View item
						</AppButton>
						{onEdit && (
							<AppButton variantStyle="white" fullWidth onClick={() => onEdit(item._id)}>
								Edit
							</AppButton>
						)}
						{onDelete && (
							<AppButton variantStyle="slave" fullWidth color="error" onClick={() => onDelete(item._id)}>
								Delete
							</AppButton>
						)}
					</Stack>
				</Stack>
			</CardContent>
		</Card>
	);
}

export type GroupItemCardProps = {
	title: string;
	description: string;
	items: Listing[];
};

export type TinyItemCardProps = {
	item: Listing;
};

export function TinyItemCard({ item }: TinyItemCardProps) {
	const thumb = item.images?.find((image) => image.kind === 'thumb') || item.images?.[0];
	const price = new Intl.NumberFormat(undefined, {
		style: 'currency',
		currency: 'LKR',
		maximumFractionDigits: 0,
	}).format(item.price);

	return (
		<Card
			variant="outlined"
			sx={{
				overflow: 'hidden',
				height: '100%',
				transition: 'transform 150ms ease, box-shadow 150ms ease',
				'&:hover': {
					transform: 'translateY(-2px)',
					boxShadow: '0 12px 28px rgba(36, 50, 212, 0.12)',
				},
			}}
		>
			{thumb ? (
				<CardMedia component="img" height="110" image={thumb.url} alt={item.title} />
			) : (
				<Box height={110} sx={{ bgcolor: 'grey.200' }} />
			)}
			<CardContent sx={{ p: 1.5 }}>
				<Stack spacing={0.75}>
					<Typography variant="h4" noWrap>
						{item.title}
					</Typography>
					<Typography variant="body1" color="text.secondary">
						{price}
					</Typography>
				</Stack>
			</CardContent>
		</Card>
	);
}

export function GroupItemCard({ title, description, items }: GroupItemCardProps) {
	return (
		<Card sx={{ overflow: 'hidden' }}>
			<CardContent sx={{ p: 3 }}>
				<Typography variant="h3" sx={{ mb: 1 }}>
					{title}
				</Typography>
				<Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
					{description}
				</Typography>
				<Grid container spacing={2}>
					{items.slice(0, 4).map((item) => (
						<Grid size={{ xs: 12, sm: 6, lg: 3 }} key={item._id}>
							<TinyItemCard item={item} compact />
						</Grid>
					))}
				</Grid>
			</CardContent>
		</Card>
	);
}
