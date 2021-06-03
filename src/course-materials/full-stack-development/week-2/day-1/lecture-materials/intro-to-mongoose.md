---
track: "Full-Stack Development"
title: "Intro to Mongoose"
week: 2
day: 1
type: "lecture"
---

# Intro to Mongoose

<br>
<br>
<br>

## Lesson Objectives

1. Explain what an ODM is
1. Connect to Mongo via text editor
1. Create a Schema for a collection
1. Create a model and save it
1. find a specific model
1. update a model already in the database
1. remove a model already in the database
1. combine actions


<br>
<br>
<br>


## Explain what is an ODM/ Intro to Mongoose

ODM stand for Object Document Model. It translates the documents in Mongo into upgraded JavaScript Objects that have more helpful methods and properties when used in conjunction with express.


<br>
<br>


Rather than use the Mongo shell to create, read, update and delete documents, we'll use an npm package called `mongoose`. Mongoose will allow us to create schemas, do validations and make it easier to interact with Mongo inside an express app.

![Mongoose Visual](Client_Server.png)


<br>
<br>
<br>


## Make a Schema

A schema will allow us to set specific keys in our objects. So if we have a key of `name`, we won't be able to insert other keys that don't match like `firstName` or `names`. This helps keep our data more organized and reduces the chance of errors.

We can also specify the datatypes.  We can set the datatype of `name` to a `string`, `age` to a `number`, `dateOfBirth` to a Date, `bff` to a Boolean etc.

We can also make some fields required and we can set default values as well.


<br>

Here is a sample Schema, with many options. We'll be making a smaller variation of this

```javascript
const articleSchema = new Schema({
	title:  { type: String, required: true, unique: true }, //can say whether we want properties to be required or unique
	author: { type: String, required: true },
	body:   String,
	comments: [{ body: String, commentDate: Date }], // can have arrays of objects with specific properties
	publishDate: { type: Date, default: Date.now }, // can set defaults for properties
	hidden: Boolean,
	meta: { // can have properties that are objects
		votes: Number,
		favs:  Number
	}
}, {timestamps: true});
```


<br>
<br>
<br>


## Basic Set Up

- `mkdir intro_to_mongoose`
- `cd intro_to_mongoose`
- `touch app.js`
- `npm init -y` and go through the prompts
- `npm i mongoose`
- `touch tweet.js`
-  `code .` ... or `code-insiders .` *(if you're using an M1 Mac)*


## Set Up Mongoose


Inside `app.js`

- require mongoose

```javascript
// Dependencies
const mongoose = require('mongoose');
const Tweet = require('./tweet.js');
```

<br>
<br>

- Tell Mongoose where to connect with MongoDB Atlas using a connection URI string and have it connect with the sub-database `tweets` (if it doesn't exist, it will be created)
- Set `mongoose.connection` to a shorter variable name

```javascript
// Global configuration
 const mongoURI = 'mongodb+srv://username:password@cluster0.oc1n0.mongodb.net/tweets?retryWrites=true&w=majority';
 const db = mongoose.connection;
```

- Connect to mongo
```javascript
// Connect to Mongo
mongoose.connect(mongoURI);
```


<br>
<br>

**🚨 Deprecation Warnings?**

Deprecation warnings are ok, it means changes are in progress with this software. Everything should still work, for now. But in later versions it may stop working and you'll have to update your code.

<br>
<br>

This should clear up the warnings:
```javascript
mongoose.connect(mongoURI, { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
```

- **OPTIONAL**  provide error/success messages about the connections

```javascript
// Connection Error/Success
// Define callback functions for various events
db.on('error', (err) => console.log(err.message + ' is mongod not running?'))
db.on('connected', () => console.log('Mongo connected: ', mongoURI))
db.on('disconnected', () => console.log('Mongo disconnected'))
```

- While the connection is open, we won't have control of our terminal. If we want to regain control, we have to close the connection.
Let's set leave the connection open for 5 seconds to demonstrate that the app will hang and then we'll get our close message.

Otherwise we have to press `control c`. When we run an express app, we typically want to leave the connection open, we don't need to get control of terminal back, we just let the app run.  

```javascript
// Automatically close after 5 seconds
// for demonstration purposes to see that you must use `db.close()` in order to regain control of Terminal tab
setTimeout(() => { db.close() }, 5000);
```


- The entire configuration for mongoose:
- Don't memorize it, just set a bookmark and refer back to this as you need it.
- note the setTimeout was just to demonstrate what `db.close()` does, you don't always need it

```javascript
// Dependencies
const mongoose = require('mongoose');
const Tweet = require('./tweet.js');

// Global Configuration
const mongoURI = 'mongodb+srv://username:password@cluster0.oc1n0.mongodb.net/tweets?retryWrites=true&w=majority';
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(mongoURI, { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Connection Error/Success - optional but can be helpful
// Define callback functions for various events
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('Mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('Mongo disconnected'));
```

<br>
<br>

## Set Up Tweet Schema

<br>

In `tweet.js`

```javascript
const mongoose = require('mongoose');// require mongoose
const Schema = mongoose.Schema; // create a shorthand for the mongoose Schema constructor

// create a new Schema
// This will define the shape of the documents in the collection
// https://mongoosejs.com/docs/guide.html
const tweetSchema = new Schema({
  title: String,
  body: String,
  author: String,
  likes:{ type: Number, default: 0 },
  sponsored: { type: Boolean, default: false }
}, { timestamps: tru e});

// Creating Tweet model : We need to convert our schema into a model-- will be stored in 'tweets' collection.  Mongo does this for you automatically
// Model's are fancy constructors compiled from Schema definitions
// An instance of a model is called a document.
// Models are responsible for creating and reading documents from the underlying MongoDB Database

// from here: https://mongoosejs.com/docs/models.html
const Tweet = mongoose.model('Tweet', tweetSchema);

//make this exportable to be accessed in `app.js`
module.exports = Tweet;

```
<br>
<br>
<br>


## Create a Document with Mongoose

In `app.js`

Let's make ourselves an object to insert into our database. When we connect with an express app, our data will be coming in as an object from the browser.

```javascript
const myFirstTweet = {
  title: 'Deep Thoughts',
  body: 'I was a poet and didn\'t know it',
  author: 'Karolin'
};
```
<br>
<br>
<br>


```javascript
Tweet.create(myFirstTweet , (error, tweet) => {
  if(error) { //if there is an error console log it
    console.log(error);
  } else { // else show us the created tweet
    console.log(tweet);
  }
	// get control of terminal back
	// else just use control c
  db.close();
});
```

<br>
<br>
<br>

Let's run this with
`node app.js`

We should see: Timestamps, deleted, and likes had default values, a unique _id has also been generated

Every time we run `node app.js` it will run the code, and thus insert this object over and over again.

Let's not do that. Let's comment it out.

<br>
<br>
<br>


Let's insert many more tweets

```javascript
const manyTweets = [
  {
    title: 'Deep Thoughts',
    body: 'I was a poet and didn\'t know it',
    author: 'Karolin'
  },
  {
    title: 'Sage Advice',
    body: 'Friends, I am vegan and so should you',
    author: 'Karolin',
    likes: 20
  },
  {
    title: 'Whole Reality',
    body: 'I shall deny friendship to anyone who does not exclusively shop at Whole Foods',
    author: 'Karolin',
    likes: 40
  },
  {
    title: 'Organic',
    body: 'Friends, I have spent $2300 to be one of the first people to own an organic smartphone',
    author: 'Karolin',
    likes: 162
  },
  {
    title: 'Confusion',
    body: 'Friends, why do you just respond with the word `dislike`? Surely you mean to click the like button?',
		author: 'Karolin',
    likes: -100
  },
  {
    title: 'Vespa',
    body: 'Friends, my Vespa has been upgraded to run on old french fry oil. Its top speed is now 11 mph',
    author: 'Karolin',
    likes: 2
  },
  {
    title: 'Licensed',
    body: 'Friends, I am now officially licensed to teach yogalates. Like this to get 10% off a private lesson',
    author: 'Karolin',
    likes: 3
  },
  {
    title: 'Water',
    body: 'Friends, I have been collecting rain water so I can indulge in locally sourced raw water. Ask me how',
    author: 'Karolin',
  },
];
```
<br>
<br>
<br>


Let's insert all these tweets:

```javascript
Tweet.insertMany(manyTweets, (error, tweets )=>{
  if(error){
    console.log(error)
  } else {
    console.log(tweets);
  } db.close()
});
```
- `node app.js`

and let's comment it out so we don't insert duplicates

<br>
<br>
<br>


## Find Documents with Mongoose

- Mongoose has 4 methods for this
 - `find` - generic
 - `findById` - finds by ID - great for Show routes!
 - `findOne` - limits the search to the first document found
 - [`where`](http://mongoosejs.com/docs/queries.html) - allows you to build queries, we won't cover this today

Let's find all

```javascript
Tweet.find((err, tweets) => {
  console.log(tweets);
  db.close();
})  ;
```

<br>
<br>
<br>


Let's limit the fields returned, the second argument allows us to pass a string with the fields we are interested in:

```javascript
Tweet.find({}, 'title body', (err, tweets) => {
  console.log(tweets);
  db.close();
});
```

<br>
<br>


Let's look for a specific tweet:

```javascript
Tweet.find({ title:'Water' }, (err, tweet) => {
  console.log(tweet);
  db.close();
});
```

We can also use advanced query options. Let's find the tweets that have 20 or more likes

```javascript
Tweet.find({ likes: { $gte:20 }}, (err, tweets) => {
  console.log(tweets);
  db.close();
});
```

<br>
<br>
<br>


### Delete Documents with Mongoose

We have two copies of our first tweet and a few options to delete it
- `remove()` danger! Will remove all instances
- `findOneAndRemove()` - this seems like a great choice
- `.findByIdAndRemove()`- finds by ID - great for delete routes in an express app!

```javascript
Tweet.findOneAndRemove({ title:'Deep Thoughts' }, (err, tweet) => {
  if (err) {
    console.log(err);
  } else {
    console.log('This is the deleted tweet:', tweet);
  }
  db.close()
});
```
<br>
<br>
<br>


### Update Documents with Mongoose

Finally, we have a few options for updating

- `update()` - the most generic one
- `findOneAndUpdate()`- Let's us find one and update it
- `findByIdAndUpdate()` - Let's us find by ID and update - great for update/put routes in an express app!

<br>
<br>


If we want to have our updated document returned to us in the callback, we have to set an option of `{new: true}` as the third argument

```javascript
Tweet.findOneAndUpdate({ title:'Vespa' },{ sponsored: true }, { new: true }, (err, tweet) => {
  if (err) {
    console.log(err);
  } else {
    console.log(tweet);
  }
  db.close();
});
```

<br>
<br>


We'll see the console.logged tweet will have the value of sponsored updated to true. Without `{new: true}` we would get the original unaltered tweet back.

<br>
<br>
<br>


### Intermediate

We can count how many tweets we have with likes greater than 20
```javascript
Tweet.countDocuments({ likes:{ $gte:20 }}, (err, tweetCount) => {
  console.log('The number of tweets with more than 19 likes is', tweetCount);
  db.close();
});
```

<br>
<br>

We can check out all the things we can do at the [Mongoose API docs](http://mongoosejs.com/docs/api.html)

<br>
<br>
<br>


### Advanced & New!

Mongoose 5.0.0 just came out on January 17, 2018
[It has an updated query builder that chains much like jQuery](http://mongoosejs.com/docs/queries.html).

Do a search, limit the number of returned queries to 2, sort them by title
```javascript
 Tweet.find({ 
   likes: { $gte:20 }},'title -_id')      
    .limit(2)
    .sort('title')
    .exec((err, tweets) => {
      console.log(tweets);
      db.close();
  });
```
<br>
<br>
<br>

## References

- [MongooseJS](https://mongoosejs.com/)