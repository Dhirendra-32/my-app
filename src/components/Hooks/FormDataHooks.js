import { useContext } from 'react'
import FormDataContext from '../Appcontext/MigrationContext'

function useMigrationContext() {
	return useContext(FormDataContext)
}

export default useMigrationContext

/*


import { useEffect, useState } from 'react'
import Login from './components/PageComponents/Login'
import SideBar from './components/SideBar'
import { FormDataProvider } from './components/Appcontext/MigrationContext'
import { BrowserRouter as Router } from 'react-router-dom'

*/
