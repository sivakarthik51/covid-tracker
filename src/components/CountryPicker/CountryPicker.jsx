import React, {useState,useEffect} from 'react';
import { Select } from 'antd';
import { fetchCountries } from '../../api';

const { Option } = Select;

const CountryPicker = ({ handleCountryChange }) => {

    const [fetchedCountries,setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchCountriesAPI = async () => {
            setFetchedCountries(await fetchCountries());
        }
        fetchCountriesAPI();
    },[setFetchedCountries])
    return (
        <Select
            onChange={handleCountryChange}
            showSearch
            style={{ width: '30%',marginBottom: '30px' }}
            placeholder="Select a Country"
            optionFilterProp="children"
            
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            <Option value="">Global</Option>
            {fetchedCountries.map((country,i) => <Option key={i} value={country}>{country}</Option>)}
        </Select>
    )
}

export default CountryPicker;