import { Box, Stack, Typography } from "@mui/material";

export default function Footer() {
	return (
		<Box
			component="footer"
			sx={{
				backgroundColor: "primary.light",
				borderTop: "1px solid rgba(197, 197, 197, 0.8)",
				py: 2,
				px: 2,
				textAlign: "center",
			}}
		>
			<Stack
				direction="row"
				spacing={2}
				justifyContent="center"
				flexWrap="wrap"
				sx={{ mb: 1 }}
			>
				<Typography
					component="a"
					href="/"
					variant="body1"
					sx={{ textDecoration: "none" }}
				>
					Home
				</Typography>
				<Typography
					component="a"
					href="/"
					variant="body1"
					sx={{ textDecoration: "none" }}
				>
					Marketplace Search
				</Typography>
				<Typography
					component="a"
					href="/sell/new"
					variant="body1"
					sx={{ textDecoration: "none" }}
				>
					Post AD
				</Typography>
			</Stack>

			<Typography variant="body2">
				All rights reserved Best buys.
			</Typography>
		</Box>
	);
}
