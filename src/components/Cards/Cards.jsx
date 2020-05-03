import React from 'react';
import {Card,Row,Col,Statistic,Typography} from 'antd';
import CountUp from 'react-countup';


import styles from './Cards.module.css';

const {Text} = Typography;

const Cards = ({data: {confirmed,recovered,deaths,lastUpdate}}) => {
    if(!confirmed) 
    {
        return (
            <Row gutter={16}>
                <Col span={8}>
                    <Card style={{ width: 300, marginTop: 16 }} loading={true} />
                </Col>
                <Col span={8}>
                    <Card style={{ width: 300, marginTop: 16 }} loading={true} />
                </Col>
                <Col span={8}>
                    <Card style={{ width: 300, marginTop: 16 }} loading={true} />
                </Col>
            </Row>
        )
    }
   
    return (
        <div className= {styles.container}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col className="gutter-row"  xs={24} sm={24} md={24} lg={8} xl={8} >
        <Card title="Infected" bordered={false}  style={{width:'300px',borderBottom: '10px solid rgba(0,0,255,0.5)'}} hoverable >
            <Statistic title="Active Cases" prefix={<CountUp end={confirmed.value} duration={2.5} separator=","/>} value={"Confirmed"} />
            <Text type="secondary">{new Date(lastUpdate).toDateString()}</Text>
        </Card>
      </Col>
      <Col className="gutter-row" xs={24} sm={24} md={24} lg={8} xl={8}>
        <Card title="Recovered" bordered={false}  style={{width:'300px',borderBottom: '10px solid rgba(0,255,0,0.5)'}} hoverable>
            <Statistic title="Recovered Cases" prefix={<CountUp end={recovered.value} duration={2.5} separator="," />} value={"Recovered"} />
            <Text type="secondary">{new Date(lastUpdate).toDateString()}</Text>
        </Card>
      </Col>
      <Col className="gutter-row" xs={24} sm={24} md={24} lg={8} xl={8}>
        <Card title="Deaths" bordered={false}  style={{width:'300px',borderBottom: '10px solid rgba(255,0,0,0.5)'}} hoverable>
            <Statistic title="Number of Deaths" prefix={<CountUp end={deaths.value} duration={2.5} separator=","/>} value={"Dead"} />
            <Text type="secondary">{new Date(lastUpdate).toDateString()}</Text>
        </Card>
      </Col>
    </Row>
        </div>
    )
}

export default Cards;