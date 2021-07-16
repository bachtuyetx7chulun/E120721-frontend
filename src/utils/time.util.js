export const parseCurrentTime = () => {
	const currentTime = new Date()
	const currentDateToString = currentTime.toLocaleString().split(',')[0]
	const result =
		currentDateToString.split('/')[2] +
		('0' + currentDateToString.split('/')[0]).slice(-2) +
		currentDateToString.split('/')[1]
	return result
}
