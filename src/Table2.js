import React from 'react'
import './Table2.css';
import numeral from "numeral";


function Table2({ states }) {
    return (
        <div className="table" >
        {states.map(({state ,active}) => (
            <tr>
               <td>{state}</td>
               <td>
                   <strong>{active}</strong>
               </td>
           </tr>
        ))}    
        
        
        </div>
    )
}

export default Table2
