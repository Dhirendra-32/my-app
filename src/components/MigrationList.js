import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomizedTables from './CreateNew'
import { Button } from '@mui/material'
import { Box } from '@mui/material'
import { postRequest } from './APIHelper/ApiConfig'
import useMigrationContext from './Hooks/FormDataHooks'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'
import CenteredLoader from '../components/LoaderComponents/CenterLoader'
import { refreshTokenGet } from './utils'
const MigrationList = () => {
	const { fetchFormValue, UpdateSaveState, UpdateStateFromAPI } =
		useMigrationContext()
	const [notLoading, setnotLoading] = useState(true)
	const navigate = useNavigate()
	const initialState = {
		selectedApprover: [],
		selectedDestination: [],
		selectedSource: '',
		isrepoUpdated: false,
		isUnitTested: false,
		MigrationName: '',
		releaseVersion: '',
		deploymentStatus: '',
	}
	const handleCreateNew = async () => {
		try {
			setnotLoading(false)
			const response = await postRequest('/createnew', {})
			if (response.status === 200) {
				const newForm = response.data.newForm
				fetchFormValue(newForm)
				UpdateStateFromAPI(initialState)
				UpdateSaveState(true)
				setnotLoading(true)
				navigate('/Migration')
				localStorage.setItem('formValues', JSON.stringify(newForm))
			}
		} catch (error) {
			if (error.response && error.response.status === 401) {
				await refreshTokenGet()
				const response = await postRequest('/createnew', {})
				if (response.status === 200) {
					const newForm = response.data.newForm
					fetchFormValue(newForm)
					UpdateStateFromAPI(initialState)
					UpdateSaveState(true)
					setnotLoading(true)
					navigate('/Migration')
					localStorage.setItem('formValues', JSON.stringify(newForm))
				}
			}
			console.error('Error:', error)
		}
	}

	return (
		<Box
			sx={{
				p: 3,
				border: '1px solid #3a1f3f',
				borderRadius: '1px',
				boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
				// Add any other custom styling properties here
			}}
		>
			<Button
				disabled={!notLoading}
				onClick={handleCreateNew}
				color="success"
				startIcon={<AddCircleOutlinedIcon />}
				sx={{
					mt: 3,
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

			{notLoading ? <CustomizedTables /> : <CenteredLoader />}
		</Box>
	)
}

export default MigrationList
