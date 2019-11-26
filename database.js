let sqlite3 = require('sqlite3');
let database = new sqlite3.Database('./database.db')

//Sport table
//name of sport

//Athlete Table
//Name
//sport_id
//position
//number
//city

//City Table
//Name of city

//Athlete-City Table
//Many-to-many
//Athlete ID
//City ID

const createTableSportsQuery = "CREATE TABLE IF NOT EXISTS sports (name TEXT)"
const createTableAthletesQuery = "CREATE TABLE IF NOT EXISTS athletes (name TEXT, sport_id INTEGER, position TEXT, number INTEGER, city TEXT)"
const createTableCitiesQuery = "CREATE TABLE IF NOT EXISTS cities (name TEXT)"
const createTableCitiesAthletesQuery = "CREATE TABLE IF NOT EXISTS cities_athletes (city_id INTEGER, athlete_id INTEGER)"

database.run(createTableSportsQuery, error => {
    if(error) {
        console.log('Create sports table failed')
    } else {
        console.log('Create sports table success!')
    }
})

database.run(createTableAthletesQuery, error => {
    if(error) {
        console.log('Create athletes table failed!')
    } else {
        console.log('Create athletes table succeeded')
    }
})

database.run(createTableCitiesQuery, error => {
    if(error) {
        console.log('Create cities table failed')
    } else {
        console.log('Create cities table succeeded')
    }
})

database.run(createTableCitiesAthletesQuery, error => {
    if(error) {
        console.log('Create cities_athletes table failed!')
    } else {
        console.log('Create cities_athletes table succeeded')    
    }
})

module.exports = database;