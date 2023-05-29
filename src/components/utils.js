export const refreshTokenGet = async () => {
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
