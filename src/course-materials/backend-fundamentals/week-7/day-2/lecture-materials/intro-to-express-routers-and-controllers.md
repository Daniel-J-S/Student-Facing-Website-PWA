---
track: "Backend Fundamentals"
title: "Intro to Express Routers and Controllers"
week: 7
day: 2
type: "lecture"
---

# Express Routers & Controllers



### Learning Objectives


- Students Will Be Able To:
	- Get More Practice Building An Express App
	- Implement Best Practice Routing
	- Organize App Logic Into Controllers


### Roadmap


- Setup
- MVC Code Organization
- Best Practice Routing
- To-Do Refactor
- Controllers
- MVC Organization Revisited
- URL/Route Parameters
- Adding Show a To-Do Functionality

> The goal for this lesson is to rebuild the todos app we created for the last lesson.


#### Full Setup Walkthrough

For today's setup, we'll create a new express project name `express-todos` inside of our `practice` directory inside of our `w07` directory. 


So, your directory structure should look like this...

```bash
w07/
  practice/
    express-todos/
```

- Once you have your directories in place, we'll prepare it to be used with `node/npm` using the `npm init` command

- Choose the name `server.js` for your entry point, and then accept all the defaults

- Then create `server.js` inside of `express-todos`



```bash
w07/
  practice/
    express-todos/
      package.json
      server.js
```


- Now, let's install express...

```bash 
  npm i express
```

- let's set up our initial boilerplate code...

```js
// Require Modules
const express = require('express');

// Create the Express App
const app = express();


// Configure the App (app.set)

// We'll use the ejs view engine
app.set('view engine', 'ejs'); 

// Mount Middleware (app.use)


// Mount Routes
app.get('/', function(req, res) {
    res.render('index');
});


// Tell the App to Listent on Port 3000
app.listen(3000, function() {
    console.log('Express is listening on port 3000');
});

```

- We'll use the `ejs` view engine, so let's install it ...

```bash
  npm i ejs
```

> We'll also need to create the directory for our views, the default name for this directory is `views` and it should be located at the root of our project's directory.

- Create the views directory and create `index.ejs` inside of it for the "home" page

```bash
  mkdir views
  touch views/index.ejs
```

- Let's add this boilerplate to `index.ejs`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Express Todos</title>
</head>
<body>
    <h1>Welcome to Express Todos</h1>
</body>
</html>
```

- This is what our project's directory structure should look like

```bash
express-todos/
  node_modules
  views/
    index.ejs
  package.json
  package-lock.json
  server.js
```



#### Starting the Application

- One option to start the server is to type `node server.js`. This will execute the start script specified in *package.json*. However, it doesn't restart the app when there's changes...

- `nodemon` is still our best option and we can now just type `nodemon` which will use that same `start` script.

- We can run the server right now to ensure everything works...


```bash
$ nodemon
[nodemon] 2.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
Express is listening on port 3000
```

#### MVC Code Organization

- Model-View-Controller (MVC) has been a proven approach for successfully organizing code for decades.

- In fact, many web frameworks such as Ruby on Rails, ASP.net, Spring MVC (Java), and others implement the MVC architectural pattern.

- Express on the other hand, just like it states on its landing page, is _unopinionated_.  That means we are free to structure and organize our Express apps anyway we please.

- Here's what the [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes) docs have to say on the matter.

#### MVC Code Organization


- However, since MVC is a proven pattern that works, most Express developers use MVC to organize their Express applications - so we will too.

- At this point we've already organized our views into a `views` folder. 

- Let's make folders to hold our controllers and models...

	```shell
	$ mkdir controllers models
	```


#### Best Practice Routing


- For our first express app, we used the `app.get` method to define routes.

- Although it works, the better practice is to:
	- Use Express `router` objects to organize related routes, for example, routes dedicated to a data resource such as `todos`.
	- Create each `router` in its own module from which it is exported.
	- `require` the exported `router` inside of **server.js**.
	- Mount the `router` object in the request pipeline (`route` objects are also middleware functions).


- The `Router` objects can provide more flexible and powerful routing in complex apps.

- `Router` objects are actually mini-Express apps! They can even have their own middleware.

- Let's use best practice routing for our project

- First we need to seperate our router modules in their own seperate folder...

```bash
  mkdir routes
```

- Now, let's make the first router for our general routes, e.g., the root route or "home" page

> We normally name this file index.js

```bash
  touch routes/index.js
```

#### The Express <em>Router</em> Object

- Now that we've added our `routes` directory and `index.js` file inside of it, we'll need require `express`, set up our `router`, which get's referenced off the `express` module. 

- We'll also need to export our router's functionality so we can mount it to `server.js`.

```js
const express = require('express');
const router = express.Router();



module.exports = router;
```

- Now, we're going to remove this route handler from `server.js` and place it inside of `routes/index.js` with a slight refactoring.

```js
const express = require('express');
const router = express.Router();


router.get('/', function(req, res) {
    res.render('index');
});

module.exports = router;
```

- Notice how routes are defined on our `router` object is using a `get` method just like we did with `app.get()`?

- Next, we'll `require` our router module inside of `server.js`

```js
// Require Modules
const express = require('express');
const indexRouter = require('./routes/index');
// ^- We'll require it like this

// Create the Express App
const app = express();
```


- Lastly, we'll mount our router to the middleware pipeline with the `app.use` method.

```js
// Mount Middleware (app.use)
app.use('/', indexRouter);
```

- It's **important** to realize that the path in `app.use` is **combined** with the path specified on the router objects...


- Let's say you have a `router` object inside of `routes/todos.js` that defines a route like this:

	```js
	router.get('/', function(req, res) {...
	```
	
	and mounted like this:
	
	```js
	app.use('/todos', todoRouter);
	```
	**What is the actual path of the route?**


- Another example, let's say you have a `router` object that defines a route like this:

	```js
	router.get('/today', function(req, res) {...
	```
	
	and mounted like this:
	
	```js
	app.use('/calendar', calendarRouter);
	```
	**What is the actual path of that route?**


#### To-Do Redo

- Let's finish with the redo of our Todo app

- We'll copy over the **index.ejs** view and put the todos "database" into a file called `todo.js` inside the `models` folder

- Finally, after learning about how to organize code into _controllers_, well, that's what we'll do


#### To-Do Refactor - <span style="text-transform:lowercase">index.ejs</span>


- Create **todos/index.ejs**:

	```shell
	$ mkdir views/todos
	$ touch views/todos/index.ejs
	```

- Add the HTML boilerplate.

- Update the title to: `<title>Express To-Do</title>`


#### To-Do Refactor - <span style="text-transform:lowercase">index.ejs</span>


- Here's the EJS from our last lesson, but with a little extra formatting using a ternary statement to indicate when a todo item is `done`

	```html
	   <h1>Here Are Your Todos</h1>
	   <ul>
	     <% todos.forEach(function(t) { %>
	       <li>
	         <%= t.todo %>
	           - 
	         <%= t.done ? 'done' : 'not done' %>
	       </li>
	     <% }); %>
	   </ul>
	```


#### To-Do Refactor - Todo Model


- Now let's create and copy over our model.

- Create **models/todo.js**:

	```shell
	$ touch models/todo.js 
	```

- Note that modules for _models_ should be named singularly.


- Here's the code from our last lesson, just slightly refactored:

	```js
	const todos = [
	  {todo: 'Feed Dogs', done: true},
	  {todo: 'Learn Express', done: false},
	  {todo: 'Buy Milk', done: false}
	];
	
	module.exports = {
	  getAll
	};
	
	function getAll() {
	  return todos;
	}
	```


#### To-Do Refactor - Routing


- We'll need a router for our **todos** resource, let's go ahead and create it.

```bash
touch routes/todos.js
```

##### The set up for the todos router module will be a practice activity for you to try and create on your own (3 min).


- Next, we'll require the router module inside of `server.js` and then mount it to the request pipeline.

	Require it...
	```js
	const todosRouter = require('./routes/todos');
	```

	Then mount it...
	
	```js
	app.use('/todos', todosRouter);
	```


- The following is the **index** route code for the to-dos we used our last lesson.

- Copy it into **routes/todos.js** below the existing route and then we'll refactor it:

	```js
	
	app.get('/todos', function(req, res) {
	  res.render('todos/index', {
	    todos: todoDb.getAll()
	  });
	});
	```

- Now for the refactor...

	```js
	
	app.get('/', function(req, res) {
	  res.render('todos/index', {
	    todos: todoDb.getAll()
	  });
	});
	```

- **Why is it only a forward slash?**

- Notice how we're calling `todoDb.getAll()` - this will currently cause an error...

- We first need to require the Todo model as follows:

	```js
	const router = express.Router();
	// require the Todo model
	const Todo = require('../models/todo');
	```

- It's convention to name model variables singularly and with upper-camel-casing.


- With the model required, **what do we need to change on this line of code?**

	```js
	todos: todoDb.getAll()
	```

- Let's do it!

- There's another change that need to be made**does anybody see it?**

```bash
app.get('/todos', function(req, res) {
^

ReferenceError: app is not defined
```

- **Hint: What's that `app` object doing there?**


- With the refactor complete, browsing to `localhost:3000/todos` should render the to-dos just like our last lesson!

- Hey, let's add a link like this: `<a href="/todos">To-Do List</a>` on **views/index.ejs** so that we can click it to see the to-dos instead of navigating via the address bar...



- In **views/index.ejs**:


```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Express Todos</title>
  </head>
  <body>
    <h1>Welcome to Express Todos</h1>
    <a href="/todos">To-Do List</a>
  </body>
</html>
```

- On to **controllers**...

#### Controllers


- In a web application that follows the MVC architectural pattern, **controllers**:
	- Use Models to perform CRUD (create, retrieve, update & delete) data operations.
	- Implement any additional application logic, often relying on other services and utility modules; and
	- Pass data to Views to be rendered then return the resulting markup to the browser.

- Controllers are functions, but wait, we already wrote functions that perform those responsibilities in our route modules!

- Exactly!  Those functions _are_ controllers, we just need to separate our concerns, i.e., as a best practice, we need to separate the **route definitions** from their respective **controller functions**.


- Let's start by creating a controller module for the _todos_ resource:

	```shell
	$ touch controllers/todos.js
	```

- Let's copy **just the function part** of the following route definition:

	```js
	router.get('/', function(req, res) {
	  res.render('todos/index', {
	    todos: Todo.getAll()
	  });
	});
	```
	
- Paste that function inside of **controllers/todos.js** and give it the name of `index`...

- Let's export the `index` controller method (also know as a controller _action_)...

- The pasted and refactored code should look like:

	```js
	module.exports = {
	  index
	};
	
	function index(req, res) {
	  res.render('todos/index', {
	    todos: Todo.getAll()
	  });
	}
	```

- The above is a good approach to follow when it comes to exporting functionality.


- The router no longer needs the `Todo` model.

- But, the controller does! Let's go cut it from **routes/todos.js** and paste it at the top of **controllers/todos.js**:

	```js
	const Todo = require('../models/todo');
	```


- Back in **routes/todos.js**, we need to require the controller in order to have access to its actions (methods):

	```js
	const todosCtrl = require('../controllers/todos');
	```

- Now, the refactor:

	```js
	router.get('/', todosCtrl.index);
	```
	How clean is that?!?!

- Refresh and everything should be hunky-dory!


#### MVC Organization Revisited


- Notice how we now have the following for the **_todos_ resource**:
	- **models/todo.js**
	- **views/todos** (directory)
	- **controllers/todos.js**
	- **routes/todos.js**

- Each data _resource_ should receive the same treatment.

- Note that resource names are pluralized except for the model.


#### URL/Route Parameters


- In our web apps, we will often need to pass information, such as an identifier for a certain data resource, in the **path** of the HTTP request.

- **URL Parameters**, also known as **Route Parameters**, just like parameters in functions, provide a way for data to be passed in to the router & controller via the URL of the request.

- Let's look at this analogy...


<img src="https://i.imgur.com/X8Cj85b.png">



- In Express, we define route parameters in the path string using a colon, followed by the parameter name.

- Let's say we want to view a details page for a resource.

- Just like how we use an **index** route/action to list all of a resource, we will use a **show** route/action when displaying the details of a single resource.

- Let's add the functionality to view a single To Do...



#### Adding Show a To-Do Functionality


- When adding functionality to your apps, start by identifying what route makes sense - this is usually based on [RESTful/Resourceful Routing conventions](https://gist.github.com/myDeveloperJourney/dfb5b8728c54fce5e0e997ac3ce466a0).


- According to REST, the "proper" route to display asingle To Do would be:

	```shell
	GET /todos/:id
	```

- With the proper route identified, the next step is to create some UI that will send a request that matches that route...


- Let's refactor **todos/index.ejs** as follows:

	```html
	    <% todos.forEach(function(t, idx) { %>
	      <li>
	        <a href="/todos/<%= idx %>"><%= t.todo %></a>
	```
	Don't forget to add the `idx` parameter in the callback function


- Refresh the page and hover over the links. Looking at the bottom-left of the window will verify the paths look correct!

- **Links always send an HTTP request using what HTTP method?**


- The UI is set to send the proper HTTP requests to the server.

- However, clicking one of those links will display a_Not Found 404_ error - this means that there is no route on the server that matches the HTTP request.

- Let's add one...


- Add the **show** route below the **index** route as follows:

	```js
	router.get('/', todosCtrl.index);
	router.get('/:id', todosCtrl.show);
	```
	**The actual path is `/todos/:id` - right?**

- Saving will crash the app because there is no `todosCtrl.show` being exported from the controller...


- Add the `show` action inside of **controllers/todos.js** and don't forget to export it!

	```js
	function show(req, res) {
	  res.render('todos/show', {
	    todo: Todo.getOne(req.params.id),
	    todoNum: parseInt(req.params.id) + 1
	  });
	}
	```

- Express's `req.params` object will have a property for each **route parameter** defined, for example...


- A route defined like this:

	```js
	router.get('/category/:catName/page/:pageNo', ...);
	```
	and a link like this:
	
	```html
	<a href="/category/socks/page/2">Next Page</a>
	```
	would have a `req.params` available in the controller of:
	
	```js
	console.log(req.params.catName) //=> "socks"
	console.log(req.params.pageNo) //=> "2"
	```

- Note that all route param values are strings.


- Another refresh informs us that the `show` action in the controller is calling a `Todo.getOne` method that doesn't exist.

- Let's fix that error! In **models/todo.js**:

	```js
	module.exports = {
	  getAll,
	  getOne
	};
	
	function getOne(id) {
	  return todos[id];
	}
	```

- Refresh and of course there's an error because we haven't created  the **views/todos/show.ejs** that we're trying to render.

- Copy the boilerplate from **views/todos/index.ejs** and then add this inside the body element:

	```html
	<a href="/">Home</a>
	<a href="/todos">All Todos</a>
	<h1>Todo #<%= todoNum %></h1>
	<h3><%= todo.todo %></h3>
	<h3>Complete: <%= todo.done ? 'Yes' : 'No' %></h3>
	```

- Refresh - BAM!


### Routing Review


#### Use This Routing Guide and feel free to quiz yourself as necessary...

# RESTful Routes to CRUD Mapping

> Example resource: **posts**

HTTP Method<br>(Verb) | URI (endpoint)  | CRUD Operation | Typical<br>Controller Action | Has Data<br>Payload
-----------|------------------|------------------|:---:|:---:
GET     | /posts          | Read all _posts_ | index | No
GET     | /posts/:id      | Read a specific _post_ | show | No
POST    | /posts          | Create a new _post_ | create | Yes
PUT/PATCH     | /posts/:id      | Update specified _post_  | update | Yes
DELETE  | /posts/:id      | Delete specified _post_ | delete | No

# Additional Common Non-RESTful (CRUD-less) Routes

HTTP Method<br>(Verb) | URI (endpoint)  | Purpose | Typical<br>Controller Action |Has Data<br>Payload
-----------|------------------|------------------|:---:|:---:
GET     | /posts/new          | Return view (form) to add a new _post_ | new | No
GET     | /posts/:id/edit     | Return view (form) to edit a _post_ | edit | No

# Routing for Nested Resources (One:Many & Many:Many Relationships)

HTTP Method<br>(Verb) | URI (endpoint)  | CRUD Operation<br>or Purpose | Note
-----------|------------------|------------------|:---:
GET     | /posts/:id/comments | Read all _comments_ for a _post_ | No payload
GET     | /comments/:id | Read one _comment_ for a _post_ | "Shallow" route / No payload
GET     | /posts/:id/comments/new | n/a (Non-RESTful) | OPTIONALLY display a dedicated form used to create a nested resource
POST     | /posts/:id/comments | Create a _comment_ for a _post_ | Needs Payload
PUT/PATCH     | /comments/:id      | Update specified _comment_  | "Shallow" route / Needs payload
DELETE  | /comments/:id      | Delete specified _comment_ | "Shallow" route / No payload

> "Shallow routes are for CRUD operations where the parent's `id` is not needed.  For example,
you do not need the `id` of the _post_ route to delete a specific _comment_ - you only
need that particular _comment's_ `id`.


#### Routing Review


**Assume a data resource of `cats` when answering the following:**

1. What will the name of the router module be? (include its parent directory)

2. Write the line of code within **server.js** that would require the above router and assign it to a variable named `catsRouter`.

3. Write the line of code within **server.js** that would mount the above router object prefixing the proper path.


**Using the `router` object within `routes/cats.js` and assuming a cats controller assigned to a variable named `catsCtrl`:**


4. Write the line of code that defines the proper route that would read/display all cats (cats **index** route).

5. Write the line of code that defines the proper route that would read/display a single cat (cats **show** route).


**Using the `router` object within `routes/cats.js` and assuming a cats controller assigned to a variable named `catsCtrl`:**

6. Write the line of code that defines the proper route that would display a view that includes a form for submitting a new cat (cats **new** route).

7. Write the line of code that defines the proper route that would handle the cat form being submitted and creates a new cat (cats **create** route).



## References


<p style="text-align:left"><em>Note: When searching for info on the Express framework, be sure that you search for the info for version 4 only - there were significant changes made from earlier versions.</em> Also note that version 5 is currently in alpha although all of the code we've written should be compatible.</p>