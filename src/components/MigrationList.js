import React from 'react'
import { useNavigate } from 'react-router-dom'
import CustomizedTables from './CreateNew'
import { Button } from '@mui/material'
const MigrationList = () => {
	const navigate = useNavigate()

	const handleCreateNew = async () => {
		try {
			const response = await fetch('/api/migration')
			const data = await response.json()

			navigate('/migration', { state: { data } })
		} catch (error) {
			console.error('Error:', error)
		}
	}

	return (
		<div>
			<Button
				onClick={handleCreateNew}
				color="success"
				variant="outlined"
				sx={{
					mt: 2,
					color: '#3a1f3f',
					borderColor: '#3a1f3f',
					'&:hover': {
						backgroundColor: '#3a1f3f',
						color: '#fff',
					},
				}}
			>
				Create new
			</Button>
			{<CustomizedTables />}
		</div>
	)
}

export default MigrationList
