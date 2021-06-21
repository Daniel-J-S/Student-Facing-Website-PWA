---
track: "React Fundamentals"
title: "Express and React Lab"
week: 2
day: 1
type: "lab"
---



# Express and React Lab

During this lab we will be creating a full stack portfolio page using Express and React to see how you can create a full stack project using a simple API build with Express and a frontend application with React.

- [Here is a repo with a final version for reference](https://git.generalassemb.ly/AlexMerced/Express-React-Portfolio-Reference-Code)

<br>
<br>

**NOTE** While the above repo has the backend and frontend folder in one repo, to deploy the backend and frontend project MUST be in separate repos, follow the direction carefully regarding where repos are created and deployment.

<br>
<br>


**ANOTHER NOTE** This is **not your actual portfolio**, so don't worry about making it perfect. 

Use this as an exercise to practice the skills we've learned in class so far.

<br>
<br>
<br>

## Setup

1. Create an empty folder to house this project `express_react_lab` (this folder should NOT be a GIT repo)

1. Inside this folder create a folder for our backend app called `backend` this will house our express application

1. Then we will generate a react project for a our frontend, either of these two commands should do the trick (the command should be run from the express_react_folder so make sure your terminal is in that folder)...

    - `npx create-react-app frontend`
    - `npm init @vitejs/app frontend --template react`

1. The end result should be the following folder structure

```shell
- /express_react_lab
  > /backend
  > /frontend
```
<br>
<br>
<br>


## Express app setup

1. Open up your terminal inside the backend folder

1. Create a new npm project with the command `npm init -y`

1. Install the following:
    - `npm install express cors`
    - `npm install --save-dev nodemon`

<br>
<br>
<br>

#### What we installed

1. **`express`:** The backend web framework for generating a web server

2. **`cors`:** middleware to make sure we don't get cors errors when our react app makes a request to our express app

3. **`nodemon`:** development tool to auto restart our server whenever


<br>


Update the `package.json` with the following scripts:

```json
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
```

<br>
<br>
<br>


#### Our Data

Instead of using a database we will use JSON files to store the data for our project for now.

Run the following command in the `backend` folder to create our files:

`touch server.js projects.json about.json`

<br>
<br>
<br>


#### `projects.json`

In this file you should use the below example but replace it with your projects from the previous units. (json files don't need to be exported, node knows how to read them).

Essentially this file is an array of objects that represent your projects:

```json
[
  {
    "name": "project1",
    "live": "https://app.herokuapp.com/whatever",
    "git": "http://www.github.com/username/reponame",
    "image": "http://www.imgur.com/pictureofproject.png"
  },
  {
    "name": "project2",
    "live": "https://app.netlify.app/whatever",
    "git": "http://www.github.com/username/reponame",
    "image": "http://www.imgur.com/pictureofproject.png"
  }
]
```

<br>
<br>
<br>


#### `about.json`

This file will be one big option with information about you to use in your portfolio:

```json
{
  "name": "Bob Smith",
  "email": "Bob@BobSmith.dev",
  "headshot": "http://www.imgur.com/pictureofproject.png",
  "bio": "Bob Smith graduated from General Assembly in 2017. Afterwords, he went to work for XYZ Technologies where he maintained a full stack application using Meteor and Ember. He also recently started started learning Prolog, cause why not waste time."
}
```

<br>
<br>
<br>


#### `server.js`

Now we can make our server, here is the overview of what we will do:

1. Import our dependencies and json files
1. Create our app object
1. Add our cors middleware
1. Create a home route to test our app
1. Create a `/projects` route to retrieve our projects
1. Create a `/about` route to retrieve our about info
1. Setup our server listener

```js
// Import Dependencies
const express = require("express");
const cors = require("cors");

// Import JSON files
const projects = require("./projects.json");
const about = require("./about.json");

// Create our app object
const app = express();

// set up middleware
app.use(cors());

//home route for testing our app
app.get("/", (req, res) => {
    res.send("Hello World");
});

// route for retrieving projects
app.get("/projects", (req, res) => {
    // send projects via JSON
    res.json(projects);
});

// route for retrieving about info
app.get("/about", (req, res) => {
    // send projects via JSON
    res.json(about);
});

//declare a variable for our port number
const PORT = process.env.PORT || 4000;

// turn on the server listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
```
<br>
<br>


1. Run your server `npm run dev`

1. go to `localhost:4000` and make sure you see "hello world"

1. go to `localhost:4000/projects` and make sure you see your projects as JSON

1. go to `localhost:4000/about` and make sure you see your about info as json

1. Our Backend is complete, now to deploy.

<br>
<br>
<br>


## Express app deployment

#### Creating the Procfile

Create a file called `Procfile`:

```shell
web: npm start
```

<br>
<br>
<br>


#### Creating the git repo

1. Make sure your terminal is inside the "backend" folder

1. Create a new git repo `git init`

1. Add all files to staging `git add .`

1. Commit the files `git commit -m "backend is done"`

1. Create a new EMPTY repo on github.com and get the remote url

1. Connect the remote to your local repo `git remote add origin URL`, make sure to replace "URL" with the URL of your github.com repo

1. Push up your changes `git push origin BRANCH` make sure to replace "BRANCH" with your current branch name which can be retrieved by running `git branch`

<br>
<br>
<br>

#### Deploying to Heroku

1. Head over to heroku and create a new project

1. Under the deploy section, connect your github repo

1. Enable automatic deploys

1. Then under manual deploys hit the "deploy" button

1. When its done, click the "open app" button in the upper right of the dashboard

1. Go to `HEROKU_URL/` make sure you see "Hello World"

1. Go to `HEROKU_URL/projects` make sure you see your projects as JSON

1. Go to `HEROKU_URL/about` make sure you see your about info as JSON


<br>

Congrats, your simple backend API is complete and deployed! You may shut down any local backend servers you have running.

If you have any issues with Heroku refer to [this guide](https://tuts.alexmercedcoder.com/2021/4/deploying_node_heroku/)

<br>
<br>
<br>


## Building the Frontend

Make sure to keep your Heroku url handy, we'll need it in a moment.

1. Open your terminal to the `frontend` folder

1. Install react router `npm install react-router react-router-dom`

<br>
<br>
<br>


## Setting up React Router

Open up `src/index.js` and make the following changes:

```js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import router
import { BrowserRouter as Router } from "react-router-dom";

// wrap our application inside of router to enable using router
ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

<br>
<br>
<br>


## Getting things scoped out

1. Create a `src/components` folder and `src/pages` folder

1. In components create `Header.js` and `Footer.js`

`src/components/Header.js`

```jsx
function Header(props) {
  return <h1>Header</h1>;
}

export default Header;
```

<br>
<br>
<br>


`src/components/Footer.js`

```jsx
function Footer(props) {
  return <h1>Footer</h1>;
}

export default Footer;
```

<br>
<br>
<br>

In `src/pages` create `Home.js`, `About.js` and `Projects.js`:

`src/pages/Home.js`

```jsx
function Home(props) {
  return <h1>Home</h1>;
}

export default Home;
```

<br>
<br>
<br>


`src/pages/About.js`

```jsx
function About(props) {
  return <h1>About</h1>;
}

export default About;
```

<br>
<br>
<br>


`src/pages/Projects.js`

```jsx
function Projects(props) {
  return <h1>Projects</h1>;
}

export default Projects;
```

<br>
<br>
<br>


## App.js

Here is the plan:

1. Import all our components
1. Import the Route and Switch component from Router
1. Setup our routes
1. Create a variable called URL with our heroku url
1. Pass the URL as a prop to about and projects so they can make a call to our API

<br>
<br>
<br>


`src/App.js`

```jsx
import "./App.css";

// IMPORT COMPONENTS
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Switch } from "react-router-dom";
// IMPORT PAGES
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";

function App() {
  // URL should have YOUR HEROKU URL for your backend, make sure you include the trailing slash
  const URL = "http://localhost:4000/";

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/projects">
          <Projects URL={URL} />
        </Route>
        <Route path="/about">
          <About URL={URL} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
```

<br>
<br>
<br>


## The Navigation

Right now we can't switch between our routes with Link components, so let's build our navigation so we can switch between pages. Our navigation should be in our header.

`src/components/Header.js`

```jsx
import { Link } from "react-router-dom";

function Header(props) {
  //inline style for the nav tag
  const navStyle = {
    display: "flex",
    justifyContent: "space-around",
    border: "3px solid black",
    padding: "8px",
    width: "90%",
    margin: "auto",
  };

  return (
    <header>
      <h1>My Portfolio Page</h1>
      <nav style={navStyle}>
        <Link to="/">
          <div>HOME</div>
        </Link>
        <Link to="/about">
          <div>ABOUT</div>
        </Link>
        <Link to="/projects">
          <div>PROJECTS</div>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
```
<br>
<br>


You should be able to navigate between our pages but they are only one word at the moment. 

Let's populate our projects and about pages.

<br>
<br>
<br>

## About Page

We will do the following...

1. Create a state variable to hold the about data
1. Create a function to make the api call and update state
1. Call the function within a useEffect to avoid an infinite loop
1. Use a ternary to render one thing if we have the data from the api and something else if we don't

<br>
<br>
<br>


`src/pages/About.js`

```jsx
import { useState, useEffect } from "react";

function About(props) {
  // create state to hold about data
  const [about, setAbout] = useState(null);

  // create function to make api call
  const getAboutData = async () => {
    // make api call and get response
    const response = await fetch(props.URL + "about");
    // turn response into javascript object
    const data = await response.json();
    // set the about state to the data
    setAbout(data);
  };

  // make an initial call for the data inside a useEffect, so it only happens once on component load
  useEffect(() => getAboutData(), []);

  // define a function that will return the JSX needed once we get the data
  const loaded = () => (
    <div>
      <h2>{about.name}</h2>
      <h3>{about.email}</h3>
      <p>{about.bio}</p>
    </div>
  );

  // if data arrives return the result of loaded, if not, an h1 that says loading
  return about ? loaded() : <h1>Loading...</h1>;
}

export default About;
```
<br>
<br>
<br>


## Projects

We will use the same pattern for our projects:

1. Create a state variable to hold the projects data
1. Create a function to make the api call and update state
1. Call the function within a useEffect to avoid an infinite loop
1. Use a ternary to render one thing if we have the data from the api and something else if we don't
1. Our loaded function will map over the array of projects and return the jsx for project

<br>
<br>
<br>


`src/pages/Projects.js`

```jsx
import { useState, useEffect } from "react";

function Projects(props) {
  // create state to hold projects
  const [projects, setProjects] = useState(null);

  //create function to make api call
  const getProjectsData = async () => {
    //make api call and get response
    const response = await fetch(props.URL + "projects");
    // turn response into javascript object
    const data = await response.json();
    // set the projects state to the data
    setProjects(data);
  };

  // make an initial call for the data inside a useEffect, so it only happens once on component load
  useEffect(() => getProjectsData(), []);

  // define a function that will return the JSX needed once we get the data
  const loaded = () => {
    return projects.map((project) => (
      <div>
        <h1>{project.name}</h1>
        <img src={project.image} />
        <a href={project.git}>
          <button>Github</button>
        </a>
        <a href={project.live}>
          <button>live site</button>
        </a>
      </div>
    ));
  };

  return projects ? loaded() : <h1>Loading...</h1>;
}

export default Projects;
```

<br>
<br>
<br>


## Deploy Frontend

Once everything seems working, do the following:

Create a file called `netlify.toml` in the `frontend` folder with the following:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
```

<br>
<br>


1. There should already be a local repo based out of the frontend folder (create react app creates one by default). If not, make one.

1. Add all files to staging `git add .`

1. Commit `git commit -m "frontend complete"`

1. Create a new empty repository on github and get the url

1. Connect it to your local repository `git remote add origin URL` make sure to replace URL with your repo URL

1. Push up the code `git push origin BRANCH` make sure to replace BRANCH with your active branch, you can confirm what it is with the command `git branch`

1. Head over to netlify and create a new project based on your frontend repo, it should auto detect the build command and deploy.

1. If you run into any issues refer to this [guide for deployment](https://tuts.alexmercedcoder.com/2021/1/deployreact/)

1. You've deployed your portfolio!!!

<br>
<br>
<br>


## What Now?

1. Add some content to the home page
1. Spend some time styling your frontend
1. Add content to the footer

<br>
<br>
<br>


## Hungry For More

<br>
<br>
<br>


#### Styling Challenges (choose 1)

1. Style using the Styled Components Library `npm install styled-components`
1. Style using sass `npm install sass` (after install change the extension on your css files scss)
1. Try using `bulma-react-components` a [library of components pre-made using Bulma](https://www.npmjs.com/package/react-bulma-components)

<br>
<br>
<br>


#### Express Challenges

1. Try adding a form to your React project and a post route on your express app to go with it
1. Convert from JSON files to using a mongo database for your project (not really necessary for the about info)