import { useEffect, useState } from 'react'
import Login from './components/PageComponents/Login'
import SideBar from './components/SideBar'
import { BrowserRouter as Router } from 'react-router-dom'
import CenteredLoader from './components/LoaderComponents/CenterLoader'
function App() {
	const [authenticated, setAuthenticated] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const access_token = localStorage.getItem('access_token')
		if (access_token) {
			setAuthenticated(true)
		}
		setLoading(true)
	}, [])

	const handleAuthentication = (value) => {
		setAuthenticated(value)
	}

	return (
		<div className="App">
			{!loading ? (
				<CenteredLoader label={'Loading data...'} /> // Render a loading indicator or message
			) : (
				<>
					{!authenticated ? (
						<Login onLogin={handleAuthentication} />
					) : (
						<Router>
							<div className="App">
								<SideBar onLogout={handleAuthentication} />
							</div>
						</Router>
					)}
				</>
			)}
		</div>
	)
}

export default App
