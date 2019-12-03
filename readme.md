

# Athletes API Documentation

This API has information about Athletes including their names, number, position, what sport they play and in which cities they have played in.

### HTTP Verbs

The Athletes API uses HTTP verbs appropriate to each action.

Verb                   	***Description***

**GET**                 *Retrieving resources.*

**POST**                *Creating resources.*

**PUT**                 *Updating resources.*

**DELETE**             	*Deleting resources.*



## SPORTS TABLE

**/api/sports**

Get request will get you all the sports in the sports table

Post request will add a sport to the sports table


**/api/sports/:id**

Get request will get you one specific sport based on the ID that you choose.

Put request will update a sport at the specific ID that you choose.

Delete request will delete sport from the ID that you choose.

## ATHLETES TABLE

**/api/athletes**

Get request will get you all the athletes in the athletes table.

Post request will add a new athlete to the athletes table.


**/api/athletes/:id**

Get request will get you on specific athlete that matches that ID.

Put request will update the athlete based on the information you provide at that specific ID.

Delete request will delete all info about an athlete at that specific ID.

## CITY TABLE

**/api/cities**

Get request will get you all the cities that are on the table

Post request will add a new city to the cities table


**/api/cities/:id**

Get request will get you one specific city at that ID.

Put request will update city based on the name you provide at that specific ID.

Delete request will delete the city at that specific ID.

## CITIES_ATHLETES TABLE

This is the table with the many to many relationship between cities and athletes. A city can have multiple athletes and an athlete can have played in many cities.

In this table the city_id is supposed to represent the cities.oid and the athlete_id is equal to the athletes.oid.

**/api/cities/:id/athletes**

Get request will get you all the athletes that have played in the specific city that you provided with the ID.

Post request will allow you to create the join relationship between the city_id and the athlete_id.

Delete request will delete the join at the specific ID you provide.

**/api/athletes/:id/cities**

Get request will get you all the cities that an athlete has played in.


## Technologies Used

**Express, SQL, Node, Javascript**

## G-UNIT Productions
