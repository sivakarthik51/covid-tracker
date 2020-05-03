import React from 'react';
import './App.css';
import { Cards, Chart, CountryPicker,Map } from './components';

import styles from './App.module.css';

import {fetchData} from './api'
import image from './covidtracker.png'


class App extends React.Component {

  state = {
    data:{},
    country:''
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({data: fetchedData});
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({data: fetchedData,country:country});
  }

  render() {

    const {data,country} = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="COVID-19" />
        <Cards data={data}/>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data={data} country={country}/>
        <Map />
      </div>
      
    );
  }
}

export default App;
