import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DialogBox from './DialogBox'
import ComponentsTab from '../components/TabComponents/ComponentsTab'
import ManualStepsTab from '../components/TabComponents/ManualStepsTab'
import GenericTab from '../components/TabComponents/GenericTab'
import CenteredLoader from './LoaderComponents/CenterLoader'
import { performDeleteOnServer } from './utils'
export default function ColorTabs({ id, formData }) {
	const [loading, setLoading] = useState(false)
	const [value, setValue] = useState('Auto Components')
	const [openDialog, setOpenDialog] = useState(false)
	const [tableRows, setTableRows] = useState({
		Auto: [],
		Manual: [],
	})
	const [editRowData, setEditRowData] = useState(null)
	useEffect(() => {
		const fetchDataWithRetry = async (retry = true) => {
			try {
				const getURL = `/getcomponent/${parseInt(id.split('_')[1])}`
				const access_token = localStorage.getItem('access_token')
				const headers = {
					Authorization: `Bearer ${access_token}`,
				}
				const URL =
					'https://secondapp-industrious-badger-je.cfapps.us10-001.hana.ondemand.com' +
					getURL
				setLoading(true)
				const response = await fetch(URL, {
					headers,
				})
				const responseData = await response.json()

				if (response.status === 200) {
					setLoading(false)
					setTableRows({
						Auto: responseData.Component.Auto,
						Manual: responseData.Component.Manual,
					})
				} else if (response.status === 401 && retry) {
					await refreshToken()
					fetchDataWithRetry(id, false)
				}
			} catch (error) {
				console.log(error)
				if (error.response && error.response.status === 401 && retry) {
					console.log(retry ? 'First' : 'second')

					await refreshToken()
					fetchDataWithRetry(id, false) // Retry without allowing further retries
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

		fetchDataWithRetry(id)
	}, [id])

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const handleOpenDialog = () => {
		setOpenDialog(true)
		setEditRowData(null)
	}

	const handleCloseDialog = () => {
		setOpenDialog(false)
	}

	const setRows = (type, obj) => {
		setTableRows((prevRows) => {
			const newRows = { ...prevRows }
			const existingObjIndex = newRows[type].findIndex(
				(row) => row.ComponentID === obj.ComponentID
			)
			if (existingObjIndex !== -1) {
				newRows[type][existingObjIndex] = {
					...newRows[type][existingObjIndex],
					ComponentType: obj.ComponentType,
					ComponentName: obj.ComponentName,
					MigrationId: obj.MigrationId,
					ViaPackage: obj.ViaPackage,
					Unikey: obj.Unikey,
				}
			} else {
				newRows[type].push(obj)
			}
			return newRows
		})
	}

	const handleDeploy = () => {
		const payload = {
			AutoSetup: tableRows.Auto,
			ManualSetup: tableRows.Manual,
			formData: formData,
		}
		console.log(payload)

		toast.success('Scripts deployed successfully!', {
			position: 'top-center',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			draggable: true,
			progress: undefined,
		})
	}

	const handleEditRow = (rowData) => {
		setEditRowData(rowData)
		setOpenDialog(true)
	}

	const handleDeleteRow = (rowData) => {
		const type = value === 'Auto Components' ? 'Auto' : 'Manual'
		setTableRows((prevRows) => {
			const newRows = { ...prevRows }
			newRows[type] = newRows[type].filter(
				(row) => row.ComponentID !== rowData.ComponentID
			)
			return newRows
		})

		const res = performDeleteOnServer(rowData)
		if (res) {
			toast.success('Item deleted successfully!', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				draggable: true,
				progress: undefined,
			})
		}
	}

	const tabs = [
		{ value: 'Auto Components', label: 'Auto Components' },
		{ value: 'Manual Components', label: 'Manual Components' },
	]

	return (
		<Box
			sx={{
				width: '100%',
				mt: 2,
				border: '1px solid #3a1f3f',
				borderRadius: '8px',
				boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
				// Add any other custom styling properties here
			}}
		>
			<GenericTab value={value} onChange={handleChange} tabs={tabs} />

			{!loading ? (
				<div>
					{value === 'Auto Components' && (
						<ComponentsTab
							tbrows={tableRows.Auto}
							handleOpenDialog={handleOpenDialog}
							handleDeploy={handleDeploy}
							handleEditRow={handleEditRow}
							handleDeleteRow={handleDeleteRow}
						/>
					)}
					{value === 'Manual Components' && (
						<ManualStepsTab
							tbrows={tableRows.Manual}
							handleOpenDialog={handleOpenDialog}
							handleDeploy={handleDeploy}
							handleEditRow={handleEditRow}
							handleDeleteRow={handleDeleteRow}
						/>
					)}
					{openDialog && (
						<DialogBox
							openDialog={openDialog}
							handleCloseDialog={handleCloseDialog}
							value={value}
							id={id}
							setRows={setRows}
							editRowData={editRowData}
						/>
					)}
				</div>
			) : (
				<CenteredLoader />
			)}
		</Box>
	)
}
