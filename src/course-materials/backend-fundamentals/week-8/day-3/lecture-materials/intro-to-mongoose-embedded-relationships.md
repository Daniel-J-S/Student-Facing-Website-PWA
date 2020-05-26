---
track: "Backend Fundamentals"
title: "Intro to Mongoose Embedded Relationships"
week: 8
day: 2
type: "lecture"
---

# Intro to Mongoose Embedded Relationships

## Learning Objectives

Students Will Be Able To:

- Use EJS Partial views
- Define schemas for embedding Subdocuments
- Embed a Subdocument in its related document


## Roadmap
1. Setup
2. Review the Starter Code
3. Related Data Entities - Review
4. Embedding Subdocuments
5. Adding Reviews to a Movie
6. Essential Questions
7. Further Study
	- Retrieve a Subdocument from a Mongoose Array
	- Remove a Subdocument from a Mongoose Array
	- Query for a Document that Contains a Certain Subdocument


#### Setup


1. <a href="/downloads/backend_fundamentals/mongoose-embedded-relationships/starter-code/mongoose-movies.zip" download>Download</a> the starter code to get started
2. Install the node modules:

```shell
$ npm install
```
	
3. `cd` inside the project folder in your code editor.

4. Use `nodemon` to start the server.


#### Review the Starter Code


- As you can see, a navigation bar and a bit of styling has been added since yesterday.

- However, the changes are more than skin deep...

- **EJS Partial Templates** have been implemented! Check out how:
	- **movies/index.ejs** & **movies/new.ejs** are using EJS's `include` function to _include_ header and footer "partial" templates.
	- Check [these docs](https://www.npmjs.com/package/ejs#includes) for more info.
	- All `res.render()` calls are passing in a `title` property that's being used for the page title and to dynamically add an `active` class to the links in the nav bar.


#### Review the Starter Code


- Similar to how we previously added **show** functionality to the todos app, the **show** route/action for viewing a single movie has been implemented:
	- **views/index.ejs** shows a "DETAILS" link that will send a request to the proper `show` route: `GET /movies/:id`.
	- EJS tags write the movie's `_id` into the `href` attribute.
	- The `moviesCtrl.show` action is using `Movie.findById` method to retrieve the movie doc with an id of `req.params.id`.


#### Related Data Entities - Review


- As you may recall, **relationships** exist between **entities**.

- For example, in the _Mongoose Movies_ app, we might have the following entity relationships:

	- **_A Movie has many Reviews; A Review belongs to a Movie_**
	**`Movie --< Review`** (One-To-Many)
	
	- **_A Movie has many Performers; A Performer has many Movies_**
	**`Movie >--< Performer`** (Many-To-Many)

- **_A Movie has many Reviews_**

- In a SQL Database, how we model data for an application is usually obvious - there isn't much flexibility, for example, there would **have** to be a `Review` model that maps to a _reviews_ table.

- However, modeling data in MongoDB/Mongoose is more flexible, less strict, and  left up to the developer to decide,andthose decisions should be based on how best to implement the features of an application...


#### Adding Movie Reviews


- In most apps, a related entity, such as _reviews_, would likely be displayed with its parent being reviewed, in this case a _movie_.

- If we stored _reviews_ in their own collection by using a `Review` Model, we would have to make separate queries to access the _reviews_ for the movies. But there's a more efficient way - embedding.

- With MongoDB/Mongoose, **_reviews_** are a perfect use case for embedding related data.


#### Embedding Subdocuments


- Subdocuments are very similar to regular documents.

- The difference being that they themselves are not saved directly - they are saved when the document they are embedded within is saved.

- Subdocuments do have their own **schema** though.

- However, since subdocs are not saved to a collection, we **do not compile a subdoc's schema into a Model**.


#### Creating a Schema for a Subdocument

- If a schema is going to be used for embedding subdocs in just **one** Model, then there's no reason to put the schema in its own module.

- In our case, it's okay to write the `reviewSchema` just above the `movieSchema` in **models/movie.js**:

```javascript
const reviewSchema = new Schema({
 content: String,
 rating: {type: Number, min: 1, max: 5, default: 5}
}, {
 timestamps: true
});

const movieSchema = new Schema({
```

- With `reviewSchema` defined, we can now use it within the `movieSchema` as follows:

```javascript
const movieSchema = new Schema({
 ...
 nowShowing: { type: Boolean, default: false },
 // reviews is an array of review subdocs!
 reviews: [reviewSchema]
}, {
 timestamps: true
});
```

- We're now ready for the  _User Story_...


#### Adding Movie Reviews - Step 1


- **_AAU, I want to add a review for a movie that includes a rating_**

- Step 1 is to determine the proper route.

- Routing for a related, also called a nested, resource is slightly different.  Take a look [here](https://gist.github.com/myDeveloperJourney/dfb5b8728c54fce5e0e997ac3ce466a0).

- Using the chart, the proper route for creating a _review_ is:

```shell
POST /movies/:id/reviews
```

- Importantly, the route provides to the server the `_id` of the _movie_ that the _review_ is being created for.


#### Adding Movie Reviews - Step 2


- Step 2 calls for creating the UI - in this case, we need a form to submit the review to the server.

- A nested resource like comments or reviews, usually has its form on the **show** view of its parent - you _could_ have a dedicated view, but not today.

- Open up **movies/show.ejs**...


- Here's the form to add under the current `</section>`:

```html
</section>
<!-- new markup below -->
<h2>Reviews</h2>
<form id="add-review-form" method="POST"
 action="/movies/<%= movie._id %>/reviews">
 <label>Review:</label>
 <textarea name="content"></textarea>
 <label>Rating:</label>
 <select name="rating">
   <option value="1">1</option>
   <option value="2">2</option>
   <option value="3">3</option>
   <option value="4">4</option>
   <option value="5">5</option>
 </select>
 <input type="submit" value="Add Review">
</form>
```

- A touch of styling. **Update** this existing CSS rule on line 68:

```css
#new-form *, #add-review-form * {
 font-size: 20px;
 ...
```

and **add** this new CSS to the bottom:

```css
#add-review-form {
 display: grid;
 grid-template-columns: auto auto;
 grid-gap: 1rem;
}

#add-review-form input[type="submit"] {
 width: 8rem;
 grid-column: 2 / 3;
 margin-bottom: 2rem;
}
```
 

#### Adding Movie Reviews - Step 3


- Browse to the "details" of a movie.

- I warned you it would be ugly, but the form's `action` attribute looks pretty sweet!

- Step 3 calls for defining the route on the server...

- To achieve max flexibility for CUD'ing the _reviews_ resource, let's define a dedicated **route** module:

```shell
$ touch routes/reviews.js
```

<br>

and a **controller** module too:
	
<br>

```shell
$ touch controllers/reviews.js
```


#### Adding Movie Reviews


- Now let's require the new router in **server.js**:

```javascript
const moviesRouter = require('./routes/movies');
// new reviews router
const reviewsRouter = require('./routes/reviews');
```
and mount it like this:

```js
app.use('/movies', moviesRouter);
// mount the reviews router
app.use('/', reviewsRouter);
```

- Note that when mounting routers for _nested_ resources we need more flexibility in our paths, so we are going to mount to the root (`/`) path.


#### Adding Movie Reviews - Step 3


- Let's require the usual at the top of the router module and add our first route in **routes/reviews.js**:

```javascript
const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

router.post('/movies/:id/reviews', reviewsCtrl.create);

module.exports = router;
```

- The server won't be happy until we create and export that `create` action...


#### Adding Movie Reviews - Step 4


- Step 4 says to code and export the controller action.

- Let's go to the new **controllers/reviews.js**:

```javascript
const Movie = require('../models/movie');

module.exports = {
 create
};
```
	
- Above we are requiring the `Movie` model because we will need it to access the _movie_ document to add a review to.

- Let's write the `create` function next...


- Here's the `create` function used to add a _review_ to a _movie_:
	
```javascript
function create(req, res) {
 Movie.findById(req.params.id, function(err, movie) {
   movie.reviews.push(req.body);
   movie.save(function(err) {
     res.redirect(`/movies/${movie._id}`);
   });
 });
}
```

- As you can see, we simply push in an object that's compatible with the embedded document's schema, call `save` on the parent doc, and redirect to wherever makes sense for the app.


#### Adding Movie Reviews - Update **show.ejs**


- All that's left is to update **movies/show.ejs** to render the _reviews_.  Time permitting, let's type it in, otherwise we can copy/paste then review.

- It's a bit large, next slide please...



```html
<% if (movie.reviews.length) { %>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Review</th>
        <th>Rating</th>
      </tr>
    </thead>
    <tbody>
      <% movie.reviews.forEach(function(r) { %>
        <tr>
          <td><%= r.createdAt.toLocaleDateString() %></td>
          <td><%= r.content %></td>
          <td><%= r.rating %></td>
        </tr>
      <% }); %>
    </tbody>
  </table>
<% } else { %>
  <h5>No Reviews Yet</h5>
<% } %>
```


#### Adding Movie Reviews 


- Assuming no typos, you should be able to add reviews!

- Let's wrap up with some essential questions before you start on the lab to practice this stuff!

- Oh, when you get a chance, be sure to check out the_Further Study_ section which shows you how to:
	- Retrieve a subdocument embedded in a Mongoose array
	- Remove a subdocument from a Mongoose array, and
	- Query for a document that contains a certain subdocument!


### ❓ Essential Questions


<p>Take a minute to review...</p>

1. **True or False: All schemas must be compiled into a Model.**

2. **Is it more efficient to embed or reference related data?**

3. **True or False: An embedded subdocument must have its `save` method called to be persisted to the database.**


### Further Study


#### Retrieve a Subdocument from a Mongoose Array


- Mongoose arrays have an `id` method used to find a subdocument based on the subdoc's `_id`:

```javascript
const reviewDoc = movieDoc.reviews.id('5c5ce1be03563ad5540e93e2');
```

- Note that the string argument represents the `_id` of the _review_ subdoc, not the _movie_ doc.


#### Remove a Subdocument from a Mongoose Array


- Subdocuments have a `remove` method used to remove them from the array:

```javascript
// remove the first review subdoc
movieDoc.reviews[0].remove();
```


#### Query for a Document that Contains a Certain Subdocument

- There's an amazing syntax that you can use to query documents based upon the properties of subdocs.

- Let's say you wanted to find all movies with a 5 rating:

```javascript
Movie.find({'reviews.rating': 5}, function(err, movies) {
  console.log(movies);
});
```
- Wow! `reviews.rating` represents the array and a property on the subdocs within that array!

- Note that the **dot** property syntax must be enclosed in quotes.



# References
- [MongooseJS Docs - Subdocuments](https://mongoosejs.com/docs/subdocs.html)
