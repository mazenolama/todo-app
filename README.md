# To-Do App
To-Do using Restful APIs that allows API consumers to interact with the application, behind the scene it uses Nodejs, Express and MongoDB.

## Dependecies
[NodeJs](https://nodejs.org/en/) - A JavaScript runtime environment\
[Express](https://expressjs.com/) - An Express framework\
[MongoDB](https://www.mongodb.com/) - A NoSQL database

## Setup and run
to setup this project, run the following commands on your terminal
```bash
1. to clone the project `git clone https://github.com/mazenolama/todo-app-unifi.git`
2. navigate to the project directory `cd todo-app-unifi`
3. install neccesary packages, modules `npm install`
4. to run the project `npm start`
5. using POSTMAN you can use this default url of `http://localhost:5000`
```
I recommend that you use [POSTMAN](https://www.postman.com/) for testing this todo-app-unifi api or you can hook it up to your front-end application like [Angular](https://angular.io/).

I have utilized the ID of the authenticated user by extracting from requested x-auth-token header to execute CRUD (Create, Read, Update, Delete) operations on thier To-Do tasks. 
This guarantees precise management and tracking of the tasks within the user's authenticated account.

## Author
[Mazen Olama]
