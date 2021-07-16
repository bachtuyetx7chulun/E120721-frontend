export const covidDays = (obj) => {
	const arr = []
	Object.keys(obj).map((i) => {
		let data = obj[i]
		arr.push({
			...data,
			day: getDate(data.latestUpdate),
			time: getTime(data.latestUpdate),
		})
	})

	return arr
}

export const getDayDetails = (datas) => {
	const days = datas.map((data) => {
		return data.details
	})

	return days
}

const getTime = (data) => {
	return data.split(' ')[0]
}

const getDate = (data) => {
	return data.split(' ')[1]
}

export const getDays = (datas) => {
	const days = datas.map((data) => {
		return data.day
	})

	return days
}

export const getCovidsPerDay = (datas) => {
	const days = datas.map((data) => {
		return data.total
	})

	return days
}
