import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DialogBox from './DialogBox'
import ComponentsTab from '../components/TabComponents/ComponentsTab'
import ManualStepsTab from '../components/TabComponents/ManualStepsTab'
import GenericTab from '../components/TabComponents/GenericTab'

export default function ColorTabs({ id, formData }) {
	const [value, setValue] = useState('Auto Components')
	const [openDialog, setOpenDialog] = useState(false)
	const [AutotableRows, setRows] = useState([])
	const [ManualtableRows, setManualRows] = useState([])
	const [editRowData, setEditRowData] = useState(null)

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

	const setRowsFoAuto = (obj) => {
		const existingObjIndex = AutotableRows.findIndex(
			(row) => row.ComponentID === obj.ComponentID
		)

		if (existingObjIndex !== -1) {
			// Update the property of an existing object
			setRows((prevRows) => {
				const newRows = [...prevRows]
				newRows[existingObjIndex] = {
					...newRows[existingObjIndex],
					ComponentType: obj.ComponentType,
					ComponentName: obj.ComponentName,
					MigrationId: obj.MigrationId,
					ViaPackage: obj.ViaPackage,
				}
				return newRows
			})
		} else {
			// Add the object if it doesn't exist
			setRows((prevRows) => [...prevRows, obj])
		}
	}

	const setManualsetRows = (obj) => {
		const existingObjIndex = ManualtableRows.findIndex(
			(row) => row.ComponentID === obj.ComponentID
		)
		if (existingObjIndex !== -1) {
			// Update the property of an existing object
			setManualRows((prevRows) => {
				const newRows = [...prevRows]
				newRows[existingObjIndex] = {
					...newRows[existingObjIndex],
					ComponentType: obj.ComponentType,
					ComponentName: obj.ComponentName,
					MigrationId: obj.MigrationId,
					ViaPackage: obj.ViaPackage,
				}
				return newRows
			})
		} else {
			setManualRows((prevRows) => [...prevRows, obj])
		}
	}

	const handleDeploy = () => {
		let payload = {}
		payload['AutoSetup'] = AutotableRows
		payload['ManualSetup'] = ManualtableRows
		payload['formData'] = formData
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
		console.log('table edit clicked')
		console.log(rowData)
		setEditRowData(rowData) // Set the row data to be edited in the state
		setOpenDialog(true) // Open the dialog box
	}

	const handleDeleteRow = (rowData) => {
		if (value === 'Auto Components') {
			const UpdatedArray = AutotableRows.filter((row) => {
				return row.ComponentID !== rowData.ComponentID
			})
			setRows(UpdatedArray)
		} else {
			const ManualUpdatedArray = ManualtableRows.filter((row) => {
				return row.ComponentID !== rowData.ComponentID
			})
			setManualRows(ManualUpdatedArray)
		}
		toast.success('item deleted successfully!', {
			position: 'bottom-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			draggable: true,
			progress: undefined,
			theme: 'dark',
		})
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
			{value === 'Auto Components' && (
				<ComponentsTab
					tbrows={AutotableRows}
					handleOpenDialog={handleOpenDialog}
					handleDeploy={handleDeploy}
					AutotableRows={AutotableRows}
					handleEditRow={handleEditRow}
					handleDeleteRow={handleDeleteRow}
				/>
			)}
			{value === 'Manual Components' && (
				<ManualStepsTab
					tbrows={ManualtableRows}
					handleOpenDialog={handleOpenDialog}
					handleDeploy={handleDeploy}
					ManualtableRows={ManualtableRows}
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
					setRowsFoAuto={setRowsFoAuto}
					setManualsetRows={setManualsetRows}
					editRowData={editRowData}
				/>
			)}
		</Box>
	)
}
