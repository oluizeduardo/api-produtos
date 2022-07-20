# api-produtos
Node JS API developed as an exercise of the discipline Web Development with NodeJS - PUC Minas.

## Technology used
* [NodeJS](https://nodejs.org/en/)

## How to run
* Clone this repository on your local environment.
* Inside the project run the command `npm install` to install the dependencies.
* Run the comand `nodemon server.js`

# Endpoints

| METHOD  | END-POINT                                          | DESCRIPTION                       | FIELDS                                         |
| ------- |:--------------------------------------------------:| :--------------------------------:|:----------------------------------------------:|
| GET     | https://localhost:3000/products                    |  List all the products.           |                   |
| GET     | https://localhost:3000/products/{id}               |  Brings a product based on its id.|                   |
| POST    | https://localhost:3000/products                    |  Add a new product.               | id, description, value, brand                  |
| DELETE  | https://localhost:3000/products/{id}               |  Delete a product based on its id.|                  |
| PUT     | https://localhost:3000/products/{id}               |  Update a product based on its id.| id, description, value, brand                 |


