import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { FormDataProvider } from './components/Appcontext/MigrationContext'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<FormDataProvider>
			<App />
		</FormDataProvider>
	</React.StrictMode>
)
