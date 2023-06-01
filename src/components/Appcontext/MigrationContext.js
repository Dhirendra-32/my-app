import React, { createContext, useState, useEffect } from 'react'
const FormDataContext = createContext()

const FormDataProvider = ({ children }) => {
	const [formValues, setFormData] = useState({})
	const [showForm, setShowForm] = useState(false)
	const [Save, SetSave] = useState(false)
	const [autoComponent, setautoComponent] = useState(null)
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
	const [isButtonClicked, setIsButtonClicked] = useState(false)

	useEffect(() => {
		const fetchDataWithRetry = async (data, retry = true) => {
			try {
				const getURL = `/getmigrationById/${parseInt(
					data.MIGRATIONID.split('_')[1]
				)}`
				const access_token = localStorage.getItem('access_token')
				const headers = {
					Authorization: `Bearer ${access_token}`,
				}
				const URL =
					'https://secondapp-industrious-badger-je.cfapps.us10-001.hana.ondemand.com' +
					getURL
				const response = await fetch(URL, {
					headers,
				})
				const responseData = await response.json()

				if (response.status === 200) {
					if (responseData.Migrations.MigrationName) {
						UpdateSaveState(true)
					}

					UpdateStateFromAPI(responseData.Migrations)
				} else if (response.status === 401 && retry) {
					await refreshToken()
					fetchDataWithRetry(data, false)
				}
			} catch (error) {
				console.log(error)
				if (error.response && error.response.status === 401 && retry) {
					console.log(retry ? 'First' : 'second')

					await refreshToken()
					fetchDataWithRetry(data, false) // Retry without allowing further retries
				} else {
					console.error(error)
				}
			}
		}

		const refreshToken = async () => {
			try {
				const RefreshURL =
					'https://secondapp-industrious-badger-je.cfapps.us10-001.hana.ondemand.com/refresh'
				const refresh_token = localStorage.getItem('refresh_token')
				console.log('refresh_token', refresh_token)
				if (refresh_token) {
					const refreshResponse = await fetch(RefreshURL, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${refresh_token}`,
						},
					})
					if (refreshResponse.ok) {
						const { access_token } = await refreshResponse.json()
						console.info('Received new token: ' + String(access_token))
						localStorage.setItem('access_token', access_token)
					}
				}
			} catch (error) {
				console.error(error)
			}
		}

		const storedFormValues = localStorage.getItem('formValues')
		const AutoComponet = localStorage.getItem('Auto')
		if (AutoComponet) {
			setautoComponent(JSON.parse(AutoComponet))
		}
		if (storedFormValues) {
			setShowForm(true)
			const data = JSON.parse(storedFormValues)
			setFormData(data)
			fetchDataWithRetry(data)
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
		setCurrentState((prevState) => ({
			...prevState,
			[name]: newValue,
		}))
	}

	const UpdateStateFromAPI = (responseData) => {
		setCurrentState((prevState) => ({
			...prevState,
			...responseData,
		}))
	}

	const updateAutoComponent = (data) => {
		setautoComponent(data)
		setIsButtonClicked(true)
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
		updateAutoComponent,
		autoComponent,
		isButtonClicked,
	}
	return (
		<FormDataContext.Provider value={valueToShare}>
			{children}
		</FormDataContext.Provider>
	)
}

export { FormDataProvider }
export default FormDataContext
