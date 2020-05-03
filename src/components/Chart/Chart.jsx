import React, { useState, useEffect } from 'react';
import {fetchDailyData} from '../../api';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import styles from './Chart.module.css';

const Charts = ({ data:{confirmed, deaths,recovered}, country }) => {
    console.log(confirmed,recovered,deaths);
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

      const barChartOptions = {
        chart: {
            type: 'column'
        },
        title: {
            text: `Cases in ${country}`
        },
        subtitle: {
            text: 'Click the columns to view different states statisitics'
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            categories:["Confirmed","Recovered","Deaths"]
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
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}%</b> of total<br/>'
        },
    
        series: [
            {
                name:"Statistic",
                colorByPoint: true,
                data: [
                    {
                        name: "Confirmed",
                        y: confirmed ? confirmed.value : 0,
                        drilldown: "Confirmed"
                    },
                    {
                        name: "Recovered",
                        y: recovered? recovered.value: 0,
                        drilldown: "Recovered"
                    },
                    {
                        name: "Deaths",
                        y: deaths? deaths.value:0,
                        drilldown: "Deaths"
                    },
                ]
            }
        ]

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
           {country ? barChart : lineChart}

       </div>
    )
}

export default Charts;