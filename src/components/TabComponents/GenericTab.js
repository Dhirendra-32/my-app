import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
export default function GenericTab({ value, onChange, tabs }) {
	return (
		<Tabs
			value={value}
			onChange={onChange}
			textColor="secondary"
			indicatorColor="secondary"
			aria-label="secondary tabs example"
			sx={{
				borderBottom: '1px solid #3a1f3f',
				p: 1,
				borderRadius: '5px',
				boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
			}}
		>
			{/* Inside JSX tags, you can also add single-line comments */}

			{tabs.map((tab) => (
				<Tab key={tab.value} value={tab.value} label={tab.label} />
			))}
		</Tabs>
	)
}
