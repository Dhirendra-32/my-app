import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import AutoDeploye from '../components/DialogComponents/AutoDeploye'
import Manual from '../components/DialogComponents/ManualDeploye'

export default function DialogBox({
	openDialog,
	handleCloseDialog,
	value,
	id,
	setRowsFoAuto,
	setManualsetRows,
	editRowData,
}) {
	return (
		<Dialog
			open={openDialog}
			onClose={handleCloseDialog}
			maxWidth="sm"
			fullWidth
			sx={{
				'& .MuiDialog-paper': {
					width: '999px',
					maxHeight: 'calc(100% - 64px)',
					margin: '32px',
				},
			}}
		>
			<DialogTitle>Select {value}</DialogTitle>
			<DialogContent>
				{value === 'Auto Components' ? (
					<AutoDeploye
						id={id}
						handleRow={setRowsFoAuto}
						close={handleCloseDialog}
						editRowData={editRowData}
					/>
				) : (
					<Manual
						id={id}
						handleRow={setManualsetRows}
						close={handleCloseDialog}
						editRowData={editRowData}
					/>
				)}
			</DialogContent>
		</Dialog>
	)
}
