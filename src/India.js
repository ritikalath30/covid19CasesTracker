import React, { useState, useEffect} from 'react';
import './India.css';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import Navbar from './components/Navbar';
import InfoBox from './InfoBox';

import Table2 from './Table2'
import Loader from './Loader';

import Map2 from './Map2'
import "leaflet/dist/leaflet.css";



function India() {

    // UseStates:-
    
    const [states, setStates] = useState([]);
    const [state, setState] = useState('india');
    const [stateInfo,setStateInfo] = useState([]);
    const[tableData,setTableData] = useState([]);
    const[loading,setLoading]= useState(true);
    const [mapCenter, setMapCenter] = useState({ lat: 20.593684, lng: 78.96288 });
    const [mapZoom, setMapZoom] = useState(4);
    
    const [mapStates, setMapStates] = useState([]);

// UseEffects:-

    // india chya InfoBox chya data sathi
    useEffect(() => {
        fetch("https://www.trackcorona.live/api/countries/in")
        .then((response) => response.json())
        .then((data) => {
            
            setStateInfo(data);
            setLoading(false)
        });
        
    }, [])
  
    // Dropdown chya values sathi
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
                  
                setTableData(data.data.statewise);
                
                console.log(data)
                setMapStates(data); 
                setStates(states);
            });
            
        };
        getStatesData();
        

    }, []);

    const onStateChange = async (event) => {
        setLoading(true);
        const stateCode = event.target.value;
        setState(stateCode);
        const url = stateCode === 'india' ? 'https://www.trackcorona.live/api/countries/in' 
        : `https://www.trackcorona.live/api/provinces/${stateCode}`
        await fetch(url)
        .then((response) => response.json())
        .then((data) => {
      
            setState(stateCode);
            setStateInfo(data);
            
            setLoading(false);
            
            setMapCenter([stateInfo.data[0].latitude, stateInfo.data[0].longitude]);
            setMapZoom(6);
            // setStateInfo(stateInfo)
        });
     
        };
        // console.log("state info", stateInfo );

        if(loading){
            return <Loader />
        }

        return (
        <div className="india">
            

            {/* Header */}

            {/* SideMenu */}
            {/* <Navbar/> */}
           
                

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
            // cases = {456}
            cases={stateInfo.data[0].confirmed}

            />
            <InfoBox
            // active={casesType === "recovered"}
            // onClick={(e) => setCasesType("recovered")}  
            title="Recovered" 
            // cases={1234} 
            cases={stateInfo.data[0].recovered}
            // total={1234}

            />
            <InfoBox 
            // isRed
            // active={casesType === "deaths"}
            // onClick={(e) => setCasesType("deaths")} 
            title="Deaths" 
            // cases={234} 
            cases={stateInfo.data[0].dead}

            />
                      {/* InfoBoxes */}
                        {/* InfoBoxes */}
                        {/* InfoBoxes */}

            </div>
            

           
                {/* Map */}
            <Map2 
                states={mapStates}
                center={mapCenter}
                zoom={mapZoom}
            />
                
            {/* Prediction textboxes */}
            </div>
            <Card className="india__right">
                     <CardContent>
                     <h1>Live cases by States</h1>
                     </CardContent>
            
        
          

            {/* Table */}
            <Table2  states = {tableData}/>

           

            {/* Graph */}

            </Card>

        </div>
    )
}

export default India

