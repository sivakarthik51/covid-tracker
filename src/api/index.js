import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let modifiedURL = url;
    if(country)
    {
        modifiedURL = `${url}/countries/${country}`;
    }

    try{
        const { data: {confirmed,recovered,deaths,lastUpdate} } = await axios.get(modifiedURL);
        return { confirmed,recovered,deaths, lastUpdate };
    }
    catch(error)
    {
        console.log(error);
    }

}

export const fetchDailyData = async () => {
    try{
        const {data} = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) => ({
            confirmed:dailyData.confirmed.total,
            deaths:dailyData.deaths.total,
            date:dailyData.reportDate
        }))
        return modifiedData;
    }
    catch(error)
    {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try{
        const {data: {countries}} = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);

    }
    catch(error)
    {
        console.log(error);
    }
}

export const getStatsByCountry = async (statname) => {
    try {
        const {data} = await axios.get(`${url}/${statname}`);
        var countryWiseStats = {}
        data.forEach(element => {
            if(element.countryRegion in countryWiseStats )
            {
                countryWiseStats[element.countryRegion].value+=element[statname];
            }
            else
            {
                countryWiseStats[element.countryRegion] = {
                    code:element.iso3,
                    value: element[statname],
                    name: element.countryRegion
                }
            }
            
        });
        return Object.values(countryWiseStats);
    }
    catch(error)
    {
        console.log(error);
    }
}