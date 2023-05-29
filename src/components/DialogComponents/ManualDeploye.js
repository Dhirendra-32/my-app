import React, { useState, useEffect } from 'react'
import { TextField, Grid, Box } from '@mui/material'
import SingleSelect from '../SelectComponents/SingleSelect'
import GenricButton from '../GenericButton'

function ManualDeploye({ id, handleRow, close, editRowData }) {
	const components1 = [
		{ value: 'WorkFlow Permission', name: 'WorkFlow Permission' },
		{ value: 'Workflow Action', name: 'Workflow Action' },
		{ value: 'Custom Field', name: 'Custom Field' },
	]
	const generateUniqueKey = () => {
		const currentDate = new Date()
		const uniqueKey = currentDate.getTime().toString()
		return uniqueKey
	}
	const [formValues, setFormValues] = useState({
		ComponentID: generateUniqueKey(),
		ComponentType: '',
		ComponentName: '',
		MigrationId: id,
		ViaPackage: false,
	})
	useEffect(() => {
		if (editRowData) {
			setFormValues(editRowData)
		}
	}, [editRowData])
	const handleSingleChange = (e) => {
		setFormValues((prevValues) => ({
			...prevValues,
			ComponentType: e.target.value,
			ComponentName: '',
		}))
		console.log(formValues)
	}

	const handleTextChange = (e) => {
		setFormValues((prevValues) => ({
			...prevValues,
			ComponentName: e.target.value,
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		handleRow(formValues)
		close()
	}

	return (
		<Box sx={{ p: 3 }}>
			<form onSubmit={handleSubmit}>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							required
							InputProps={{
								readOnly: true,
							}}
							value={formValues.ComponentID}
							name="ComponentType"
							fullWidth
							margin="normal"
							color="success"
						/>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<SingleSelect
							options={components1}
							selectedOption={formValues.ComponentType}
							handleChange={handleSingleChange}
							label="Select Component"
							name="Select Component"
						/>
					</Grid>

					{formValues.ComponentType && ( // Check if the selected component and its corresponding options exist
						<Grid item xs={12} sx={{ mt: 2 }}>
							<TextField
								required
								value={formValues.ComponentName}
								onChange={handleTextChange}
								name="ComponentType"
								fullWidth
								margin="normal"
								color="success"
								label="Add your Manual Steps"
							/>
						</Grid>
					)}

					<Grid item xs={12} sx={{ mt: 2 }}>
						<GenricButton ButtonHandler={handleSubmit} name={'Save'} />
					</Grid>
				</Grid>
			</form>
		</Box>
	)
}

export default ManualDeploye
