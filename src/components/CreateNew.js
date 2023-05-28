import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: '#3a1f3f',
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}))

export default function CustomizedTables({
	tbrows,
	handleEditRow,
	handleDeleteRow,
}) {
	return (
		<TableContainer component={Paper} sx={{ mt: 2 }}>
			<Table sx={{ minWidth: 700 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Actions</StyledTableCell>
						<StyledTableCell align="right">Object Id</StyledTableCell>
						<StyledTableCell align="right">Component</StyledTableCell>
						<StyledTableCell align="right">Scripts</StyledTableCell>
						<StyledTableCell align="right">Order</StyledTableCell>
						<StyledTableCell align="right">Via Package ?</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{tbrows
						? tbrows.map((row, index) => (
								<StyledTableRow key={index}>
									<StyledTableCell component="th" scope="row">
										<EditIcon
											sx={{ mr: 1 }}
											onClick={() => handleEditRow(row)}
										/>

										<DeleteIcon onClick={() => handleDeleteRow(row)} />
									</StyledTableCell>
									<StyledTableCell align="right">
										{row.ComponentID}
									</StyledTableCell>
									<StyledTableCell align="right">
										{row.ComponentType}
									</StyledTableCell>
									<StyledTableCell align="right">
										{Array.isArray(row.ComponentName)
											? row.ComponentName.map((item, index) => (
													<div key={index} style={{ marginBottom: '0.5rem' }}>
														<span style={{ marginRight: '0.5rem' }}>
															{index + 1}.
														</span>
														{item.value}
													</div>
											  ))
											: row.ComponentName}
									</StyledTableCell>

									<StyledTableCell align="right">
										{row.MigrationId}
									</StyledTableCell>
									<StyledTableCell align="right">{`${row.ViaPackage}`}</StyledTableCell>
								</StyledTableRow>
						  ))
						: []}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
