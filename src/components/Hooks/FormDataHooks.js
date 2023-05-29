import { useContext } from 'react'
import FormDataContext from '../Appcontext/MigrationContext'

function useMigrationContext() {
	return useContext(FormDataContext)
}

export default useMigrationContext
