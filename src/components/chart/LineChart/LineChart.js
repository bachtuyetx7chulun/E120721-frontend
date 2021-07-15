import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import database from '../../../configs/db'
import './index.css'

function LineChart() {
	const [data, setData] = useState({})
	const [options, setOptions] = useState({})
	useEffect(() => {
		const getData = async () => {
			const covidRecords = await (await database.ref('covids/days/').once('value')).val()
			console.log(covidRecords)

			setData({
				labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
				datasets: [
					{
						label: 'Views',
						backgroundColor: 'rgba(67, 177, 230, 0.3)',
						data: [5, 2, 3, 6, 4, 2, 3],
						fill: false,
						cubicInterpolationMode: 'monotone',
						tension: 0.6,
						borderColor: '#03a9f4',
						borderWidth: 2,
					},
				],
			})
		}
		const getoptions = () => {
			setOptions({
				responsive: true,
				scales: {
					x: {
						grid: {
							display: false,
						},
						type: 'category',
						labels: ['January', 'February', 'March', 'April', 'May', 'June'],
						// min: 'March',
					},
					y: {
						grid: {
							display: false,
						},
						min: 0,
						max: 20,
						display: true,
					},
				},
			})
		}

		getData()
		getoptions()
	}, [])
	return (
		<div className="linechart">
			<div className="linechart__label">
				<p>Biểu đồ covid</p>
				<span>Số ca / ngày</span>
			</div>
			<div className="linechart__chart">
				<Line type="line" data={data} options={options} />
			</div>
		</div>
	)
}

export default LineChart
