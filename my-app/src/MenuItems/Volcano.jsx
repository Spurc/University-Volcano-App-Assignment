import React from "react";
import { Map, Marker } from "pigeon-maps";
import ReactDOM from 'react-dom/client';
import Chart from 'chart.js/auto';

//API link to connect to swaggerDocs
const API = "API KEY HERE";
const volIndi = API + "/volcano/";

//Collects the ID of the volcano clicked in VolcanoList.jsx.
let vId = localStorage.getItem("vLocal"); 

//Asynchronous function that handles the populationDensity chart.
async function populationDensity() {
    //Collect the token from login.
    let token = localStorage.getItem("token");    

    //If a user is Authenticated (has a login token).
    if(token) {
        //Fetch the population density data with the token recieved above.
        const response = await fetch(volIndi + vId, {
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
        });
        const data = await response.json();

        //Store where the location will be rendered.
        const chartLocation = document.getElementById("chart").getContext('2d');
        
        //Create the population density chart with the CHart.js module.
        const popChart = new Chart(chartLocation, {
            type: 'bar',
            data: {
                labels: ['5km', '10km', '30km', '100km'],
                datasets: [{
                    label: 'Population Desnity',
                    data: [data.population_5km, data.population_10km, data.population_30km, data.population_100km],
                    backgroundColor: [
                        'rgba(64, 245, 145, 0.8)',
                        'rgba(220, 245, 64, 0.8)',
                        'rgba(245, 122, 64, 0.8)',
                        'rgba(208, 21, 21, 0.8)'
                    ],
                    borderColor: [
                        'rgba(64, 245, 145)',
                        'rgba(220, 245, 64)',
                        'rgba(245, 122, 64)',
                        'rgba(208, 21, 21)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        
    }
    else {
        console.log("No token");
    }
}

//Asynchronous function that handles the Pigeon Map and the individual volcano information.
async function individualVolcanoInfo (){
    //Fetches the indivual volacno information using the id that was stored above.
    const volcanoInfoR = await fetch(volIndi + vId);
    const volcanoInfoD = await volcanoInfoR.json(); 
    
    //Stores and parses the volcano lat and long so it can be used in the <Map>.
    let volLatParsed = parseFloat(volcanoInfoD.latitude);
    let volLongParsed = parseFloat(volcanoInfoD.longitude);

    //Get the location of each volcano information field and sets the coressponding data dynamically.
    document.getElementById("Name").innerHTML = volcanoInfoD.name;
    document.getElementById("Country").innerHTML = "Country: " + volcanoInfoD.country;
    document.getElementById("Region").innerHTML = "Region: " + volcanoInfoD.region;
    document.getElementById("SubRegion").innerHTML = "Subregion: " + volcanoInfoD.subregion;
    document.getElementById("LastErupt").innerHTML = "Last Eruption: " + volcanoInfoD.last_eruption;
    document.getElementById("Summit").innerHTML = "Summit: " + volcanoInfoD.summit + "m";
    document.getElementById("Elevation").innerHTML = "Elevation: " + volcanoInfoD.elevation + "ft";

    //Creates and renders the Pigeon Map module.
    const map = ReactDOM.createRoot(document.getElementById("map"));
    const mapElement = <Map height={400} width={2000} defaultCenter = {[volLatParsed, volLongParsed]} defaultZoom={6}>
                            <Marker width = {60} anchor = {[volLatParsed, volLongParsed]}/>
                        </Map>;
    map.render(mapElement);
}

//Main function that runs the above async functions and sets the layout of the page.
export default function indiviualVolcano() {
    individualVolcanoInfo();
    populationDensity();   
    
    return (
        <div id = "v">
            <section className = "volcano">
                <h1 id = "Name">{vId}</h1>
                <p id = "Country">Country</p><br></br>
                <p id = "Region">Region</p><br></br>
                <p id = "SubRegion">Subregion</p><br></br>
                <p id = "LastErupt">Last Eruption</p><br></br>
                <p id = "Summit">Summit</p><br></br>
                <p id = "Elevation">Elevation</p><br></br>
            </section> 
            <section id = "map" ></section>
            <section id = "chartPop">
                <canvas id = "chart"></canvas>    
            </section>                         
        </div>      
    
    )
}
