import axios from 'axios'

const API_BASE_URL =
	'https://secondapp-industrious-badger-je.cfapps.us10-001.hana.ondemand.com'

export const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${localStorage.getItem('access_token')}`,
	},
})

export const getRequest = async (url, header = null) => {
	try {
		const response = await axiosInstance.get(url, header)
		return response
	} catch (error) {
		throw error
	}
}

export const postRequest = async (url, data) => {
	try {
		const access_token = localStorage.getItem('access_token')
		const headers = {
			'Content-Type': 'application/json',
		}

		if (access_token) {
			headers.Authorization = `Bearer ${access_token}`
		}

		const response = await axiosInstance.post(url, data, { headers })
		return response
	} catch (error) {
		throw error
	}
}

export const patchRequest = async (url, data) => {
	try {
		const access_token = localStorage.getItem('access_token')
		const headers = {
			'Content-Type': 'application/json',
		}

		if (access_token) {
			headers.Authorization = `Bearer ${access_token}`
		}

		const response = await axiosInstance.patch(url, data, { headers })
		return response
	} catch (error) {
		console.error('Error:', error)
		throw error
	}
}

export const deleteRequest = async (url) => {
	try {
		const access_token = localStorage.getItem('access_token')
		const headers = {
			'Content-Type': 'application/json',
		}

		if (access_token) {
			headers.Authorization = `Bearer ${access_token}`
		}

		const response = await axiosInstance.delete(url, { headers })
		return response
	} catch (error) {
		console.error('Error:', error)
		throw error
	}
}
