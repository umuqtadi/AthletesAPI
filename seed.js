const db = require('./database.js');

let sports_list = [
    {name: "Football"},
    {name: "Basketball"},
    {name: "Soccer"},
    {name: "Baseball"},
    {name: "Hockey"}
]

let cities_list = [
    {name: "Detroit"},
    {name: "San Francisco"},
    {name: "Miami"},
    {name: "Cleveland"},
    {name: "Los Angeles"},
    {name: "Barcelona"},
    {name: "Turin"},
    {name: "Manchester"},
    {name: "New York City"}
]

let athletes_list = [
    {
        name: "Lebron James",
        sport_id: 2,
        position: "Point Forward",
        number: 23, 
    },{
        name: "Kobe Bryant",
        sport_id: 2,
        position: "Shooting Guard",
        number: 24,
    },{
        name: "Lionel Messi",
        sport_id: 3,
        position: "Winger",
        number: 10,
    },{
        name: "Calvin Johnson",
        sport_id: 1,
        position: "Wide Receiver",
        number: 81, 
    },{
        name: "Derek Jeter",
        sport_id: 4,
        position: "Short Stop",
        number: 2, 
    },{
        name: "David Beckham",
        sport_id: 3,
        position: "Point Forward",
        number: 7, 
    },{
        name: "Cristiano Ronaldo",
        sport_id: 3,
        position: "Striker",
        number: 7, 
    },{
        name: "Dwayne Wade",
        sport_id: 2,
        position: "Shooting Guard",
        number: 3, 
    }
]