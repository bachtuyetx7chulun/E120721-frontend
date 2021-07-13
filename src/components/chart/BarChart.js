import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'

function BarChart() {
	const [data, setData] = useState({})
	const [options, setOptions] = useState({})
	useEffect(() => {
		const getData = () => {
			setData({
				labels: ['Thang 1', 'Thang 2', 'Thang 3', 'Thang 4'],
				datasets: [
					{
						label: 'Dead rate',
						data: [12, 19, 3, 5],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(75, 192, 192, 0.2)',
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(255, 159, 64, 1)',
						],
						borderWidth: 1,
					},
				],
			})
		}

		const getOptions = () => {
			setOptions({
				responsive: true,
				scales: {
					x: {
						grid: {
							display: false,
						},
					},
					y: {
						grid: {
							display: false,
						},
					},
				},
			})
		}

		getData()
		getOptions()
	}, [])

	return (
		<div className="barchart">
			<Bar type="BarChart" data={data} options={options} />
		</div>
	)
}

export default BarChart
