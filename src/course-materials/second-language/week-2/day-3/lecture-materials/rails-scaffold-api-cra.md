---
track: "Second Language"
title: "Rails Scaffold API & CRA (Create React App)"
week: 2
day: 3
type: "lecture"
---

# Rails Scaffold API & CRA (Create React App)

<br>
<br>
<br>

## Rails API


### Lesson Objectives
_After this lesson, students will be able to:_

- Set up a basic Rails API server using scaffold
- Set up another server to consume that API using React
- Configure CORS to allow Cross Origin Resource Sharing

<hr>


## Why make a Rails API?

Today, we will add a frontend to our Rails API **back end**.

[API on Wikipedia](https://en.wikipedia.org/wiki/Application_programming_interface)

![screenshot](https://i.imgur.com/zm4EeFX.png)

We are providing a _service_ that either ourselves or others will be able to access. Our service happens to be **data, in JSON format**.

Rails APIs are used as backends for mobile apps as well as desktop apps.

Without a frontend component, the data is its own thing. There is a complete _separation of concerns_ between the data and the display because they are running on separate servers. 

You swap out any old display and you should not need to change a single thing on the backend.

<br>
<br>
<br>

## Rails server is API only

We will leave our Rails server untouched by any frontend code. It will _just_ serve JSON.

We will then create another app to **consume the API**, as if we were some other developer or team whose job is just to make the frontend.

**What we will be doing**

* We will review the steps for creating a Rails API for our backend, and serve an **index** endpoint.

* We will create a new app _separate_ from our Rails server for our frontend.

* We will use our frontend app to consume the API coming from the backend. Our frontend server will serve React.

<br>
<br>
<br>

## Two Apps

**Let's start a project that will use two apps**

Rails App (our backend): provides the API

React App (our frontend): consumes the API

<br>
<br>
<br>

## Setup

<a href="/downloads/second_language/rails-scaffold/noticeboard_app.zip" download>Download</a> the starter code, you'll get a folder from the .zip file called `noticeboard_app` - go ahead and `cd` into `noticeboard_app`.

The directory `noticeboard_app` will contain both our Rails server and our Create React App (`noticeboard_client` is our Create React app that has some starter code).  

Inside this directory we will put both our apps - the front-end (client) and back-end (api AKA server). 

We are only putting them together in here to keep them organized. Make sure you open each one in a separate VS Code window, and each one has it's own separate git repo. WARNING: Do not create a git repo in the `noticeboard_app` folder or you will have deployment issues. 

These 2 separate apps can exist on separate systems (that is the point).

<br>
<br>
<br>

## Create our Apps

Inside `noticeboard_app` make the rails api called `noticeboard_api`:

Remember to add flags for

* api option `--api`
* database option `-d postgresql`
* skip active storage option `--skip-active-storage` (this is some extra stuff that assists with uploading photos and other media/large files to a service like S3 or Amazon Cloud services)

* `rails new noticeboard_api --api -d postgresql --skip-active-storage`

Tree structure: The `noticeboard_app` directory contains both the `_api` and `_client` directories.

* Open each child folder (noticeboard_api, and noticeboard_client) in a separate window of your text editor.

If you would like help keeping each window separate so you remember which is which, download the Peacock VS Code extension. It lets you give each window a different color.

<br>
<br>
<br>


## Scaffold the Rails API

Let's see how fast we can make our Rails API. (Aim: 15 minutes with explanations)

This morning, we will use the `generate scaffold` command to generate boilerplate code for a given resource. 

Our app will be a noticeboard, and the resource will be notices.

* First, go into the Rails directory (the `_api` one) on the command line.

* Then, create the database. `rails db:create`

* Scaffold the resource:

```bash
rails g scaffold notice title author phone
```

> `rails g scaffold model_name column column column`

**GOTCHA** - do not name the model the same as your app name: ie do not name this app `notices` and also name your model `notices` - bad errors will happen!

This will generate all the folders, files, and code needed for a model called `Notice` that has columns for `title`, `author`, and `content`, all of datatype string. 

String is the default datatype.

![screenshot](https://i.imgur.com/Ctfxp4F.png)

<br>
<br>
<br>
<br>


## What did "generate scaffold" do?

**Created files for migration, model, controller, and routes**

* `db/migrate`. Scaffold has created a migration file for our Notice resource. There is a boilerplate method for creating the **notices** table. Title, author, and phone columns (strings) are ready to go.

* `app/models/notice.rb`. Scaffold has created a file our Notice resource. The model has been set up for us.

* Look in `config/routes`. Scaffold has set our `resources` for us. The `rails routes` command will tell us what controllers and actions we should use:

```bash
 Prefix Verb   URI Pattern            Controller#Action
notices GET    /notices(.:format)     notices#index
        POST   /notices(.:format)     notices#create
 notice GET    /notices/:id(.:format) notices#show
        PATCH  /notices/:id(.:format) notices#update
        PUT    /notices/:id(.:format) notices#update
        DELETE /notices/:id(.:format) notices#destroy
```

* `notices_controller.rb`. Scaffold has provided all of the relevant routes for our CRUD actions: **index**, **show**, **create**, **update**, and **delete**.

* Scaffold has placed **instance variables** such as `@notices = Notice.all` for scoping.

* There is a new helper method `set_notice` invoked with a `before_action` method. All it does is find a notice according to its id before specific routes are hit. It is configured to work **only** for the show, update, and destroy methods.

* In the `create` method, **location** is an option for redirecting the page by setting the **Location** option in the response object. We probably just want the JSON and don't want our server to try to perform a redirect on the client, which can cause errors in Postman, etc. If you run into errors, remove `location: @notice` from the **create** action.

* Otherwise, the controller file is functionally exactly the same as what we have seen before.



<br>
<br>
<br>

## Migrate

Scaffolding does not interact with the database (for good reason).

Remember, all these Ruby migration commands are methods. If we add parens, they will still work the same.

<!--No need to type this-->

```ruby
  def change
    create_table(:notices) do |t|
      t.string(:title)
      t.string(:author)
      t.string(:phone)

      t.timestamps
    end
  end
```

* Run the migration: `rails db:migrate`

<br>
<br>
<br>

## Seed

Inside the Gemfile include Faker

* `gem 'faker'`

![screenshot](https://i.imgur.com/7wpsKcb.png)

Install the gem with `bundle` (shorthand for `bundle install`. `install` is the default option for the `bundle` command).

In `seeds.rb` use Faker to fill out the fields:

```ruby
100.times do
  Notice.create(
    title: Faker::TvShows::TwinPeaks.quote,
    author: Faker::Movies::StarWars.character,
    phone: Faker::PhoneNumber.cell_phone
  )
end

puts "Seeded database"
```

* Seed with `rails db:seed`

* Run the server with `rails s`

* Check out your API at `localhost:3000/notices`

![screenshot](https://i.imgur.com/zUSSVNq.png)

**And we're DONE with our Scaffold!**

<br>
<br>
<br>



# React Frontend

Remember, our Rails API is just that, an API. Our Rails server is like a data farm. This data farm can be made accessible to any client or platform.

For now, we are done with our API. Let's make a frontend that can interact with it.

* [Keep your Rails server running](https://www.youtube.com/watch?v=GEZockGkEyY).

* On the command line, open a new tab. Exit the Rails directory into the parent `noticeboard_app`.

* We are going to make a separate _client_ as our front end. It's not unusual to do so. Imagine a large company like facebook and all the data they manage. They have both a desktop app and a mobile app. These apps share the same databases. It would be a lot of duplication to copy all the data over from the desktop to mobile and then update everything everywhere.

In the interest of time, we are going to start with some boilerplate code:

- enter the `noticeboard_client folder`
- `npm install`
- `npm start` - you may have a conflicting port with your rails app, choose another port when prompted.

<br>
<br>
<br>

## Create React App

Create React App does a few really nice things for us. It builds us an app that is tailored to our needs. It does 'hot-reloading' - every time we save we see our changes in the browser update. It also does testing for us and give us helpful messages in the browser console.

Like Rails, Create React App is a bit magical and will handle a lot of things for us behind the scenes. As you continue to grow as developers, you can explore what the different parts of create react app are doing. For now, we'll focus on building something that interacts with our Rails backend.

![create react app file structure](https://i.imgur.com/bzf5feu.png)

Remember, we could use any frontend library or framework. (At least, one that can work with HTTP requests). But we'll stick with React since we've used it before.


<br>
<br>
<br>

### React Setup

We'll work with a few files: They will be in the `src` folder. But mostly, we'll stay focused on `App.js`:

```jsx

function App() {
  return (
    <div className="App">
      <h1>Notices</h1>
    </div>
  );
}

export default App;
```

Now let's customize our `App.js` to be for our app.


We'll render our different components inside our app:

```jsx
import { useState, useEffect } from 'react';
import Aside from './components/Aside';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import Nav from './components/Nav';

function App() {
  const [noticesState, setNoticesState] = useState({ notices: [] });
    return (
      <div className="App">
        <div className='container'>
          <Header />
          <Aside />
          <Main notices={noticesState.notices}/>
          <Nav />
          <Footer />
        </div>
      </div>
    );
}

export default App;
```

And that should do it!

We should see our Notices component render in the browser.


<br>
<br>
<br>


### React Fetch

Let's make the AJAX request to our Rails server to get data. The data will be an index of all the **notices**.

Two things to keep in mind:

1. Make sure your Rails server is running.

We know our app is running on `localhost:3000` right now, but that could change. 

We should use relative routes in our app. 

We can do that by adding a proxy in our `package.json` for our create react app.

```json
  "name": "noticeboard_client",
  "version": "0.1.0",
  "proxy": "http://localhost:3000",
  "private": true,
```

Make sure you kill and run `npm start` again, since we just changed the configuration for the React frontend.

2. The AJAX request below **should not** work. This is due to CORS, a basic security feature. We will talk about CORS specifically later.

>**NOTE:** If you are getting a syntax error of `<` in JSON - try restarting your Create React app (control c then npm start again)

Make a request to the Rails server and console log the response.

```jsx

function App() {
    const [noticesState, setNoticesState] = useState({ notices: [] });

     useEffect(() => {
         getNotices();
     }, []);

     function getNotices() {
       fetch('/notices')
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => console.error(error));
     }

    return (
      <div className="App">
        <div className='container'>
          <Header />
          <Aside />
          <Main notices={noticesState.notices} />
          <Nav />
          <Footer />
        </div>
      </div>
    );
}


export default App;
```

<br>
<br>

**If you get this:**

![screenshot](https://i.imgur.com/l8VZfgv.png)

It means your Rails server is not running.

If you get a response like this, then you have the expected CORS issue:

![screenshot](https://i.imgur.com/jowW1st.png)

![screenshot](https://i.imgur.com/s2ruqcN.png)

> Otherwise, you should see your API data showing up in your browser console. This might happen if somehow your browser is ignoring the `same-origin policy` OR has `localhost:3000` cached already.
>
> Try emptying your cache and see what happens.


<br>
<br>
<br>
<br>
<br>


# CORS

**You should have received this error message when getting your react app on `localhost:3001` to query your server on `localhost:3000` :**

![screenshot](https://i.imgur.com/jowW1st.png)

What's going on, here?

<br>
<br>
<br>
<br>


## same-origin policy

Browsers implement a security feature called **same-origin policy**. 

The idea is that Javascript requests to a server are rejected if they come from a different origin. 

AJAX requests can't make requests to other servers than the one they're coming from.

**TLDR: By default, AJAX requests must have the same origin and destination.**

> An origin is the combination of port, protocol and host.

To allow the browser to make a request to a different origin, we have to tell the server to accept cross-origin requests.


<br>
<br>
<br>
<br>


## Cross-Origin Resource Sharing

> Cross-Origin Resource Sharing (CORS) is a technique for relaxing the same-origin policy, allowing Javascript on a web page to consume a REST API served from a different origin.
>
> [Understanding CORS](https://www.codecademy.com/articles/what-is-cors)

Any production API has to deal with the **same-origin policy** and enable CORS if a frontend server is to consume that API.

>**GOTCHA:** You might run into CORS issues when you try to consume a third-party API. 

>Many projects have floundered because of third-party API CORS issues. 

>For this reason and others, we recommend hitting the third-party API from the backend if at all possible.


<br>
<br>
<br>

## Configure Rails for CORS


Let's tell Rails to send through that `Access-Control-Allow-Origin` header that our browser is freakin' out about.

* Uncomment the rack-cors gem in the Gemfile `gem 'rack-cors'` around line 28.

`Gemfile`:

![screenshot](https://i.imgur.com/8WNSCuB.png)

[More on the rack-cors Gem](https://github.com/cyu/rack-cors)

* Run `bundle` on the command line to install the Gemfile gems

![screenshot](https://i.imgur.com/NgpDIoY.png)

In the file `config/initializers/cors.rb`

* Uncomment the code in `cors.rb` that begins with

`Rails.application.config.middleware.insert_before 0, Rack::Cors`

![screenshot](https://i.imgur.com/Fq9Fr6U.png)

The address after origins is a _whitelist_ of domains where requests are allowed to originate. We can add as many as we like, separated by commas.

Change origins to the address where your frontend requests will be coming from. In our case, let's whitelist `localhost:3001` (or whatever default port Create React App is using).

![screenshot](https://i.imgur.com/ghxY51s.png)

We could whitelist

* the local version of the frontend app
* a hosted version of your frontend app
* an 'admin' version of the frontend app that makes alterations to the db and block other apps from doing so
* everything at once using `*`.

In the future, we might want to block apps from being able to alter the database in any way. In that case we would omit :post, :put, etc. For now let's keep all of the methods (:get, :post, :put, etc.) and the one local address.

**IMPORTANT: RESTART THE SERVER**

The changes will not apply if you do not kill and start the server, since we changed the configuration of the Rails app.


<br>
<br>
<br>


## Make AJAX Request

In your frontend app, make the request to the backend app.

> In Chrome and other browsers, the origin will be 'remembered' even if you change the CORS settings in the backend app. To reset, empty the browser's cache.

The request should work:

![screenshot](https://i.imgur.com/bHMV4wJ.png)

The data will be in the **data** object (100 notices).

If killing and restarting Rails, and hard refreshing (`cmd-shift-f`) your browser did not resolve the CORS error, you might have to start your browser with **same-origin policy** disabled:

`open -a Google\ Chrome --args --disable-web-security --user-data-dir`

However, please let an instructor know if you have to run this, because it may hinder your progress during the next project week.



<br>
<br>
<br>
<br>


# More Work With Our React Frontend

* Let's format our data on our page

<br>
<br>


### Display the AJAX'ed stuff

First, we need to add the `notices` we just pulled from our Rails API to `this.state` in `App.js`:

```js
  function getNotices() {
    fetch('/notices')
    .then(response => response.json())
    .then(json => setNoticesState({notices: json}))
    .catch(error => console.error(error));
  }
```

<br>
<br>
<br>

**Once this is added, we should see the following in the browser:**

![screenshot](https://i.imgur.com/23emQJv.png)

<br>
<br>

## Style

With React now 'consuming' our API, let's make a webpage using what was once known as the "Holy Grail" layout with a header, footer, main section, and two sidebars.

<br>
<br>
<br>


## CSS

We'll just add this code into `index.css`. 

*For small projects this is totally fine. As your projects get bigger, you'll likely want to work with other ways that React can incorporate organized CSS or even SASS.*


Use the following **Grid** CSS:

```css
@import url('https://fonts.googleapis.com/css?family=Roboto|Stylish&display=swap');

:root {
  --black: rgba(0, 0, 0, 1);
  --oasis-green: rgba(131, 151, 136, 1);
  --sandy: rgba(238, 224, 203, 1);
  --shady-sand: rgba(186, 168, 152, 1);
  --oasis-blue: rgba(191, 215, 234, 1);
}

h1 {
  text-align: center;
}
.container {
  display: grid;

  grid-template-areas:
    "header header header"
    "nav content aside"
    "footer footer footer";
  grid-template-columns: 20% 1fr 20%;
  grid-template-rows: auto 1fr 200px;
  grid-gap: 10px;
  height: 100vh;
}

header {
  grid-area: header;
  background-color: var(--oasis-blue);
}

nav {
  grid-area: nav;
  margin-left: 0.5rem;
  background-color: var(--oasis-green);
}

main {
  grid-area: content;
  background-color: var(--sandy);
}

aside {
  grid-area: aside;
  margin-right: 0.5rem;
  background-color: var(--oasis-green);
}

footer {
  grid-area: footer;
  background-color: var(--oasis-blue);
}
.notice {
  border: 5px solid var(--shady-sand);
  padding: 5px;
  font-family: 'Stylish', sans-serif;
}

form {
  display: grid;
  grid-template-columns: [labels] auto [controls] 1fr;
  grid-auto-flow: row;
  grid-gap: .3em;
  background: #eee;
  padding: .1em;
}

form > label  {
  grid-column: labels;
  grid-row: auto;
}

form > input,
form > textarea,
form > button {
  grid-column: controls;
  grid-row: auto;
  border: none;
  padding: .2em;
}

body {
  margin: 0;
}

@media (max-width: 768px) {
  .container {
    grid-template-areas:
      "header"
      "nav"
      "content"
      "aside"
      "footer";

    grid-template-columns: 1fr;
    grid-template-rows:
      auto /* Header */
      minmax(200px, auto) /* Nav */
      1fr /* Content */
      minmax(75px, auto) /* Sidebar */
      auto; /* Footer */
  }

  nav, aside {
    margin: 0;
  }
  nav {
    padding: 20px 20%
  }
}
```

![screenshot](https://i.imgur.com/36AhkCF.png)

**There, that looks a little better.**

<br>
<br>
<br>



## POST Request - Add a Notice to the Database

In order to `create` a `notice`, we will need to get our `formInputs` from the `Form` component. We will do this in a `handleAdd` function that sends that form data to the Rails API.

```js
function App() {
  const [noticesState, setNoticesState ] = useState({ notices: []});

  useEffect(() => {
    getNotices();
  }, []);
  
  function handleAdd(event, formInputs) {
    event.preventDefault();
    console.log(formInputs);
  }
  //... and pass this into the Aside

  <Aside handleSubmit={handleAdd} />
}
```

Test to make sure those `formInputs` show up in the console. 

Next, we will actually send this data to the Rails API.

<br>
<br>
<br>


### Send the AJAX Request

```javascript
// ...
  function handleAdd(event, formInputs) {
    event.preventDefault()
    fetch('/notices', {
      body: JSON.stringify(formInputs),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(createdNotice => createdNotice.json())
    .then(jsonedNotice => { setNoticesState(prevState => 
      ({ notices: [jsonedNotice, ...prevState.notices] }))
    })
    .catch(error => console.log(error))
  }
```

<br>
<br>
<br>
<br>


## Delete

Since our data is rendered all the way down in the Notice component but state is all the way up in the App, we should build out the functionality of delete up in app and pass down the functionality.

**App.js**

```jsx
  function handleDelete(deletedNotice) {
    fetch(`/notices/${deletedNotice.id}`, {
       method: 'DELETE',
       headers: {
         'Accept': 'application/json, text/plain, */*',
         'Content-Type': 'application/json'
       }
     })
   .then(() => {
    getNotices();
   })
   .catch(error => console.log(error));
  }
```

<br>
<br>
<br>

**Pass it down**
```jsx
<Main
  notices={noticesState.notices}
  handleDelete={handleDelete}
/>
```

<br>
<br>
<br>

Pass it down **Main.js**
```jsx
function Main({ notices, handleDelete }) {
    return (
      <main>
        <Notices
          notices={notices}
          handleDelete={handleDelete}
        />
      </main>
    );
}
```

<br>
<br>
<br>


Pass it down

**Notices.js**
```jsx
function Notices({ notices, handleDelete }) {
    return (
      <div>
        {notices.map(notice => 
          <Notice 
            key={notice.id} 
            notice={notice}
            handleDelete={handleDelete}
        />)}
      </div>
    );
}
```
<br>
<br>
<br>


**Notice.js**
```js
function Notice(props) {
    return (
      <div className="notice">
         <h3>{props.notice.title}</h3>
         <p>{props.notice.author}</p>
         <small>{props.notice.phone}</small>
         <button onClick={()=> props.handleDelete(props.notice)}>X</button>
       </div>
    );
}
```

<br>
<br>
<br>
<br>


## Update

Here is the strategy for our `Update` functionality:

- Replace `card` with a form by clicking an edit button.

- Replace form with card also on button click.

Where does `state` for all of this go?

The data for `notice` belongs all the way in app since we're making our AJAX requests and updating that state there. 

We'll also need a new piece of state for showing or hiding an edit form inside the `Notice` component.

Let's start with the `Notice` component.

Let's import `useState` from `react` and initialize it as `formVisible` state set to false.


```jsx
import { useState } from 'react';

function Notice(props) {

  const [formVisible, setFormVisible ] = useState(false);

  return (
    <div className="notice">
       <h3>{props.notice.title}</h3>
       <p>{props.notice.author}</p>
       <small>{props.notice.phone}</small>
       <button onClick={()=> props.handleDelete(props.notice)}>X</button>
     </div>
  );
}

export default Notice;
```

<br>
<br>
<br>

**... then we import our Form component**

```js
import Form from './Form.js';
```

Write a function to toggle the form view

```js
function toggleForm() {
  setFormVisible(!formVisible);
}
```

<br>
<br>
<br>

**Add a ternary operator to change our view based on state and a button with an event prop for toggling the form**

```jsx
  return (
    <> 
      { formVisible ?
        <Form />
        :
        <div className="notice">
          <h3>{props.notice.title}</h3>
          <p>{props.notice.author}</p>
          <small>{props.notice.phone}</small>
          <button onClick={()=> props.handleDelete(props.notice)}>X</button>
          <button onClick={toggleForm}>Edit This Entry</button>
        </div>
      }
    </>
  );
```

<br>
<br>

Let's pass down our notice into our Form

```jsx
<Form notice={props.notice} />
```

Let's write some logic that if there are props, we'll populate the form with the notice to edit.

<br>
<br>
<br>


**Form.js**

We'll also need to grab the id for our route, even though it never goes in as part of an input field.

We'll use the `useEffect` hook to check for the notice prop and then use that information to populate our form if needed

**don't forget to import it into Form.js**

```js
  useEffect(() => {
    if (props.notice) {
      setFormState({
        title: props.notice.title,
        author: props.notice.author,
        phone: props.notice.phone,
        id: props.notice.id
      })
    }
  }, [props.notice]);
```
<br>
<br>
<br>



Let's write our update function and send it down

<br>
<br>


**App.js**

```js
function handleUpdate(event, formInputs) {
  event.preventDefault();
  fetch(`/notices/${formInputs.id}`, {
    body: JSON.stringify(formInputs),
    method: 'PUT',
    headers: {
   'Accept': 'application/json, text/plain, */*',
   'Content-Type': 'application/json'
 }
})
 .then(() => {
   getNotices();
 })
 .catch(error => console.log(error));
}
```

<br>
<br>
<br>

Then send it down:

**App.js**

```js
<Main
  notices={state.notices}
  handleDelete={handleDelete}
  handleUpdate={handleUpdate}
/>
```

<br>
<br>
<br>


And down:

<br>
<br>
<br>

**Main.js**
```js
import Notices from './Notices.js';

function Main({ notices, handleDelete, handleUpdate }) {
    return (
      <main>
        <Notices 
          notices={notices} 
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </main>
    );
}

export default Main;

```
<br>
<br>

And down:

<br>
<br>
<br>

**Notices.js**
```js
import Notice from './Notice.js';

function Notices({ notices, handleDelete, handleUpdate }) {
    return (
      <div>
        {notices.map(notice => 
          <Notice 
            key={notice.id} 
            notice={notice}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        )}
      </div>
    );
}

export default Notices;

```

<br>
<br>
<br>

And down:

<br>
<br>
<br>


**Notice.js**

```js
return(
  <>
  { formVisible
     ? <Form notice={props.notice} handleSubmit={handleUpdate} />
```

<br>
<br>
<br>
<br>


Why are we naming this one `handleSubmit`?

There are a few more things we need to add in `Notice.js` to tie our update together:

- We need to run `toggleForm` when we click an "Edit this Entry" button
- We need to run `toggleForm` plus `props.handleUpdate` upon submit of the form

<br>
<br>
<br>

**Notice.js**
```jsx
function Notice(props) {
    const [ formVisible, setFormVisible ] = useState(false)

    function toggleForm() {
      setFormVisible(!formVisible);
    }

    function handleUpdate(event, notice) {
      props.handleUpdate(event, notice)
      toggleForm();
    }

  return (
    <> 
    { formVisible
      ? <Form notice={props.notice} handleSubmit={handleUpdate} />
        :
        <div className="notice">
          <h3>{props.notice.title}</h3>
          <p>{props.notice.author}</p>
          <small>{props.notice.phone}</small>
          <button onClick={()=> props.handleDelete(props.notice)}>X</button>
          <button onClick={toggleForm}>Edit This Entry</button>
        </div>
      }
    </>
  );
}
```

Now, let's try running our first update. We get...an error! In the console, you probably see an error.  If it has to do with sending a `PUT` request with an `undefined` ID, we will fix that below.  If it does not, try to debug the issue, using the code above as a reference.

Note that `handleSubmit` in `Form.js` does, indeed, not have an `id` in the object it passes.  Update the function as follows:

<br>
<br>
<br>


**Form.js**

```jsx
  function handleSubmit(event) {
    event.preventDefault();
    if (props.notice) formState.id = props.notice.id;
    props.handleSubmit(event, formState);
  }
```

We also need to update the button text based on whether we are updating an existing `notice` or adding a new one:

**Form.js**

```js
   <input type="submit" value={props.notice ? "update this notice" : "add a notice"}/>
```

<br>
<br>
<br>

### We Did It!

Now we have a reference application that demonstrates how to consume JSON data with React from a Rails backend.

