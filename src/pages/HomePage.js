import { Col, Layout, Row } from 'antd'
import React from 'react'
import LineChart from '../components/chart/LineChart/LineChart'
import './index.css'

function HomePage() {
	return (
		<Layout className="homePage">
			<Layout className="homePage__overlay">
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
			</Layout>
			<Layout className="homePage__layout">
				<LineChart />
			</Layout>
			<div className="homePage_overview">
				<div className="vietname__region">
					<Row gutter={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
						<Col span={6}>Ca nhiễm: 121312</Col>
						<Col span={6}>Điều trị: 121312</Col>
						<Col span={6}>Khỏi: 121312</Col>
						<Col span={6}>Tử vong : 121312</Col>
					</Row>
				</div>
			</div>
		</Layout>
	)
}

export default HomePage
