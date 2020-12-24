import React, {useState, useEffect} from 'react';
import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent, Button } from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData, prettyPrintStat } from "./util";
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";
import {useHistory} from 'react-router-dom';




function App() {

    //STATE == How to write a variable in React

     const [countries, setCountries] = useState([]);
     const [country, setCountry] = useState('worldwide');
     const [countryInfo, setCountryInfo] = useState({});
     const [tableData, setTableData] = useState([]);
     const [mapCenter, setMapCenter] = useState({ lat: 14.80746, lng: 10.4796 });
     const [mapZoom, setMapZoom] = useState(2);
     const [mapCountries, setMapCountries] = useState([]);
     const [casesType, setCasesType] = useState("cases");
     


    //  USEEFFECT = Runs a piece of code based on a given condition.
    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
            setCountryInfo(data);
        });
        
    }, [])
     useEffect(() => {
        // async = send a request, wait for it and do something with the info
        const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
            .then((response)=> response.json())
            .then((data)=>{
                const countries=data.map((country)=>(
                    {
                        name:country.country, //United States
                        value:country.countryInfo.iso2 // US, AF, UK 
                    }
                ));
                const sortedData = sortData(data);
                setTableData(sortedData);
               
                setMapCountries(data);
                console.log(data);
                setCountries(countries);
            });
            
        };
        getCountriesData();

    }, []);

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;
        
        
        const url = countryCode==="worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`

        await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setCountry(countryCode);

            // All of the data from the country response
            setCountryInfo(data);
            setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
            
            setMapZoom(4);
        })
    };
    const history = useHistory();
    return ( 
        <div className = "app">  
          <div className="app__left">
          <div className="app__header">
            <h1> COVID-19 Tracker </h1>  
            <Button variant="contained" color="secondary" onClick={() => history.push('/India')} >
                India
            </Button>
           
            <FormControl className = "app__dropdown">        
                <Select variant="outlined" onChange={onCountryChange} value={country}> 

                       {/* Loop through all the states and give all the countries */}
                       <MenuItem value = "worldwide" > Worldwide </MenuItem>
                        {countries.map((country) => (                     
                            <MenuItem value = {country.value}  > {country.name} </MenuItem>

                        ))}

                    {/* <MenuItem value = "worldwide" > Worldwide </MenuItem>  
                     */}
            
                </Select>  
            </FormControl>

          </div>

          <div className="app__stats">

                     <InfoBox
                     isRed
                     active={casesType === "cases"}
                     onClick={(e) => setCasesType("cases")} 
                     title="CoronaVirus Cases" 
                     cases={prettyPrintStat(countryInfo.todayCases)} 
                     total={prettyPrintStat(countryInfo.cases)}

                     />
                     <InfoBox
                     active={casesType === "recovered"}
                     onClick={(e) => setCasesType("recovered")}  
                     title="Recovered" 
                     cases={prettyPrintStat(countryInfo.todayRecovered)} 
                     total={prettyPrintStat(countryInfo.recovered)}

                     />
                     <InfoBox 
                     isRed
                     active={casesType === "deaths"}
                     onClick={(e) => setCasesType("deaths")} 
                     title="Deaths" 
                     cases={prettyPrintStat(countryInfo.todayDeaths)} 
                     total={prettyPrintStat(countryInfo.deaths)}

                     />
                     {/* InfoBoxes title="CoronaVirus Cases" */}
                     {/* InfoBoxes title="CoronaVirus Recoveries" */}
                     {/* InfoBoxes title="CoronaVirus Death" */}

          </div>
        
        
        {/* Map */}
        <Map 
            casesType={casesType}
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
        />

            </div>
          <Card className="app__right">
                     <CardContent>
                        <h3>Live Cases by Country</h3>
                        <Table countries={tableData} />


                        {/* Graph */}
                        <h1 className="graphHello">Hello</h1>
                        
                        <h2>Worldwide new {casesType}</h2> 
                        <h1 className="graphHello">Heyy</h1>                     
                        <LineGraph casesType={casesType} />
                     </CardContent>
                    
          </Card>
        </div>
    );
}


export default App;