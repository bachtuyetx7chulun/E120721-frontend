import { Layout } from 'antd'
import React from 'react'
import LineChart from '../components/chart/LineChart/LineChart'
import './index.css'

function HomePage() {
	return (
		<Layout className="homePage">
			<Layout className="homePage__overlay" hidden={false}>
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
		</Layout>
	)
}

export default HomePage
