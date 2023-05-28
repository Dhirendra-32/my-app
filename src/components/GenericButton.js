import React from 'react'
import Button from '@mui/material/Button'
function GenricButton({ ButtonHandler, name }) {
	const handleSubmit = (e) => {
		ButtonHandler(e)
	}

	return (
		<Button
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
			onClick={handleSubmit}
		>
			{name}
		</Button>
	)
}

export default GenricButton
