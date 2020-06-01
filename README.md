# Documentation

## Reason
The main reason for this project was to learn **Node.js**

## Technologies I used
* Node.js
* MongoDB
* Cluster

## Learning process
All the project was based and followed in this playlist, by Academind YouTube chanell
[Creating a REST API with Node.js](https://www.youtube.com/watch?v=0oXYLzuucwE&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q)

## How to run

1. Clone the repository
2. Create a MongoDB Cluster (topic below)
3. Open the file **nodemon.json**
  - Change **database_password** to your MongoDB database password.
  - Change **token_password** to any word you want. This is just a salt to encrypt the password
4. Run this command to start the application
```bash
$ npm start
```

_TODO, verify if it works_


## Create a cluster on MongoDB
_TODO_

## Using Postman
_TODO, show the APIs_


### Commands I have used

```bash
$ npm init
```
```bash
$ npm install --save express  
```
```bash
$ node server.js  # run server
```
```bash
$ npm install --save-dev nodemon  # automatic restart server when change the code
```
```bash
$ npm start  # nodemon server.js
```

```bash
$ npm install --save morgan  # show the REST in terminal (ex: GET /orders/123 200)
```

```bash
$ npm install --save body-parser
```

```bash
$ npm install --save mongoose  # mongodb manager
```

```bash
$ npm install --save multer  
```

```bash
$ npm install bcrypt --save  # library to encrypt password 
```


```bash
$ npm install jsonwebtoken --save  # library for user token in login 
```

### Versions
```bash
$ npm -v  # 3.5.2 
```
```bash
$ node -v  # v8.10.0
```


### License
[MIT](https://choosealicense.com/licenses/mit/)