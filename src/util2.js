import React from 'react';
import numeral from "numeral"
import {Circle,Popup} from "react-leaflet";

const casesTypeColors = {
    confirmed: {
      hex: "#CC1034",   
      multiplier: 400,
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 600,
    },
    dead: {
      hex: "#fb4443",    
      multiplier: 1000,
    },
  };

// draw circles on the map with interactive tooltips
export const showDataOnMap = (data, casesType = "confirmed") =>
  data.map((state) => (
    <Circle
      center={[state.stateInfo.data[0].latitude, state.stateInfo.data[0].longitude]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(state[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
    <Popup>
        <div className="info-container">           
            {/* <div className="info-name">{state.state}</div>
            <div className="info-confirmed">Cases: {numeral(state.confirmed).format("0,0")}</div>
            <div className="info-recovered">Recovered: {numeral(state.recovered).format("0,0")}
            </div>
            <div className="info-deaths">Deaths: {numeral(state.dead).format("0,0")}</div> */}
            <h1>i am a popup</h1>
        </div>
    </Popup>

    </Circle>
  ));
