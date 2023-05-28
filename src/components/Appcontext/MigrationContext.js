import React, { createContext, useState, useEffect } from 'react'

const FormDataContext = createContext()

const FormDataProvider = ({ children }) => {
	const [formValues, setFormData] = useState({})
	const [showForm, setShowForm] = useState(false)
	const [Save, SetSave] = useState(false)
	const [currentState, setCurrentState] = useState({
		selectedApprover: [],
		selectedDestination: [],
		selectedSource: '',
		isrepoUpdated: false,
		isUnitTested: false,
		MigrationName: '',
		releaseVersion: '',
		MigrationId: '',
		CustomerName: '',
		requestorName: '',
		deploymentStatus: '',
	})
	useEffect(() => {
		const storedFormValues = localStorage.getItem('formValues')
		if (storedFormValues) {
			setShowForm(true)
			const data = JSON.parse(storedFormValues)
			setFormData(data)
			const fetchData = async (data) => {
				try {
					const getURL = `/getmigrationById/${parseInt(
						data.MIGRATIONID.split('_')[1]
					)}`
					const token = localStorage.getItem('token')
					const headers = {
						Authorization: `Bearer ${token}`,
					}
					const URL =
						'https://secondapp-industrious-badger-je.cfapps.us10-001.hana.ondemand.com' +
						getURL
					const response = await fetch(URL, {
						headers,
					})
					const responseData = await response.json()

					if (response.status === 200) {
						UpdateStateFromAPI(responseData)
					}

					// Process the response data or update state
				} catch (error) {
					// Handle error
				}
			}

			fetchData(data)
		}
	}, [])
	const fetchFormValue = (data) => {
		setFormData(data)
		setShowForm(true)
	}

	const UpdateSaveState = (value) => {
		SetSave(value)
	}

	const UpdateCurrentState = (name, newValue, isMulti = false) => {
		if (isMulti) {
			setCurrentState((prevState) => ({
				...prevState,
				[name]: newValue,
			}))
		} else {
			setCurrentState((prevState) => ({
				...prevState,
				[name]: newValue,
			}))
		}
	}

	const UpdateStateFromAPI = (responseData) => {
		setCurrentState((prevState) => ({
			...prevState,
			selectedApprover: responseData.Migrations.selectedApprover,
			selectedDestination: responseData.Migrations.selectedDestination,
			selectedSource: responseData.Migrations.selectedSource,
			isrepoUpdated: responseData.Migrations.isrepoUpdated,
			isUnitTested: responseData.Migrations.isUnitTested,
			MigrationName: responseData.Migrations.MigrationName,
			releaseVersion: responseData.Migrations.releaseVersion,
			MigrationId: responseData.Migrations.MigrationId,
			CustomerName: responseData.Migrations.CustomerName,
			requestorName: responseData.Migrations.requestorName,
			deploymentStatus: responseData.Migrations.deploymentStatus,
		}))
	}

	const valueToShare = {
		formValues,
		fetchFormValue,
		showForm,
		currentState,
		UpdateCurrentState,
		Save,
		UpdateSaveState,
		UpdateStateFromAPI,
	}
	return (
		<FormDataContext.Provider value={valueToShare}>
			{children}
		</FormDataContext.Provider>
	)
}

export { FormDataProvider }
export default FormDataContext
