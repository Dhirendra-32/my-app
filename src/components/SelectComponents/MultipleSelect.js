import React from 'react'
import { Autocomplete } from '@mui/material'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledAutocomplete = styled(Autocomplete)({
	minWidth: 200,
})

const MultiSelect = ({ options, value, onChange, label }) => {
	return (
		<StyledAutocomplete
			multiple
			options={options || []}
			value={value}
			onChange={onChange}
			getOptionLabel={(option) => option.value}
			isOptionEqualToValue={(option, value) => option.value === value.value}
			renderInput={(params) => (
				<TextField {...params} variant="outlined" label={label} />
			)}
		/>
	)
}

export default MultiSelect
