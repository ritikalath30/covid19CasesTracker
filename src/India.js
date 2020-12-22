import React, { useState, useEffect} from 'react';
import './India.css';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import Navbar from './components/Navbar';
import InfoBox from './InfoBox';
import Indiamap from './Indiamap';
import Table2 from './Table2'

function India() {

    // UseStates:-
    
    const [states, setStates] = useState([]);
    const [state, setState] = useState('india');
    const [stateInfo,setStateInfo] = useState({});
    const[tableData,setTableData] = useState([]);

    useEffect(() => {
        fetch("https://www.trackcorona.live/api/countries/in")
        .then((response) => response.json())
        .then((data) => {
            setStateInfo(data);
        });
        
    }, [])
  
    // UseEffects:-
    useEffect(() => {
        // async = send a request, wait for it and do something with the info
        const getStatesData = async () => {
            await fetch("https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise")
            .then((response)=> response.json())
            .then(
                
                (data)=>{
                const states=data.data.statewise.map((state) =>(
                    {
                        name:state.state, //Maharashtra
                        value:state.state
                    }
                
                 ) );

                setTableData(data);
                setStates(states);
            });
            
        };
        getStatesData();

    }, []);

    const onStateChange = async (event) => {
        const stateCode = event.target.value;
        setState(stateCode);
        const url = stateCode === 'india' ? 'https://www.trackcorona.live/api/countries/in' 
        : `https://www.trackcorona.live/api/provinces/${stateCode}`
        await fetch(url)
        .then(response => response.json())
        .then((data) => {
            const stateInfo = data.data.map((location) => (
                {
                    confirmedCase : location.confirmed,
                    deadCase : location.dead,
                    recoveredCase : location.recovered
                }
            ));
            setState(stateCode);
            // setStateInfo(data);
            setStateInfo(stateInfo)
        });
        
        };
        console.log("state info", stateInfo );

    return (
        <div className="india">
            

            {/* Header */}

            {/* SideMenu */}
            <Navbar/>
           
                

            {/* Title + Input dropdown Field */}
            <div className="india__left">
            <div className="india__header">
            <FormControl className = "india__dropdown">        
                <Select variant="outlined" onChange={onStateChange}  value={state}> 

                       {/* Loop through all the states and give all the countries */}
                       <MenuItem value = "india" > India </MenuItem>
                        {states.map((state) => (                     
                            <MenuItem value={state.value} > {state.name} </MenuItem>

                        ))}

                    {/* <MenuItem value = "worldwide" > Worldwide </MenuItem>  
                     */}
            
                </Select>  
            </FormControl>

            </div>
            <div className="india__stats">
            
            <InfoBox
            // isRed
            // active={casesType === "cases"}
            // onClick={(e) => setCasesType("cases")} 
            title="CoronaVirus Cases" 
            // cases={stateInfo.map((location) => (
            //     {locationconfirmedCase}
            // ))} 
            cases = {stateInfo.confirmedCase}
            // total={prettyPrintStat(countryInfo.cases)}

            />
            <InfoBox
            // active={casesType === "recovered"}
            // onClick={(e) => setCasesType("recovered")}  
            title="Recovered" 
            // cases={prettyPrintStat(countryInfo.todayRecovered)} 
            // total={prettyPrintStat(countryInfo.recovered)}

            />
            <InfoBox 
            // isRed
            // active={casesType === "deaths"}
            // onClick={(e) => setCasesType("deaths")} 
            title="Deaths" 
            // cases={prettyPrintStat(countryInfo.todayDeaths)} 
            // total={prettyPrintStat(countryInfo.deaths)}

            />
                      {/* InfoBoxes */}
                        {/* InfoBoxes */}
                        {/* InfoBoxes */}

            </div>
            

           
                {/* Map */}
            <Indiamap />
                
            {/* Prediction textboxes */}
            </div>
            <Card className="india__right">
                     <CardContent>
                     <h1>Live cases by States</h1>
                     </CardContent>
            </Card>
        
          

            {/* Table */}
            <Table2  states = {tableData}/>

           

            {/* Graph */}



        </div>
    )
}

export default India

