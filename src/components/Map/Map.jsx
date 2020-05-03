import React, {useState,useEffect} from 'react';

import {getStatsByCountry} from '../../api';
import Highcharts from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';
import styles from './Map.Module.css';

import WorldMap from '../HighMapsData/world';

const Map = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getStats = async () => {
            setData(await getStatsByCountry('confirmed'));
        }
        getStats();
    },[setData]);

    var options = {
        chart: {
            map: 'custom/world',
            borderWidth: 1
        },

        colors: ['rgba(19,64,117,0.05)', 'rgba(19,64,117,0.2)', 'rgba(19,64,117,0.4)',
            'rgba(19,64,117,0.5)', 'rgba(19,64,117,0.6)', 'rgba(19,64,117,0.8)', 'rgba(19,64,117,1)'],

        title: {
            text: 'Affected Patients'
        },

        mapNavigation: {
            enabled: true
        },

        legend: {
            title: {
                text: 'Confirmed Cases',
                style: {
                    color: ( // theme
                        Highcharts.defaultOptions &&
                        Highcharts.defaultOptions.legend &&
                        Highcharts.defaultOptions.legend.title &&
                        Highcharts.defaultOptions.legend.title.style &&
                        Highcharts.defaultOptions.legend.title.style.color
                    ) || 'black'
                }
            },
            align: 'left',
            verticalAlign: 'bottom',
            floating: true,
            layout: 'horizontal',
            valueDecimals: 0,
            backgroundColor: ( // theme
                Highcharts.defaultOptions &&
                Highcharts.defaultOptions.legend &&
                Highcharts.defaultOptions.legend.backgroundColor
            ) || 'rgba(255, 255, 255, 0.85)',
            symbolRadius: 0,
            symbolHeight: 14
        },

        colorAxis: {
            dataClasses: [{
                to: 500
            }, {
                from: 500,
                to: 1000
            }, {
                from: 1000,
                to: 10000
            }, {
                from: 10000,
                to: 100000
            }, {
                from: 100000,
                to: 1000000
            },{
                from:1000000
            }]
        },

        series: [{
            mapData: WorldMap,
            data: data,
            joinBy: ['iso-a3', 'code'],
            animation: true,
            name: 'Stats',
            states: {
                hover: {
                    color: '#a4edba'
                }
            },
            tooltip: {
                valueSuffix: ' confirmed'
            },
            shadow: false
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
    return (
        <HighchartsReact
            options = { options }
            highcharts = { Highcharts }
            constructorType = { 'mapChart' }
            containerProps = {{ className: styles.container }}
        />
    )

}

export default Map;