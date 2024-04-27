import React from "react";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Color } from "ag-grid-community";

//API urls that connect to the provided swaggerDocs.
const API = "API KEY HERE";
const countryURL = API + "/countries";
const volcanoURL = API + "/volcanoes"

//Main application that is renderd.
export default function App(){
    //Initalise the volcano url (for API) and the volcanoID.
    let urlV = "";
    let volcanoClickedId;

    //useStates are used to dynamically update the ag-grid. 
    const [rowData, setRowData] = useState([]);
    const [countryError, setError] = useState(false);
    
    //Component that sets the ag-grid options. In this instance it stores the volanoes ID on the cell clicked.
    const gridOptions = {
        onCellClicked: event => {volcanoClickedId = event.data.id; indiVol()}            
    }
    
    //Sets the columns of the ag-grid.
    const column = [
        {headerName: "Name", field: "name"},
        {headerName: "Region", field: "region"},
        {headerName: "Subregion", field: "subregion"},
    ];
    
    //Function is run when row cell is clicked. Stores the volcano ID and sends user to Volcano.jsx.
    function indiVol() {
        localStorage.setItem("vLocal", volcanoClickedId);
        window.location.href = "/Volcano"
    }    

    //Nested asynchronous function that fetches the data from /volcanos and /countries.  
    async function userInput() {
        const countryResponse = await fetch(countryURL);
        const countryData = await countryResponse.json();
        
        //Store the user inputs.
        let userInputC = document.getElementById("Country").value;
        let userInputP = document.getElementById("pop").value;

        //Alerts the user if their country input does not exist or if spelling is incorrect.
        if(!countryData.includes(userInputC)){
            setError("Opps! Seems like the country you entered does not exist please check the spelling or try again.");         
        }
        else {
            setError(false);
        }
        
        //Handles the populated within dropdown and updates the url accordingly. 
        if(document.getElementById("pop").value === "0") {
            urlV = "?country=" + userInputC;
        }
        else if (document.getElementById("pop").value === "5km"){
            urlV = "?country=" + userInputC + "&populatedWithin=" + userInputP;
        }
        else if (document.getElementById("pop").value === "10km"){
            urlV = "?country=" + userInputC + "&populatedWithin=" + userInputP;
        }
        else if (document.getElementById("pop").value === "30km"){
            urlV = "?country=" + userInputC + "&populatedWithin=" + userInputP;
        }
        else if (document.getElementById("pop").value === "100km"){
            urlV = "?country=" + userInputC + "&populatedWithin=" + userInputP;
        }
        
        //Fetches the /volcano data using the above code to dynamically update the url dependent on user input.
        const resV = await fetch(volcanoURL + urlV);
        const dataV = await resV.json();

        //Set the ag-grid rowsData depending on the result from the above fetch.
        setRowData(dataV);
    } 
    
    //Renders the page layout.
    return (
        <div
            className="ag-theme-balham"
            style ={{
                height: "300px",
                width: "600px"
            }}
        >
            <h1 id = "h1">Volcano List</h1>            
            <br></br>
            <input 
                id = "Country"
                type = "text"
                placeholder = "Country Name"
            />
           <select id = "pop">  
                <option value = "0" disabled selected>Populated Within</option>
                <option value = "5km">5km</option>
                <option value = "10km">10km</option>
                <option value = "30km">30km</option>
                <option value = "100km">100km</option>
            </select>
            <button className = "search" onClick={userInput}>Search</button>
            <AgGridReact id = "grid" columnDefs = {column} gridOptions = {gridOptions} rowData = {rowData} pagination={true} paginationPageSize = {20}/> 
            {countryError && <p id = "CountryError" style = {{color: "red", fontSize: "20px"}}>{countryError}</p>}
        </div>
    );
}


