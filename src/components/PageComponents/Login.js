import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Box } from '@mui/system'
import CircularIndeterminate from '../LoaderComponents/Loader'
import { postRequest } from '../APIHelper/ApiConfig'

function Login({ onLogin }) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	console.log('login component')
	const handleFormSubmit = async (event) => {
		event.preventDefault()
		setLoading(true)
		const loginURL = '/login'
		const data = { username, password }
		const response = await postRequest(loginURL, data)
		if (response) {
			console.info('Login ', response.data.token)
			const token = response.data.token
			localStorage.setItem('token', token)
			setLoading(false)
			onLogin(true)
		}
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '50vh',
			}}
		>
			{loading && <CircularIndeterminate />}
			<form onSubmit={handleFormSubmit}>
				<TextField
					required
					id="username"
					label="Username"
					value={username}
					onChange={(e) => {
						setUsername(e.target.value)
					}}
					sx={{ mb: 2 }}
					fullWidth
				/>
				<TextField
					required
					id="password"
					label="Password"
					type="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value)
					}}
					sx={{ mb: 2 }}
					fullWidth
				/>

				<Button type="submit" variant="contained" color="secondary">
					Submit
				</Button>
			</form>
		</Box>
	)
}

export default Login
