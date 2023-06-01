import React, { useState, useEffect } from 'react'
import { TextField, Grid, Box } from '@mui/material'
import SingleSelect from '../SelectComponents/SingleSelect'
import GenricButton from '../GenericButton'
import { SaveRowServer, UpdateRowOnServer, generateUniqueKey } from '../utils'
function ManualDeploye({ id, handleRow, close, editRowData }) {
	const components1 = [
		{ value: 'WorkFlow Permission', name: 'WorkFlow Permission' },
		{ value: 'Workflow Action', name: 'Workflow Action' },
		{ value: 'Custom Field', name: 'Custom Field' },
	]

	const [formValues, setFormValues] = useState({
		ComponentID: '',
		ComponentType: '',
		ComponentName: [],
		MigrationId: id,
		ViaPackage: false,
		Unikey: generateUniqueKey('MNWL'),
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
	}

	const handleTextChange = (e) => {
		setFormValues((prevValues) => ({
			...prevValues,
			ComponentName: e.target.value,
		}))
	}

	const handleSubmit = async (e) => {
		let payload
		const Action = e.target.innerText
		e.preventDefault()
		close()
		if (Action === 'ADD' && formValues) {
			payload = {
				COMPONENTTYPE: formValues.ComponentType,
				COMPONENTNAME: formValues.ComponentName,
				MIGRATION_ID: parseInt(formValues.MigrationId.split('_')[1]),
				VIAPACKAGE: formValues.ViaPackage,
				UNIKEY: formValues.Unikey,
			}
			const res = await SaveRowServer(JSON.stringify(payload))

			const data = {
				ComponentID: res.ComponentID,
				ComponentType: res.ComponentType,
				ComponentName: res.ComponentName[0].name,
				MigrationId: res.MigrationId,
				ViaPackage: res.ViaPackage,
				Unikey: res.Unikey,
			}
			UpdateStateFromResponse(res)
			handleRow('Manual', data)
		} else if (Action === 'UPDATE' && formValues) {
			payload = {
				COMPONENTID: formValues.ComponentID,
				COMPONENTTYPE: formValues.ComponentType,
				COMPONENTNAME: formValues.ComponentName,
				MIGRATION_ID: formValues.MigrationId,
				VIAPACKAGE: formValues.ViaPackage,
				UNIKEY: formValues.Unikey,
			}
			const isPass = await UpdateRowOnServer(JSON.stringify(payload))
			if (isPass) {
				handleRow('Manual', formValues)
			}
		}
	}
	const UpdateStateFromResponse = (response) => {
		setFormValues((prevFormValues) => ({
			...prevFormValues,
			ComponentID: response.ComponentID,
			ComponentType: response.ComponentType,
			ComponentName: response.ComponentName[0].name,
			MigrationId: response.MigrationId,
			ViaPackage: response.ViaPackage,
			Unikey: response.Unikey,
		}))
	}

	return (
		<Box sx={{ p: 3 }}>
			<form onSubmit={handleSubmit}>
				<Grid container>
					{formValues.ComponentID && (
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
					)}

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
						<GenricButton
							ButtonHandler={handleSubmit}
							name={!editRowData ? 'Add' : 'Update'}
						/>
					</Grid>
				</Grid>
			</form>
		</Box>
	)
}

export default ManualDeploye
