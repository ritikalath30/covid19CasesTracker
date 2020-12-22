import React, { useState, useEffect} from 'react';
import './India.css';
import { FormControl, Select, MenuItem, Card, CardContent, Button } from '@material-ui/core';
import Navbar from './components/Navbar';

function India() {

    // UseStates:-
    
    const [states, setStates] = useState([]);
    const [state, setState] = useState('india');
  
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
                
                setStates(states);
            });
            
        };
        getStatesData();

    }, []);

    const onStateChange = async (event) => {
        const stateCode = event.target.value;
        console.log("jamwn",stateCode)

        setState(stateCode);
    }


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
                      {/* InfoBoxes */}
                        {/* InfoBoxes */}
                        {/* InfoBoxes */}

            </div>
            

           
                {/* Map */}
                
            {/* Prediction textboxes */}
            </div>
        
          

            {/* Table */}

           

            {/* Graph */}



        </div>
    )
}

export default India

