---
track: "Second Language"
title: "Books App Lab"
week: 2
day: 2
type: "lab"
---


# Books App Lab

<br>
<br>
<br>


In this lab you will

* **generate** a model instead of making it from scratch
* **use Faker** to seed data
* **create a controller** manually
* make API endpoints for **index** and **show**
* include status codes in your endpoints

<br>
<br>
<br>


## Make a Books App

Make an app called `books_app_api`

* Make a new Rails app called `books_app_api`. Remember the `--api` and `--skip-git` flags. Set `postgresql` as the database.

```bash
rails new books_app_api --api -d postgresql --skip-git
```

* Change into your project directory:

```bash
cd tweeter_app_api
```

* Create your database in your project directory

```bash
rails db:create
```

<br>
<br>
<br>


## Generate model

Instead of generating a migration, generate a **model** (see below). Generating a model will generate a migration for you. This is the first really convenient thing that Rails can do for you (and there are more convienent commands to come).

Bash prompt: `rails generate model book`

The model generator made **both** the book.rb file and the table migration file:

![screenshot](https://i.imgur.com/1pgQ2dL.png)

If you look in those files you'll see that the generator has also provided boilerplate code.

* `t.timestamps` in the migration file will make handy timestamp columns in your db. It appends columns of type `:datetime` called `:created_at` and `:updated_at` to the table. You won't need to provide any data for these, they'll work automatically. Leave timestamps in for now.

[Rails column types](https://stackoverflow.com/questions/11889048/is-there-documentation-for-the-rails-column-types)


<br>
<br>
<br>



## Migration

Fill out the migration file. A `book` should have:

```ruby
t.string :title
t.string :author
t.string :genre
t.string :publisher
t.date :publish_date
```

![screenshot](https://i.imgur.com/8WCTWL3.png)


* Run the migration: `rails db:migrate`


> **If** you get this:

![screenshot](https://i.imgur.com/ZBqnXGd.png)

> There is a simple fix. It's called `rails db:create`

After the migration has run, your schema should look like this:

![screenshot](https://i.imgur.com/eg0R5e0.png)

<br>
<br>
<br>

## Seed

Add `faker` to the Gemfile. Read more about the [Faker Gem here](https://github.com/stympy/faker) if you'd like, but doing so is optional. 

![screenshot](https://i.imgur.com/Vxqxcgs.png)

What command do you use to install the gems in the Gemfile? Whatever that command is, run it now.

In `db/seeds.rb` we will add seed data. We want to create 100 books.

Let's make a loop that runs 100 times:

```ruby
100.times do
end
```

![screenshot](https://i.imgur.com/8YEIS0H.png)

Add in the model and column names we know we want to populate:

![screenshot](https://i.imgur.com/FUWN5ng.png)

Use **Faker** to give us the stuff:

[Faker documentation](https://github.com/stympy/faker)

![screenshot](https://i.imgur.com/Gu1Hf6f.png)


```ruby
100.times do
  Book.create(
    title: Faker::Book.title,
    author: Faker::Book.author,
    genre: Faker::Book.genre,
    publisher: Faker::Book.publisher,
    publish_date: Faker::Date.backward
  )
end
```

* Run the seed with whatever command you use to run it. [Rails db: commands, substitute rake for rails](https://gist.github.com/stevenyap/7038932)

* Check the seed data.

Open Rails console.

`Book.find(1)`

A book should appear.

![screenshot](https://i.imgur.com/kLw62xz.png)


<br>
<br>
<br>


## Make Controller

In `app/controllers` make a file for our book controller.

* What is the convention for a controller file? Plural? With an underscore? Lowercase?

When you have the file made, add some code to the file.

* A controller is a Class

* The class inherits from another (built-in) class

* It looks like there a file, application_controller there that it could inherit from, but what's the syntax?

![screenshot](https://i.imgur.com/7NLXSF4.png)


<br>
<br>
<br>


## Make index

An index route is a method in the controller.

Add it in, and make an ActiveRecord query to get `.all` books and render it as json:

```ruby
  def index
    render json: Book.all
  end
```

![screenshot](https://i.imgur.com/PthMNBN.png)

**RUN THE SERVER `rails s`**

Go to the `/books` URI at [localhost:3000](http://localhost:3000)

You should get an error:

![screenshot](https://i.imgur.com/IL3bjRs.png)

> No route matches [GET] \"/books\">"

We need to make our routes available.


<br>
<br>
<br>



## Routes

In `config/routes.rb`

* add a method `resources`
* provide `:books` as an argument to the `resources` method.

![screenshot](https://i.imgur.com/P2DEcuU.png)

Check out all your routes with `rails routes`

Open up the `/books` again in the browser.

Your **index** API endpoint is almost ready for consumption.

All that's left is to provide a status code.

If everything is "OK", what status code should you send?

[HTTP Status Codes](https://httpstatuses.com/)

API endpoint example:

![screenshot](https://i.imgur.com/ESjb4SE.png)

<br>
<br>
<br>


## Show

In 	`rails routes` in Terminal, there is a name for the first param.

In your show action, `.find` the desired book using that param.

Remember, there is a `params hash` that comes through in the request. You can access the params using the syntax for accessing hash values.

![screenshot](https://i.imgur.com/j0TUJRY.png)


Go to `/books/5` and a variety of other routes to check that it's all working.

<br>
<br>
<br>


## Bonus - Member Routes

[Member routes](https://gist.github.com/dideler/10020345#member-routes)

When you use `resources` in `routes.rb`, it generates a bunch of boilerplate routes you can use. What if you want more than just those five? Look into using **member** routes to add other actions. Remember to `rails routes` to check the pathing and URI for your member routes.
