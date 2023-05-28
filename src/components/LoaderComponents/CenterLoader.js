import React from 'react'
import { CircularProgress, Box, Typography } from '@mui/material'

const CenteredLoader = ({ label }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
			}}
		>
			<CircularProgress color="secondary" />
			<Typography variant="body2" sx={{ mt: 2 }}>
				{label}
			</Typography>
		</Box>
	)
}

export default CenteredLoader
