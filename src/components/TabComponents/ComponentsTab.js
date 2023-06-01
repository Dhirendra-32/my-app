import React, { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CustomizedTables from '../CreateNew'
import Button from '@mui/material/Button'
import useMigrationContext from '../Hooks/FormDataHooks'
import { getRequest } from '../APIHelper/ApiConfig'
import CenteredLoader from '../LoaderComponents/CenterLoader'
import { refreshTokenGet } from '../utils'
export default function ComponentsTab({
	tbrows,
	handleOpenDialog,
	handleDeploy,
	handleEditRow,
	handleDeleteRow,
}) {
	const { updateAutoComponent, currentState, isButtonClicked } =
		useMigrationContext()
	const [loading, setLoading] = useState(false)
	const handleButtonClick = async () => {
		const Url = '/getautocomponents/AccentureDemo'
		if (!isButtonClicked) {
			try {
				setLoading(true)
				console.log(currentState.selectedSource || '')
				const response = await getRequest(Url)
				if (response.status === 200) {
					setLoading(false)
					localStorage.setItem('Auto', JSON.stringify(response.data))
					updateAutoComponent(response.data)
				} else if (response.status === 401) {
					await refreshTokenGet()
					const response = await getRequest(Url)
					if (response.status === 200) {
						setLoading(false)
						localStorage.setItem('Auto', JSON.stringify(response.data))
						updateAutoComponent(response.data)
					}
				}
			} catch (error) {
				if (error.response && error.response.status === 401) {
					await refreshTokenGet()
					const response = await getRequest(Url)
					if (response.status === 200) {
						setLoading(false)
						localStorage.setItem('Auto', JSON.stringify(response.data))
						updateAutoComponent(response.data)
					}
				}
				console.log(error)
			}
		}

		handleOpenDialog()
	}

	return (
		<Box sx={{ p: 2 }}>
			<IconButton color="primary" onClick={handleButtonClick}>
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

			{loading && <CenteredLoader />}

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
