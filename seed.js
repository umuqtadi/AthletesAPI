const db = require('./database.js');

let sports = [
    {name: "Football"},
    {name: "Basketball"},
    {name: "Soccer"},
    {name: "Baseball"},
    {name: "Hockey"}
]

let cities = [
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

let athletes = [
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
        position: "Winger",
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

let cities_athletes = [
    {city_id: 1, athlete_id: 4},
    {city_id: 3, athlete_id: 1},
    {city_id: 3, athlete_id: 8},
    {city_id: 4, athlete_id: 1},
    {city_id: 4, athlete_id: 8},
    {city_id: 5, athlete_id: 2},
    {city_id: 5, athlete_id: 1},
    {city_id: 5, athlete_id: 6},
    {city_id: 6, athlete_id: 3},
    {city_id: 7, athlete_id: 7},
    {city_id: 8, athlete_id: 6},
    {city_id: 8, athlete_id: 7}
]

db.serialize(()=> {

    // Drop the 'athlete' table
    const dropAthletesTableQuery = 'DROP TABLE IF EXISTS athletes';
    db.run(dropAthletesTableQuery, error=> { 
      if(error) console.error("Error dropping 'athletes' table");
      else console.log("Dropped 'athletes' table");
    })
  
    // (Re)create the 'athlete' table
    const createAthletesTableQuery = 'CREATE TABLE athletes (name TEXT, sport_id INTEGER, position TEXT, number INTEGER)';
    db.run(createAthletesTableQuery, error=> {
      if(error) console.error("Error creating 'athletes' table");
      else console.log("Created 'athletes' table");
    })
  
    // Insert each athlete
    const insertAthletesQuery = 'INSERT INTO athletes VALUES (?, ?, ?, ?)';
    for(let athlete of athletes) {
      let athleteData = [athlete.name, athlete.sport_id, athlete.position, athlete.number];
      db.run(insertAthletesQuery, athleteData, error=> {
        if(error) console.log("Could not insert athlete", athlete, error);
        else console.log(`Inserted ${athlete.title} into 'athlete'`);
      })
    }





    // Drop the 'sports' table
    const dropSportsTableQuery = 'DROP TABLE IF EXISTS sports';
    db.run(dropSportsTableQuery, error=> { 
      if(error) console.error("Error dropping 'sports' table");
      else console.log("Dropped 'sports' table");
    })
  
    // (Re)create the 'sports' table
    const createSportsTableQuery = 'CREATE TABLE sports (name TEXT)';
    db.run(createSportsTableQuery, error=> {
      if(error) console.error("Error creating 'sports' table");
      else console.log("Created 'sports' table");
    })
  
    // Insert each sport
    const insertSportsQuery = 'INSERT INTO sports VALUES (?)';
    for(let sport of sports) {
      let sportData = [sport.name];
      db.run(insertSportsQuery, sportData, error=> {
        if(error) console.log("Could not insert sport", sport, error);
        else console.log(`Inserted ${sport.name} into 'sport'`);
      })
    }




    // Drop the 'cities' table
    const dropCitiesTableQuery = 'DROP TABLE IF EXISTS cities';
    db.run(dropCitiesTableQuery, error=> { 
      if(error) console.error("Error dropping 'cities' table");
      else console.log("Dropped 'cities' table");
    })
  
    // (Re)create the 'cities' table
    const createCitiesTableQuery = 'CREATE TABLE cities (name TEXT)';
    db.run(createCitiesTableQuery, error=> {
      if(error) console.error("Error creating 'cities' table");
      else console.log("Created 'cities' table");
    })
  
    // Insert cities
    const insertCitiesQuery = 'INSERT INTO cities VALUES (?)';
    for(let city of cities) {
      let cityData = [city.name];
      db.run(insertCitiesQuery, cityData, error=> {
        if(error) console.log("Could not insert city", city, error);
        else console.log(`Inserted ${city.name} into 'cities'`);
      })
    }




    // Drop the 'cities_athletes' table
    const dropCitiesAthletesTableQuery = 'DROP TABLE IF EXISTS cities_athletes';
    db.run(dropCitiesAthletesTableQuery, error=> { 
      if(error) console.error("Error dropping 'cities_athletes' table");
      else console.log("Dropped 'cities_athletes' table");
    })
  
    // (Re)create the 'cities_athletes' table
    const createCitiesAthletesTableQuery = 'CREATE TABLE cities_athletes (city_id INTEGER, athlete_id INTEGER)';
    db.run(createCitiesAthletesTableQuery, error=> {
      if(error) console.error("Error creating 'cities_athletes' table");
      else console.log("Created 'cities_athletes' table");
    })
  
    // Insert cities_athletes
    const insertCitiesAthletesQuery = 'INSERT INTO cities_athletes VALUES (?, ?)';
    for(let cityAth of cities_athletes) {
      let cityAthData = [cityAth.city_id, cityAth.athlete_id];
      db.run(insertCitiesAthletesQuery, cityAthData, error=> {
        if(error) console.log("Could not insert city", cityAth, error);
        else console.log(`Inserted into 'cities_athletes'`);
      })
    }
  })

