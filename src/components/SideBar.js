// Sidebar.js
import { Routes, Route, Link } from 'react-router-dom'
// import CustomizedTables from './CreateNew'
import MigrationList from './MigrationList'
import Migration from './Migrations'
import { AppBar, Toolbar, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useMigrationContext from './Hooks/FormDataHooks'
function Sidebar({ onLogout }) {
	console.log('sidebar component')
	const { Save, UpdateSaveState } = useMigrationContext()
	console.log('save', Save)
	const navigate = useNavigate()
	const handleLogout = () => {
		localStorage.clear()
		onLogout(false)
		UpdateSaveState(false)
		navigate('/')
	}
	return (
		<div className="Sidebar">
			<AppBar position="static" sx={{ backgroundColor: '#3a1f3f' }}>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						DeployNow
					</Typography>
					<Button component={Link} to="/" color="inherit">
						Migration List
					</Button>
					{Save && (
						<Button component={Link} to="/Migration" color="inherit">
							Migration
						</Button>
					)}

					<Button color="inherit" onClick={handleLogout}>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			<Routes>
				<Route path="/" element={<MigrationList />} />
				<Route path="/Migration" element={<Migration />} />
			</Routes>
		</div>
	)
}

export default Sidebar
