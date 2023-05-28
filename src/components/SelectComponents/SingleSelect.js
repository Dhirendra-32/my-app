import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

const SingleSelect = ({
	options,
	selectedOption,
	handleChange,
	label,
	name,
}) => {
	return (
		<FormControl sx={{ width: '100%' }}>
			<InputLabel htmlFor="select">{label}</InputLabel>
			<Select
				required
				name={name}
				label={label}
				value={selectedOption}
				onChange={handleChange}
			>
				{options &&
					options.map((option) => (
						<MenuItem key={option.name} value={option.value}>
							{option.value}
						</MenuItem>
					))}
			</Select>
		</FormControl>
	)
}

export default SingleSelect
