---
track: "React Fundamentals"
title: "MERN Stack Build Part 1"
week: 3
day: 1
type: "lecture"
---


# MERN Stack Build Part 1

In this build we will:

1. Build an Express API
1. Use Mongo/Mongoose with 1 model
1. Deploy the API with Heroku
1. Build a Full CRUD Frontend with React
1. Deploy with Netlify

<br>
<br>
<br>

## Setup for Express Build

1. Create a folder called `express-react`
1. Inside this folder create another folder called `backend`
1. Generate a React app called frontend `npx create-react-app frontend`

*Your folder structure should look like this...*

```shell
/express-react
 -> /backend
 -> /frontend
```

4. `cd` into the `backend` folder

<br>
<br>
<br>

## Setting up the Express app

1. Create a new node project `npm init -y`
1. Install dependencies `npm install dotenv mongoose express cors morgan`
1. Install dev dependencies `npm install --save-dev nodemon`
1. Setup `npm` scripts

```json
"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
}
```

*Make files `touch .env .gitignore server.js`*

5. Put the following `.gitignore`

```shell
/node_modules
.env
```

<br>
<br>
<br>


6. Put the following in `.env` (make sure to use YOUR mongodb.com uri)

```shell
MONGODB_URL=mongodb+src://...
PORT=4000
```

<br>
<br>
<br>

## Starting Server.js

Let's build out the minimum to get `server.js` running:

```js
///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
const { PORT = 3000 } = process.env;
// import express
const express = require("express");
// create application object
const app = express();

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
    res.send("hello world");
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
```
<br>
<br>
<br>

Run the server `npm run dev` and make sure you see `"Hello World"` when you go to `localhost:4000`.

<br>
<br>
<br>


## Adding a Database Connection

Let's update our `server.js` to include a database connection:

```js
///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
// pull MONGODB_URL from .env
const { PORT = 3000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
// Connection Events
mongoose.connection
    .on("open", () => console.log("Your are connected to mongoose"))
    .on("close", () => console.log("Your are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
    res.send("hello world");
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
```

<br>
<br>
<br>


*Make sure you see the Mongoose Connection message when the server restarts*

<br>
<br>
<br>

## Adding the People Model

1. Let's add a People model to `server.js` along with an index and create route to see and create our people. 

2. Make sure to add `cors` and` express.json` middleware!

```js
///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
// pull MONGODB_URL from .env
const { PORT = 3000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
// Connection Events
mongoose.connection
    .on("open", () => console.log("Your are connected to mongoose"))
    .on("close", () => console.log("Your are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////
const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
});

const People = mongoose.model("People", PeopleSchema);

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
    res.send("hello world");
});

// PEOPLE INDEX ROUTE
app.get("/people", async (req, res) => {
    try {
        // send all people
        res.json(await People.find({}));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// PEOPLE CREATE ROUTE
app.post("/people", async (req, res) => {
    try {
        // send all people
        res.json(await People.create(req.body));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
```

<br>
<br>
<br>


3. Create 3 people using postman to make post requests to `/people`

4. Test the index route with a get request to `/people`

<br>
<br>
<br>

## Update and Delete

Let's add an Update and Delete API Route to `server.js`:

```js
///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
// pull MONGODB_URL from .env
const { PORT = 3000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// Connection Events
mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////
const PeopleSchema = new mongoose.Schema({
  name: String,
  image: String,
  title: String,
});

const People = mongoose.model("People", PeopleSchema);

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("hello world");
});

// PEOPLE INDEX ROUTE
app.get("/people", async (req, res) => {
  try {
    // send all people
    res.json(await People.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE CREATE ROUTE
app.post("/people", async (req, res) => {
  try {
    // send all people
    res.json(await People.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE CREATE ROUTE
app.put("/people/:id", async (req, res) => {
  try {
    // send all people
    res.json(
      await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// PEOPLE CREATE ROUTE
app.delete("/people/:id", async (req, res) => {
  try {
    // send all people
    res.json(await People.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
```

<br>
<br>
<br>


## Deploy

1. Create a git repo in the `backend` folder `git init`

1. Add all files to staging `git add .`

1. Commit `git commit -m "message"`

1. Create a new repo on github.com (make sure its empty and public)

1. Add the remote to your local repo `git remote add origin URL` replace `URL` with your repos url

1. Push up your code `git push origin branchName` replace branch name with your active branch, find that with `git branch`

1. Go to heroku and create a new project

1. Under deploy connect your repo, enable auto deploys, and trigger a manual deploy

1. Under settings set your `MONGO_URL` config var

1. In postman test all your API endpoints

<br>
<br>
<br>


## Lab Part 1 - Cheese App

1. Create another folder called "Cheese App"

1. Create a backend and frontend folder like you did for today's lesson

1. Create a cheese API with index, create, update and delete routes

1. The model should look like:

```shell
name: String,
countryOfOrigin: String,
image: String
```

5. Test the API, deploy the API, test the deployed API