import { Col, Row, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import LineChart from '../components/chart/LineChart/LineChart'
import database from '../configs/db'
import { covidDays, getDayDetails, getLastRecord } from '../utils/convert.util'
import { parseCurrentTime } from '../utils/time.util'
import './index.css'

function HomePage() {
	const [covidOverview, setCovidOverview] = useState([])
	const [records, setRecords] = useState([])
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const getCovidOverview = async () => {
			const data = await (await database.ref('covids/overviews/' + parseCurrentTime()).once('value')).val()
			setCovidOverview(data)
		}

		const getRecords = async () => {
			const covidRecords = await (await database.ref('covids/days').once('value')).val()
			setRecords(getDayDetails(covidDays(covidRecords)))
			setLoading(false)
		}

		getCovidOverview()
		getRecords()
	}, [])

	return (
		<div className="main">
			<Row className="home">
				<Col lg={10} xl={10} sm={24} md={24} xs={24} className="homePage">
					<div className="homePage__overlay">
						<div className="homePage__space">
							<p className="homePage__covid--c">
								<span>c</span>
								<span>c</span>
							</p>
							<p>
								<img src="https://www.pat.nhs.uk/Coronavirus/images/Covid%2019%20Icon.png" />
							</p>
							<p className="homePage__covid--vid">
								<span>vid</span>
								<span>vid</span>
							</p>
						</div>
						<div className="homePage__tracking">Tracking</div>
					</div>
					<LineChart />
					<div className="homePage__overview">
						<Row>
							<Col span={6}>
								<p>Ca khỏi</p>
								<p className="color--green">{covidOverview[2]}</p>
							</Col>
							<Col span={6}>
								<p>Ca nhiễm</p>
								<p className="color--red">{covidOverview[0]}</p>
							</Col>
							<Col span={6}>
								<p>Đang chữa trị</p>
								<p className="color--blue">{covidOverview[1]}</p>
							</Col>
							<Col span={6}>
								<p>Tử vong</p>
								<p className="color--dark">{covidOverview[3]}</p>
							</Col>
						</Row>
					</div>
				</Col>
				<Col lg={14} xl={14} sm={24} md={24} xs={24} className="news">
					<h1>
						Live
						<img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Red_circle.gif" />
					</h1>
					<Row className="news__contents">
						{loading ? (
							<Skeleton active paragraph={{ rows: 20 }} />
						) : (
							<Col span={24} className="content">
								<div
									className="content__time"
									contentEditable="false"
									dangerouslySetInnerHTML={{ __html: `${getLastRecord(records).time}` }}
								></div>
								<div contentEditable="false" dangerouslySetInnerHTML={{ __html: getLastRecord(records).content }}></div>
							</Col>
						)}
					</Row>
				</Col>
			</Row>
		</div>
	)
}

export default HomePage
