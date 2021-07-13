import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

function LineChart() {
	const [data, setData] = useState({})
	const [options, setOptions] = useState({})
	const [plugins, setPlugins] = useState([])
	useEffect(() => {
		const getData = () => {
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
						borderColor: 'rgba(67, 177, 230, 0.3)',
						borderWidth: 2,
					},
					{
						label: 'Subcribers',
						backgroundColor: 'red',
						data: [3, 5, 4, 3, 2, 1, 3],
					},
				],
			})
		}
		const getoptions = () => {
			setOptions({
				responsive: true,
				// elements: {
				// 	point: {
				// 		radius: 0,
				// 	},
				// },
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
						min: 0,
						display: false,
						grid: {
							display: false,
						},
					},
				},
			})
		}

		const getPlugins = () => {
			const image = new Image()
			image.src = 'https://www.chartjs.org/img/chartjs-logo.svg'
			setPlugins([
				{
					id: 'custom_canvas_background_image',
					beforeDraw: (chart) => {
						if (image.complete) {
							const ctx = chart.ctx
							const { top, left, width, height } = chart.chartArea
							const x = left + width / 2 - image.width / 2
							const y = top + height / 2 - image.height / 2
							ctx.drawImage(image, x, y)
						} else {
							image.onload = () => chart.draw()
						}
					},
				},
			])
		}

		getData()
		getoptions()
		getPlugins()
	}, [])
	return (
		<div className="linechart">
			<div className="linechart__label">
				<p>Death note</p>
				<span>Sổ sinh tử</span>
			</div>
			<div className="linechart__chart">
				<Line type="line" data={data} options={options} plugins={plugins} />
			</div>
		</div>
	)
}

export default LineChart
