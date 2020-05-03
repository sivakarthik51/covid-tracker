import React from 'react';
import './App.css';
import { Cards, Chart, CountryPicker,Map } from './components';

import styles from './App.module.css';

import {fetchData} from './api'
import image from './covidtracker.png'


class App extends React.Component {

  state = {
    data:{}
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({data: fetchedData})
  }
  render() {

    const {data} = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="COVID-19" />
        <Cards data={data}/>
        <CountryPicker />
        <Chart />
        <Map />
      </div>
      
    );
  }
}

export default App;
