import { useEffect, useState } from 'react'
import Login from './components/PageComponents/Login'
import SideBar from './components/SideBar'
import { FormDataProvider } from './components/Appcontext/MigrationContext'
import { BrowserRouter as Router } from 'react-router-dom'
function App() {
	const [authenticated, setAuthenticated] = useState(false)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			setAuthenticated(true)
		} else {
			setAuthenticated(false)
		}
	}, [authenticated])

	const handleAuthentication = (value) => {
		console.log(value)
		setAuthenticated(value)
	}

	if (authenticated) {
		return (
			<FormDataProvider>
				<Router>
					<div className="App">
						<SideBar onLogout={handleAuthentication} />
					</div>
				</Router>
			</FormDataProvider>
		)
	}

	return (
		<div className="App">
			{!authenticated ? <Login onLogin={handleAuthentication} /> : null}
		</div>
	)
}

export default App
