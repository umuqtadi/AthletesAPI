//Require statments so I can use these things
const express = require('express');
const database = require('./database.js');
const app = express();

//Middleware
app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.use(express.json());

const port = 8000;

app.get('/', (request, response)=> {
    response.send('Sports Sports Sports and Beer')
})

///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////SPORTS TABLE ROUTES/////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////


app.get('/api/sports', (request, response)=> {
    const getAllSportsQuery = 'SELECT * FROM sports'

    database.all(getAllSportsQuery, (error, results)=> {
        if(error) {
            console.log('Could not get all sports')
            response.sendStatus(500)
        } else {
            console.log('Get all sports successful')
            response.status(200).json(results);
        }
    })
})

app.get('/api/sports/:id', (request, response)=> {
    const sportId = request.params.id;
    const getOneSportQuery = 'SELECT * FROM sports WHERE sports.oid = ?'

    database.all(getOneSportQuery, [sportId], (error, results)=> {
        if(error){
            console.log('Could not get sport')
            response.sendStatus(500)
        } else {
            console.log('Get sport successful')
            response.status(200).json(results)
        }
    })
})

app.post('/api/sports', (request, response)=> {
    const addSportQuery = `INSERT INTO sports (name) VALUES(?)`

    database.run(addSportQuery, [request.body.name], (error)=> {
        if(error){
            console.log('Could not add sport')
            response.sendStatus(500)
        } else {
            console.log('Add sport successful')
            response.sendStatus(200)
        }
    })
})

app.delete('/api/sports/:id', (req, res)=> {
    const sportId = req.params.id;
    const deleteSportQuery = `DELETE FROM sports WHERE sports.oid = ?`

    database.run(deleteSportQuery, [sportId], (error)=> {
        if(error) {
            console.log('Could not delete sport')
            res.sendStatus(500)
        } else {
            console.log('Deleted sport successfully')
            res.sendStatus(200)
        }
    })
})

app.put('/api/sports/:id', (req, res)=> {
    const sportId = req.params.id
    const updateSportsQuery = `UPDATE sports SET NAME = ? WHERE sports.oid = ${sportId}`

    database.run(updateSportsQuery, [req.body.name], error => {
        if(error) {
            console.log('Update of sports failed')
            res.sendStatus(500)
        } else {
            console.log('Sport was upated successfully')
            res.sendStatus(200)
        }
    })
})

//////////////////////////////
///Athletes table routes/////
/////////////////////////////

app.get('/api/athletes', (req, res)=> {
    const getAllAthletesQuery = `SELECT *, athletes.oid FROM athletes`

    database.all(getAllAthletesQuery, (error, results)=> {
        if(error) {
            console.log('Get all athletes failed')
            res.sendStatus(500)
        } else {
            console.log('Get all athletes success')
            res.status(200).json(results)
        }
    })
})

app.get('/api/athletes/:id', (req, res)=> {
    const athletesId = req.params.id
    const getOneAthleteQuery = `SELECT * FROM athletes WHERE athletes.oid = ?`

    database.all(getOneAthleteQuery, [athletesId], (err, results)=> {
        if(err) {
            console.log('Could not get athlete')
            res.sendStatus(500)
        } else {
            console.log('Get athlete succeeded')
            res.status(200).json(results)
        }
    })
})

app.get('/api/athletes/:id/sports', (req, res)=> {
    const athleteId = req.params.id
    const getAthleteSportQuery = 
    `SELECT athletes.name, sports.name AS "sport" FROM athletes
    JOIN sports ON sports.oid = athletes.sport_id
    WHERE athletes.oid = ?`

    database.all(getAthleteSportQuery, [athleteId], (err, results)=> {
        if(err) {
            console.log('Could not get sport of athlete')
            res.sendStatus(500)
        } else {
            console.log('Get sport played by athlete success')
            res.status(200).json(results)
        }
    })
})

app.post('/api/athletes', (req, res)=> {
    const addAthleteQuery = 'INSERT INTO athletes (name, sport_id, position, number) VALUES (?,?,?,?)'

    console.log(req.body);

    database.run(addAthleteQuery, [req.body.name, req.body.sport_id, req.body.position, req.body.number], (err)=> {
        if(err) {
            console.log('Add athlete failed')
            res.sendStatus(500)
        } else {
            console.log('Add athlete successful')
            const getAllAthletesQuery = `SELECT * FROM athletes`

            database.all(getAllAthletesQuery, (error, results)=> {
                if(error) {
                    console.log('Get all athletes failed')
                    res.sendStatus(500)
                } else {
                    console.log('Get all athletes success')
                    res.status(200).json(results)
                }
            })
        }
    })
})

app.put('/api/athletes/:id', (req, res)=> {
    const athleteId = req.params.id
    console.log(athleteId)
    const updateAthleteQuery = `UPDATE athletes SET name = ?, sport_id = ?, position = ?, number = ? WHERE athletes.oid = ${athleteId}`
    console.log(req.body)
    database.run(updateAthleteQuery, [req.body.name, req.body.sport_id, req.body.position, req.body.number], (err) => {
        // console.log('the body'+req.body)
        // console.log(this)
        // console.log(err)
        if(err) {
            console.log('Update athlete failed!', err)
            res.sendStatus(500)
        } else {
            console.log('Update athlete successful')
            const getAllAthletesQuery = `SELECT * FROM athletes`

            database.all(getAllAthletesQuery, (error, results)=> {
                if(error) {
                    console.log('Get all athletes failed')
                    res.sendStatus(500)
                } else {
                    console.log('Get all athletes success')
                    res.status(200).json(results)
                }
            })
        }
    })
})

app.delete('/api/athletes/:id', (req, res)=> {
    const athleteId = req.params.id
    const deleteAthleteQuery =`DELETE FROM athletes WHERE athletes.oid = ?`

    database.run(deleteAthleteQuery, [athleteId], err => {
        if(err) {
            console.log('Delete athlete failed')
            res.sendStatus(500)
        } else {
            console.log('Delete athlete successful')
            res.sendStatus(200)
        }
    })
})

/////////////////////
/////Cities Table/////
////////////////////

app.get('/api/cities', (req, res)=> {
    const getAllCitiesQuery = 'SELECT * FROM cities'

    database.all(getAllCitiesQuery, (err, results) => {
        if(err) {
            console.log('Get city failed')
            res.sendStatus(500)
        } else {
            console.log('Get cities successful')
            res.status(200).json(results)
        }
    })
})

app.get('/api/cities/:id', (req, res)=> {
    const cityId = req.params.id
    let getOneCityQuery = 'SELECT * FROM cities WHERE cities.oid = ?'

    database.all(getOneCityQuery, [cityId], (err, results)=> {
        if(err) {
            console.log('Get one city failed')
            res.sendStatus(500)
        } else {
            console.log('Get one city successful')
            res.status(200).json(results)
        }
    })
})

app.post('/api/cities', (req, res)=> {
    const addOneCityQuery = 'INSERT INTO cities (name) VALUES (?)'

    database.run(addOneCityQuery, [req.body.name], (err)=> {
        if(err) {
            console.log('Adding city failed')
            res.sendStatus(500)
        } else {
            console.log('Add city successful')
            res.sendStatus(200)
        }
    })
})

app.put('/api/cities/:id', (req, res)=> {
    const cityId = req.params.id
    const updateCityQuery = `UPDATE cities SET NAME = ? WHERE cities.oid = ${cityId}`

    database.run(updateCityQuery, [req.body.name], (err)=> {
        if(err) {
            console.log('Update city failed')
            res.sendStatus(500)
        } else {
            console.log('Update city successful')
            res.sendStatus(200)
        }
    })
})

app.delete('/api/cities/:id', (req, res)=> {
    const cityId = req.params.id
    const deleteCityQuery = `DELETE FROM cities WHERE cities.oid = ?`

    database.run(deleteCityQuery, [cityId], err => {
        if(err) {
            console.log('Delete city failed')
            res.sendStatus(500)
        } else {
            console.log('Deleted city successfully')
            res.sendStatus(200)
        }
    })
})

///////////////////////////////////////////////////////////////////////////
//////////////////////////////Cities_Athletes//////////////////////////////
///////////////////////////////////////////////////////////////////////////

app.get('/api/cities/:id/athletes', (req, res)=> {
    const cityId = req.params.id
    const joinCityAthletesQuery = 
    `SELECT cities.name AS "city", athletes.name, athletes.number FROM cities
    JOIN cities_athletes ON cities.oid = cities_athletes.city_id 
    JOIN athletes ON athletes.oid = cities_athletes.athlete_id 
    WHERE cities_athletes.city_id = (?)`

    database.all(joinCityAthletesQuery, [cityId], (err, results)=> {
        if(err) {
            console.log(`Getting athletes of cities failed`)
            res.sendStatus(500)
        } else {
            console.log('Getting athletes from city successful')
            res.status(200).json(results)
        }
    })
})

app.get('/api/athletes/:id/cities', (req, res)=> {
    const athleteId = req.params.id
    const joinAthleteCityQuery = `SELECT athletes.name AS "athlete", athletes.number, cities.name FROM athletes
    JOIN cities_athletes ON athletes.oid = cities_athletes.athlete_id
    JOIN cities ON cities.oid = cities_athletes.city_id
    WHERE cities_athletes.athlete_id = ?`

    database.all(joinAthleteCityQuery, [athleteId], (err, results)=> {
        if(err) {
            console.log('Getting cities of athletes failed')
            res.sendStatus(500)
        } else {
            console.log('Getting join succesful')
            res.status(200).json(results)
        }
    })
})

app.post('/api/cities/:id/athletes', (req, res)=> {
    const insertParams = [req.params.id, req.body.athlete_id]
    const insertCityAthleteQuery = `INSERT INTO cities_athletes VALUES (?,?)`

    database.run(insertCityAthleteQuery, insertParams, err => {
        if(err) {
            console.log('Adding join failed')
            res.sendStatus(500)
        } else {
            console.log('Adding to join table success!')
            res.sendStatus(200)
        }
    })
})

app.put('/api/cities/:id/athletes', (req, res)=> {
    const cities_athletesId = req.params.id
    const updateCityAthleteQuery = `UPDATE cities_athletes SET city_id = ?, athlete_id = ? WHERE cities_athletes.oid = ${cities_athletesId}`

    database.run(updateCityAthleteQuery, [req.body.city_id, req.body.athlete_id], (err)=> {
        if(err) {
            console.log('Update join table failed')
            res.sendStatus(500)
        } else {
            console.log('Update join successful')
            res.sendStatus(200)
        }
    })
})

app.delete('/api/cities/:id/athletes', (req, res)=> {
    const cities_athletesId = req.params.id
    const deleteJoinQuery = `DELETE FROM cities_athletes WHERE cities_athletes.oid = ?`

    database.run(deleteJoinQuery, [cities_athletesId], (err) => {
        if(err) {
            console.log(`Delete join entry failed`)
            res.sendStatus(500)
        } else {
            console.log('Delete join successful')
            res.sendStatus(200)
        }
    })
})

//Listening on
app.listen(port, ()=> {
    console.log(`Listening on port ${port}`)
})

