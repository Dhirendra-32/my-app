import React, { useState, useEffect } from 'react'
import { TextField, Grid, Box } from '@mui/material'
import SingleSelect from '../SelectComponents/SingleSelect'
import MultiSelect from '../SelectComponents/MultipleSelect'
import GenricButton from '../GenericButton'

function AutoDeploye({ id, handleRow, close, editRowData }) {
	const components1 = [
		{ value: 'Global Script', name: 'Global Script1' },
		{ value: 'Custom Action', name: 'custom Action1' },
		{ value: 'Cart Calculation', name: 'Cart Calculation1' },
	]
	const AutoComponent = {
		'Global Script': [
			{ name: 'SN_Global_Script1', value: 'SN_Global_Script1.py' },
			{ name: 'SN_Global_Script2', value: 'SN_Global_Script2.py' },
			{ name: 'SN_Global_Script3', value: 'SN_Global_Script3.py' },
			{ name: 'SN_Global_Script4', value: 'SN_Global_Script4.py' },
		],
		'Custom Action': [
			{ name: 'SN_Custom_Script1', value: 'SN_Custom_Action_Script1.py' },
			{ name: 'SN_Custom_Script2', value: 'SN_Custom_Action_Script2.py' },
			{ name: 'SN_Custom_Script3', value: 'SN_Custom_Action_Script3.py' },
			{ name: 'SN_Custom_Script4', value: 'SN_Custom_Action_Script4.py' },
		],
		'Cart Calculation': [
			{ name: 'ikornacki0', value: 'fmatessian0' },
			{ name: 'jmarfell1', value: 'dervin1' },
			{ name: 'cregenhardt2', value: 'klotterington2' },
			{ name: 'sborn3', value: 'ttuiller3' },
			{ name: 'cnormabell5j', value: 'bfeak5j' },
		],
	}
	const generateUniqueKey = () => {
		const currentDate = new Date()
		const uniqueKey = currentDate.getTime().toString()
		return uniqueKey
	}

	const [formValues, setFormValues] = useState({
		ComponentID: generateUniqueKey(),
		ComponentType: '',
		ComponentName: [],
		MigrationId: id,
		ViaPackage: false,
	})
	useEffect(() => {
		if (editRowData) {
			// Update form data with the editRowData props
			setFormValues(editRowData)
		}
	}, [editRowData])
	const handleSingleChange = (e) => {
		setFormValues((prevValues) => ({
			...prevValues,
			ComponentType: e.target.value,
			ComponentName: [],
		}))
		console.log(formValues)
	}

	const handleMultiSelectChange = (e, selectedOptions) => {
		setFormValues((prevValues) => ({
			...prevValues,
			ComponentName: selectedOptions,
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

					{formValues.ComponentType &&
						AutoComponent[formValues.ComponentType] && ( // Check if the selected component and its corresponding options exist
							<Grid item xs={12} sx={{ mt: 2 }}>
								<Grid item xs={12}>
									<MultiSelect
										options={AutoComponent[formValues.ComponentType]}
										value={formValues.ComponentName}
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
						<GenricButton ButtonHandler={handleSubmit} name={'Save'} />
					</Grid>
				</Grid>
			</form>
		</Box>
	)
}

export default AutoDeploye
