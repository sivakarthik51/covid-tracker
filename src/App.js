import React from 'react';
import './App.css';
import { Cards, Chart, CountryPicker,Map } from './components';

import styles from './App.module.css';

import {fetchData,getStatsByState} from './api'
import image from './covidtracker.png'


class App extends React.Component {

  state = {
    data:{},
    country:'',
    stateWiseData:{},
    loadingChart:true
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({data: fetchedData,loadingChart:false});
  }

  handleCountryChange = async (country) => {
    this.setState({loadingChart:true});
    const fetchedData = await fetchData(country);
    const stateWiseData = await getStatsByState(country);
    this.setState({data: fetchedData,country:country,loadingChart:false,stateWiseData:stateWiseData});
  }

  render() {

    const {data,country,loadingChart,stateWiseData} = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="COVID-19" />
        <Cards data={data}/>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data={data} country={country} loading={loadingChart} stateWiseData={stateWiseData}/>
        <Map />
      </div>
      
    );
  }
}

export default App;