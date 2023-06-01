import React from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CustomizedTables from '../CreateNew'
import Button from '@mui/material/Button'

export default function ManualStepsTab({
	tbrows,
	handleOpenDialog,
	handleDeploy,
	handleEditRow,
	handleDeleteRow,
}) {
	return (
		<Box sx={{ p: 2 }}>
			{/* Button to open the dialog */}
			<IconButton color="primary" onClick={handleOpenDialog}>
				<AddCircleIcon fontSize="large" />
			</IconButton>
			{tbrows.length > 0 && (
				<Button
					sx={{
						mt: 1,
						color: '#3a1f3f',
						borderColor: '#3a1f3f',
						'&:hover': {
							backgroundColor: '#3a1f3f',
							color: '#fff',
						},
					}}
					variant="outlined"
					onClick={handleDeploy}
				>
					Deploy
				</Button>
			)}
			{tbrows.length > 0 && (
				<CustomizedTables
					tbrows={tbrows}
					handleEditRow={handleEditRow}
					handleDeleteRow={handleDeleteRow}
				/>
			)}
		</Box>
	)
}
