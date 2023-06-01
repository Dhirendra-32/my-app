import { deleteRequest, postRequest, patchRequest } from './APIHelper/ApiConfig'
import { toast } from 'react-toastify'
export const refreshTokenGet = async () => {
	try {
		const RefreshURL =
			'https://secondapp-industrious-badger-je.cfapps.us10-001.hana.ondemand.com/refresh'
		const refresh_token = localStorage.getItem('refresh_token')
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

export const performDeleteOnServer = async (rowData) => {
	try {
		const id = rowData.ComponentID.split('_')[1]
		const deleteComponentURL = `/deletecomponent/${id}`
		const response = await deleteRequest(deleteComponentURL)
		if (response.status === 200 && response.data.Success === 'PASS') {
			toast.success('Item deleted successfully!', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				draggable: true,
				progress: undefined,
			})
			return true
		} else if (response.status === 401) {
			await refreshTokenGet()
			performDeleteOnServer(rowData)
		}
	} catch (error) {
		console.error(error)
	}
}

export const SaveRowServer = async (data) => {
	try {
		const URL = '/setcomponents'
		const response = await postRequest(URL, data)
		if (response.status === 200) {
			toast.success('Item Added successfully!', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				draggable: true,
				progress: undefined,
			})
			return response.data.Component
		}
	} catch (error) {
		if (error.response && error.response.status === 401) {
			await refreshTokenGet()
			SaveRowServer(data)
		} else {
			console.error('Error:', error)
		}
	}
}

export const UpdateRowOnServer = async (data) => {
	try {
		const URL = '/updatecomponent'
		const response = await patchRequest(URL, data)
		if (response.status === 200 && response.data.Success === 'PASS') {
			toast.success('Item updated successfully!', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				draggable: true,
				progress: undefined,
			})
			return true
		}
	} catch (error) {
		if (error.response && error.response.status === 401) {
			await refreshTokenGet()
			UpdateRowOnServer(data)
		} else {
			console.error('Error:', error)
		}
	}
}

export const generateUniqueKey = (Type) => {
	const currentDate = new Date()
	const uniqueKey = Type + currentDate.getTime().toString()
	return uniqueKey
}
