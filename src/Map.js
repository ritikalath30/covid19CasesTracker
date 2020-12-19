import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import './Map.css';
import { showDataOnMap } from "./util";

function Map({countries, casesType, center, zoom}) {
    return (
        <div className="map">
        <LeafletMap center={center} zoom={zoom}>
           <TileLayer 
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               attribution='&copy; <a href="http://osm.org/copyright>"OpenStreet</a> contributors'
           />
           {/* Loop through and draw circles on the screen */}
           {showDataOnMap(countries,casesType)}
        </LeafletMap>    
        </div>
    )
}

export default Map
