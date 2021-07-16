import { Button, Space } from 'antd'
import Layout from 'antd/lib/layout/layout'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import database from '../../../configs/db'
import { covidDays, getCovidsPerDay, getDayDetails, getDays } from '../../../utils/convert.util'
import './index.css'

function LineChart() {
	const [data, setData] = useState({})
	const [records, setRecords] = useState([])
	const [covidDetail, setCovidDetail] = useState([])

	useEffect(() => {
		const setup = async () => {
			const covidRecords = await (await database.ref('covids/days').once('value')).val()
			setRecords(getDayDetails(covidDays(covidRecords)))

			setData({
				labels: getDays(covidDays(covidRecords)),
				datasets: [
					{
						label: 'Người nhiễm',
						backgroundColor: 'rgba(67, 177, 230, 0.3)',
						data: getCovidsPerDay(covidDays(covidRecords)),
						fill: false,
						cubicInterpolationMode: 'monotone',
						tension: 0.6,
						borderColor: '#03a9f4',
						borderWidth: 2,
					},
				],
			})
		}

		setup()
	}, [])

	const convertText = (html) => {
		html = html.replace(/<style([\s\S]*?)<\/style>/gi, '')
		html = html.replace(/<script([\s\S]*?)<\/script>/gi, '')
		html = html.replace(/<\/div>/gi, '\n')
		html = html.replace(/<\/li>/gi, '\n')
		html = html.replace(/<li>/gi, '  *  ')
		html = html.replace(/<\/ul>/gi, '\n')
		html = html.replace(/<\/p>/gi, '\n')
		html = html.replace(/<br\s*[\\/]?>/gi, '\n')
		html = html.replace(/<[^>]+>/gi, '')
		return html
	}

	const options = {
		onClick: function (evt, element) {
			if (element.length > 0) {
				const { index } = element[0]
				console.log(index)
				setCovidDetail(records[index])
			}
		},
		responsive: true,
		elements: {
			point: {
				radius: 5,
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
				type: 'category',
			},
			y: {
				grid: {
					display: false,
				},
				min: 0,
				display: true,
			},
		},
	}

	return (
		<Layout className="linechart">
			<div className="linechart__chart">
				<Line type="line" data={data} options={options} />
			</div>
			<div className="linechart__options">
				<Space>
					<Button type="primary">Year</Button>
					<Button type="default" className="active">
						Month
					</Button>
					<Button type="primary">Day</Button>
				</Space>
			</div>
			<Layout className="linechart__detail">
				{covidDetail
					? covidDetail.map((detail, key) => {
							return <div key={key}>{convertText(detail.data.content)}</div>
					  })
					: null}
			</Layout>
		</Layout>
	)
}

export default LineChart
