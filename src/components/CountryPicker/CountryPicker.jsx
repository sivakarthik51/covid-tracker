import React, {useState,useEffect} from 'react';
import { Select } from 'antd';
import { countries } from '../../api';

const { Option } = Select;

const CountryPicker = () => {

    const [fetchedCountries,setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            setFetchedCountries(await countries());
        }
        fetchCountries();
    },[setFetchedCountries])
    return (
        <Select

            showSearch
            style={{ width: '30%',marginBottom: '30px' }}
            placeholder="Select a Country"
            optionFilterProp="children"
            
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
        </Select>
    )
}

export default CountryPicker;