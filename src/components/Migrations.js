import React, { useState } from 'react'
import { TextField, Button, Grid, Box } from '@mui/material'
import { Checkbox, FormControlLabel } from '@mui/material'
import MultiSelect from './SelectComponents/MultipleSelect'
import SingleSelect from './SelectComponents/SingleSelect'
import ColorTabs from './TabPage'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useMigrationContext from './Hooks/FormDataHooks'
import { patchRequest } from './APIHelper/ApiConfig'
import { refreshTokenGet } from './utils'

const Migration = () => {
	const { formValues, showForm } = useMigrationContext()
	const { Save, UpdateSaveState } = useMigrationContext()
	const { currentState, UpdateCurrentState } = useMigrationContext()
	const [loading, setLoading] = useState(false)

	const handleChange = (event) => {
		const { name, value, checked, type } = event.target
		let newValue = value
		if (name === 'MigrationName') {
			newValue = value.toUpperCase()
		} else if (type === 'checkbox') {
			newValue = checked
		}

		UpdateCurrentState(name, newValue)
	}

	const handleMultiChange = (propertyName, selectedOptions) => {
		const isMulti = true
		UpdateCurrentState(propertyName, selectedOptions, isMulti)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setLoading(true)
		updateFormOnServer()
	}

	const updateFormOnServer = async (retry = true) => {
		const data = {
			APPROVEDBY: currentState.selectedApprover
				.map((approver) => approver.value)
				.join(','),
			COMPLETIONDATE: '12/02/2023',
			CPQDESTINATION: currentState.selectedDestination
				.map((destination) => destination.value)
				.join(','),
			CPQSOURCE: currentState.selectedSource,
			CUSTOMNAME: formValues.CUSTOMNAME,
			DEPLOYEMENTSTATUS: formValues.DEPLOYEMENTSTATUS,
			MIGRATIONID: formValues.MIGRATIONID,
			MIGRATIONNAME: currentState.MigrationName,
			RELEASEVERSION: currentState.releaseVersion,
			REPOUPDATED: String(currentState.isrepoUpdated),
			REQUESTORName: formValues.REQUESTORName,
			UNITTESTED: String(currentState.isUnitTested),
		}

		try {
			const response = await patchRequest('/save', data)
			console.log(response)
			if (response.status === 200) {
				toast.success('Form saved successfully!', {
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					draggable: true,
					progress: undefined,
				})
				UpdateSaveState(true)
				setLoading(false)
			} else if (response.status === 401 && retry) {
				console.log('Hi Token is failed and retrying...')
				await refreshTokenGet()
				updateFormOnServer(false)
			}
		} catch (error) {
			console.error('Error:', error)
			if (error.response && error.response.status === 401 && retry) {
				toast.info('Failed to save. Retrying...', {
					position: 'top-center',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					draggable: true,
					progress: undefined,
				})
				console.log(retry ? 'First ' : 'Second')
				await refreshTokenGet()
				updateFormOnServer(false)
			} else {
				setLoading(false)
				toast.error('Failed to save form!', {
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					draggable: true,
					progress: undefined,
				})
			}
		}
	}
	const label = loading && showForm ? 'Updating...' : 'Save'

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
			<div>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<TextField
								required
								InputProps={{
									readOnly: true,
								}}
								name="CUSTOMNAME"
								value={formValues.CUSTOMNAME || ''}
								fullWidth
								margin="normal"
								color="success"
								label="Customer name (read only)"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								required
								InputProps={{
									readOnly: true,
								}}
								name="MigrationId"
								value={formValues.MIGRATIONID || ''}
								fullWidth
								margin="normal"
								color="success"
								label="Deployment Id (read only)"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								required
								name="MigrationName"
								label="Migration Name"
								value={currentState.MigrationName || ''}
								onChange={handleChange}
								fullWidth
								margin="normal"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								disabled
								name="category"
								value={formValues.DEPLOYEMENTSTATUS || ''}
								fullWidth
								margin="normal"
								label="Status (read only)"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<MultiSelect
								options={formValues.APPROVEDBY}
								value={currentState.selectedApprover}
								onChange={(e, selectedOptions) =>
									handleMultiChange('selectedApprover', selectedOptions)
								}
								label="Select Approvers"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<div>
								<SingleSelect
									options={formValues.CPQSOURCE}
									selectedOption={currentState.selectedSource}
									handleChange={handleChange}
									label="Select Source Env"
									name="selectedSource"
								/>
							</div>
						</Grid>
						<Grid item xs={12} md={6}>
							<MultiSelect
								options={formValues.CPQDESTINATION}
								value={currentState.selectedDestination || ''}
								onChange={(e, selectedOptions) =>
									handleMultiChange('selectedDestination', selectedOptions)
								}
								label="Select Destination Env"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<div>
								<SingleSelect
									options={formValues.RELEASEVERSION}
									selectedOption={currentState.releaseVersion}
									handleChange={handleChange}
									label="Select Release Version"
									name="releaseVersion"
								/>
							</div>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								InputProps={{
									readOnly: true,
								}}
								id="outlined-required"
								value={formValues.REQUESTORName || ''}
								name="REQUESTORName"
								label="Requestor Name(read only)"
								fullWidth
								margin="normal"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<FormControlLabel
								control={
									<Checkbox
										sx={{
											'&.Mui-checked': {
												color: '#3a1f3f',
											},
										}}
										checked={currentState.isUnitTested}
										onChange={handleChange}
										name="isUnitTested"
									/>
								}
								label="Unit Tested ?"
							/>
							<FormControlLabel
								control={
									<Checkbox
										sx={{
											'&.Mui-checked': {
												color: '#3a1f3f',
											},
										}}
										checked={currentState.isrepoUpdated}
										onChange={handleChange}
										name="isrepoUpdated"
									/>
								}
								label="Repo Updated ?"
							/>
						</Grid>
					</Grid>
					<Button
						disabled={loading}
						type="submit"
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
						{label}
					</Button>
					<Grid>
						{Save && (
							<ColorTabs id={formValues.MIGRATIONID} formData={currentState} />
						)}
					</Grid>
				</form>
				<ToastContainer />
			</div>
		</Box>
	)
}

export default Migration
