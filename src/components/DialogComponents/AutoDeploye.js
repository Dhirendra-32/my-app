import React, { useState, useEffect } from 'react'
import { TextField, Grid, Box } from '@mui/material'
import SingleSelect from '../SelectComponents/SingleSelect'
import MultiSelect from '../SelectComponents/MultipleSelect'
import GenricButton from '../GenericButton'
import useMigrationContext from '../Hooks/FormDataHooks'
import { SaveRowServer, UpdateRowOnServer, generateUniqueKey } from '../utils'
function AutoDeploye({ id, handleRow, close, editRowData }) {
	const { autoComponent } = useMigrationContext()
	const componentsList = [
		{ value: 'Global Script', name: 'Global Script1' },
		{ value: 'Custom Action', name: 'custom Action1' },
		{ value: 'Cart Calculation', name: 'Cart Calculation1' },
	]

	const [formValues, setFormValues] = useState({
		ComponentID: '',
		ComponentType: '',
		ComponentName: [],
		MigrationId: id,
		ViaPackage: false,
		Unikey: generateUniqueKey('AUTO'),
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
			ComponentName: [],
		}))
	}

	const handleMultiSelectChange = (e, selectedOptions) => {
		setFormValues((prevValues) => ({
			...prevValues,
			ComponentName: selectedOptions,
		}))
	}

	const handleSubmit = async (e) => {
		let payload
		e.preventDefault()
		close()

		const Action = e.target.innerText
		if (Action === 'ADD' && formValues) {
			payload = {
				COMPONENTTYPE: formValues.ComponentType,
				COMPONENTNAME: formValues.ComponentName.map(
					(component) => component.value
				).join(','),
				MIGRATION_ID: parseInt(formValues.MigrationId.split('_')[1]),
				VIAPACKAGE: formValues.ViaPackage,
				UNIKEY: formValues.Unikey,
			}

			const response = await SaveRowServer(JSON.stringify(payload))
			if (response) {
				UpdateStateFromResponse(response)
				handleRow('Auto', response)
			}
		} else {
			payload = {
				COMPONENTID: formValues.ComponentID,
				COMPONENTTYPE: formValues.ComponentType,
				COMPONENTNAME: formValues.ComponentName.map(
					(component) => component.value
				).join(','),
				MIGRATION_ID: formValues.MigrationId,
				VIAPACKAGE: formValues.ViaPackage,
				UNIKEY: formValues.Unikey,
			}
			const isPass = await UpdateRowOnServer(JSON.stringify(payload))
			if (isPass) {
				handleRow('Auto', formValues)
			}
		}
	}

	const UpdateStateFromResponse = (response) => {
		setFormValues((prevFormValues) => ({
			...prevFormValues,
			ComponentID: response.ComponentID,
			ComponentType: response.ComponentType,
			ComponentName: response.ComponentName,
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
								value={formValues.ComponentID || ''}
								name="ComponentType"
								fullWidth
								margin="normal"
								color="success"
							/>
						</Grid>
					)}

					<Grid item xs={12} sx={{ mt: 2 }}>
						<SingleSelect
							options={componentsList}
							selectedOption={formValues.ComponentType || ''}
							handleChange={handleSingleChange}
							label="Select Component"
							name="Select Component"
						/>
					</Grid>

					{formValues.ComponentType &&
						autoComponent[formValues.ComponentType] && (
							<Grid item xs={12} sx={{ mt: 2 }}>
								<Grid item xs={12}>
									<MultiSelect
										options={autoComponent[formValues.ComponentType]}
										value={formValues.ComponentName || []}
										onChange={(e, selectedOptions) =>
											handleMultiSelectChange(e, selectedOptions)
										}
										label="Select Scripts"
										name="Select Scripts"
									/>
								</Grid>
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

export default AutoDeploye
