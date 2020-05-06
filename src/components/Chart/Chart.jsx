import React, { useState, useEffect } from 'react';
import {fetchDailyData} from '../../api';

import Highcharts from 'highcharts/highstock';
import drilldown from 'highcharts/modules/drilldown.js';


import HighchartsReact from 'highcharts-react-official';

import styles from './Chart.module.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

drilldown(Highcharts);
const Charts = ({ data:{confirmed, deaths,recovered}, country,loading,stateWiseData }) => {

    const barChartOptions = {
        chart: {
            type: "column",
            events: {
                drilldown: (e) => {

                },
                drillup: function (e) {
                    console.log(e);
                }
            }
        },
        title: {
            text: `Cases in ${country}`
        },
        subtitle: {
            text: 'Click the columns to view State Wise.'
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Number of Cases'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
        },

        series: [
            {
                name: "Statistics",
                colorByPoint: true,
                data: [
                    {
                        name: "Confirmed",
                        y: confirmed?.value,
                        drilldown: stateWiseData?.["confirmed"]?.length ? "Confirmed" : null
                    },
                    {
                        name: "Recovered",
                        y: recovered?.value,
                        drilldown: null
                    },
                    {
                        name: "Dead",
                        y: deaths?.value,
                        drilldown: stateWiseData?.["deaths"]?.length ? "Dead" : null
                    }
                ]
            }
        ],
        drilldown: {
            series: [
                {
                    name: "Confirmed",
                    id: "Confirmed",
                    data: stateWiseData?.["confirmed"]
                },
                {
                    name: "Recovered",
                    id: "Recovered",
                    data: null
                },
                {
                    name: "Dead",
                    id: "Dead",
                    data: stateWiseData?.["deaths"]
                }
            ]
        }
    };
    const [dailyData,setDailyData] = useState([]);

    useEffect(() => {
        
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    },[]);
    const lineChartOptions = {
        chart: {
            type: 'area'
        },
        xAxis: {
            categories: dailyData.map(({ date }) => date),
          },
        title: {
          text: 'Daily Chart'
        },
        series: [{
            name:'Confirmed',
            data: dailyData.map(({ confirmed }) => confirmed)
        },{
            name:'Deaths',
            data:dailyData.map(({ deaths }) => deaths)
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
      };

    const lineChart = (
        dailyData.length ?
        (
            <HighchartsReact
                highcharts={Highcharts}
                options={lineChartOptions}
                containerProps = {{ className: styles.container }}
            />
        ):
        null
    );

    const barChart = (
        confirmed ?
        (
            <HighchartsReact
                highcharts={Highcharts}
                options={barChartOptions}
                containerProps = {{ className: styles.container }}
            />
        ):
        null
    );
    return (
       
       <div className={styles.container}>
          { loading?
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }}  />} >
                {country ? barChart : lineChart}
           </Spin> :
           <>
           {country ? barChart : lineChart}
           </>
          }

       </div>
      
    )
}

export default Charts;