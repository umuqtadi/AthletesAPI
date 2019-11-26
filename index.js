//Require statments so I can use these things
const express = require('express');
const database = require('./database.js');
const app = express();

//Middleware
app.use(express.json());

const port = 8000;

app.get('/', (request, response)=> {
    response.send('Sports Sports Sports and Beer')
})

//Sports routes
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

///////////////////////////
///Athletes table routes///
//////////////////////////

app.get('/api/athletes', (req, res)=> {
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

app.post('/api/athletes', (req, res)=> {
    const addAthleteQuery = 'INSERT INTO athletes (name, sport_id, position, number, city) VALUES (?,?,?,?,?)'

    database.run(addAthleteQuery, [req.body.name, req.body.sport_id, req.body.position, req.body.number, req.body.city], (err)=> {
        if(err) {
            console.log('Add athlete failed')
            response.sendStatus(500)
        } else {
            console.log('Add athlete successful')
            response.sendStatus(200)
        }
    })
})

app.put('/api/athletes/:id', (req, res)=> {
    const athleteId = req.params.id
    const updateAthleteQuery = `UPDATE athletes SET NAME = ?, SPORT_ID = ?, POSITION = ?, NUMBER = ?, CITY = ? WHERE athletes.oid = ${athleteId}`

    database.run(updateAthleteQuery, [req.body.name, req.body.sport_id, req.body.position, req.body.number, req.body.city], err => {
        if(err) {
            console.log('Update athlete failed!')
            response.sendStatus(500)
        } else {
            console.log('Update athlete successful')
            response.sendStatus(200)
        }
    })
})

app.delete('/api/athletes/:id', (req, res)=> {
    const athleteId = req.params.id
    const deleteAthleteQuery =`DELETE FROM athletes WHERE athletes.oid = ?`

    database.run(deleteAthleteQuery, [athleteId], err => {
        if(err) {
            console.log('Delete athlete failed')
            response.sendStatus(500)
        } else {
            console.log('Delete athlete successful')
            response.sendStatus(200)
        }
    })
})

/////////////////////
/////City Table/////
////////////////////

app.get('/api/cities', (req, res)=> {
    const getAllCitiesQuery = 'SELECT * FROM cities'

    database.all(getAllCitiesQuery, (err, results) => {
        if(err) {
            console.log('Get city failed')
            res.sendStatus(500)
        } else {
            console.log('Get cities successful')
            respo.sendStatus(200).json(results)
        }
    })
})

app.get('/api/cities/id', (req, res)=> {
    const cityId = req.params.id
    let getOneCityQuery = 'SELECT * FROM cities WHERE cities.oid = ?'

    database.all(getOneCityQuery, [cityId], (err, results)=> {
        if(err) {
            console.log('Get one city failed')
            res.sendStatus(500)
        } else {
            console.log('Get one city successful')
            res.sendStatus(200)
        }
    })
})



//Listening on
app.listen(port, ()=> {
    console.log(`Listening on port ${port}`)
})

