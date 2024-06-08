# Ecomm Backend CRUD API

Welcome to the Ecomm Backend CRUD API !

This application allows you to manage and interact with a table of product through CRUD operations.
There are 2 ways  you can set up this application using Docker or using the local pc resources. Ill start with docker since its the most easy way and less painful to set up and the one that i suggest to use while trying to set up this app


## Docker Setup
Fist of all you need to make sure to have docker installed in your local machine
Follow these steps to run the app on Docker:

1. **Clone the Repository:**
   - Clone the repository to your local machine.

2. **Set Up .env variable:**
    In order for our app to work as expected we need to set up  our local env variable and to do so in the root directory of the project create a .env file and add the following keys
```
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=<your database name> //example ecomm
    DB_USER=<your username> //example postgres
    DB_PASSWORD=<your password> //example postgres
    PORT=5000
```
3. **Start the Application with Docker:**
   - At the root level of the repository, run the following command to build and start the application using Docker Compose:
     ```
     docker-compose up -d
     ```
   - Once the Docker containers finish building, you should be able to access the application at [http://localhost:5000/api/products](http://localhost:5000/api/products).

*NOTE* : By default  docker its seted up that at the first run it will execute a seed file and instert 4 products, this is not an optimal way and should not be used like this but this is only for testing purpose so that the user can have some initial data. Now  the way it is configured if you stop and run the container again it will delete  the table and recreate it again if you dont want this just remove "node ./dist/utilities/seed.js" in **start.sh** script and your table will be initally empty.

## Local Setup

To run this application locally , follow these steps:

1. **Clone the Repository:** 
   - Clone the repository to your local machine.

2. **Install Dependencies:** 
   - In the root directory of the repository, run the following command to install all the required packages and dependencies:
     ```
     npm install
     ```

3. **Create a database and set up env variabiables:**

   Personally I used DBeaver as a ui to create a db named enri_db and on the root level of the project  repo i have created a .env file with the following env variable 
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=enri_db
   DB_USER=my_user
   DB_PASSWORD=my_pass
   PORT=5000

4. **Start the Application:** 
   - Once you've set up your local environment file and created a local db , go back to the root level of the repository and start the application by running:
     ```
     npm run dev
     ```

   *NOTE* : If you want to insert some  dummy data run the following script but be aware that if you have already populated product table the data will be deleted and replaced with dummy ones :

      ```
      npx ts-node src/utilities/seed.ts
      ```


## API examples (use postman for better experience testing those endpoints)


### Create Products

**URL:** `http://localhost:5000/api/products`

**Method:** `POST`

**Body:**
```json
{
  "name": "test",
  "description": "This is a sample product description.",
  "price": 99.99,
  "stockQuantity": 50,
  "category": "Electronics"
}
```


### Get the list of products

**URL:** `http://localhost:5000/api/products`

**Method:** `GET`

### Get product details

**URL:** `http://localhost:5000/api/products/:id`

**Method:** `GET`

### Delete product by ID

**URL:** `http://localhost:5000/api/products/:id`

**Method:** `DELETE`


### Update product details

**URL:** `http://localhost:5000/api/products`

**Method:** `PUT`

**Body:**
```json
{
  "name": "test updated",
  "description": "This is a sample product description.",
  "price": 10.99,
  "stockQuantity": 50,
  "category": "Electronics"
}
```