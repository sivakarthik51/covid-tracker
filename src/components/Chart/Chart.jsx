import React, { useState, useEffect } from 'react';
import {fetchDailyData} from '../../api';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import styles from './Chart.module.css';

const Charts = () => {
    const [dailyData,setDailyData] = useState([]);

    useEffect(() => {

        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    },[setDailyData]);
    const options = {
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
    
      }
       

    const lineChart = (
        dailyData.length ?
        (
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps = {{ className: styles.container }}
            />
        ):
        null

    )

    return (
       <div className={styles.container}>
           {lineChart}

       </div>
    )
}

export default Charts;