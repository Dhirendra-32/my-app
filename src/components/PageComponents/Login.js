import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Box } from '@mui/system'
import { postRequest } from '../APIHelper/ApiConfig'

function Login({ onLogin }) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

	const handleFormSubmit = async (event) => {
		event.preventDefault()
		setLoading(true)
		const loginURL = '/login'
		const data = { username, password }
		const response = await postRequest(loginURL, data)
		if (response) {
			console.info('Login ', response.data.access_token)
			const access_token = response.data.access_token
			const refresh_token = response.data.refresh_token
			localStorage.setItem('access_token', access_token)
			localStorage.setItem('refresh_token', refresh_token)
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
					{loading ? 'checking..' : 'Login'}
				</Button>
			</form>
		</Box>
	)
}

export default Login
