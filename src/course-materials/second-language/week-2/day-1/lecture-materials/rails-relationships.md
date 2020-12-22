---
track: "Second Language"
title: "Rails Relationsips"
week: 2
day: 1
type: "lecture"
---


# Rails Relationsips

### More Migrations and Active Record with Relational data

<br>
<br>
<br>



### Lesson Objectives
_After this lesson, students will be able to:_

- Add a second model
- Run more migrations
- Add a foreign key to an existing model
- Seed data
- Query relational data in rails console

<br>
<br>
<br>


### Setup

* Use the `intro_app_api` project from this morning's lesson (the **Todo** app)

<br>
<br>
<br>


## One to Many Relationship

<br>
<br>

## has-many and belongs-to

In SQL you saw how to use a foreign key. A foreign key just maps a number to the id of another model. For example, if we have a `User` and a `Todo` model:

- User: `id: 22`
- Todo: `user_id: 22`

The user with `id` 22 will have associated Todos as specified by the Todos' foreign key, `user_id`.

[ActiveRecord Association Basics](https://edgeguides.rubyonrails.org/association_basics.html)

In postgres we could ask for all the Todos that belong to a specific user:

```sql
SELECT * FROM todos WHERE user_id = 22;
```

In `ActiveRecord` we could write:

```ruby
User.find(22).todos.all
```

... and get the same result

<br>
<br>
<br>



### What we will do

* We will create a second model, `User`

* We will make a relationship between `todos` and `users`.

> A user will have many todos.

> We do this by giving our Todos a **foreign key** that will reference the User.

> Users and todos will have a **one-to-many relationship**. Users will **have many** todos, and todos will **have one** user, represented by the foreign key.

> Another way to put it is that a User **has many** todos, and a Todo **belongs to** a single User.

<br>
<br>
<br>

### Run a migration to create a user table


```shell
rails g migration CreateUsers
```  

- In the migration file, User should have a name (a string)

```ruby
class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name
    end
  end
end
```

![screenshot](https://i.imgur.com/nIOUgiH.png)

Run the migration

```shell
rails db:migrate
```

**Check the user table in schema.rb**

![screenshot](https://i.imgur.com/6eglBHI.png)

Yay, we have two tables! Now we just need to relate them.


<br>
<br>
<br>



### Run a migration to add a foreign key column to the todos tables

* Generate a migration to add a column to the Todo table.

```
rails g migration AddUserIdToTodos
```

<br>

#### `add_column` method

Use the `add_column` method. In the `todos` table we want to add a column called `user_id` which will be an `integer`. This integer will be the foreign key.

```ruby
add_column :todos, :user_id, :integer
```

![screenshot](https://i.imgur.com/aFqHSYM.png)

```shell
rails db:migrate
```

Check the `schema.rb` file. Todos should have a column called user_id


```ruby
ActiveRecord::Schema.define(version: 20161223200259) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "todos", force: :cascade do |t|
    t.string  "title"
    t.boolean "completed"
    t.integer "user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
  end

end
```

![screenshot](https://i.imgur.com/2sGB2S7.png)

<br>
<br>
<br>

# Models

### User model

* Create a User model

```shell
app/models/user.rb
```

```ruby
class User < ApplicationRecord

end
```

We could, if we wanted to, add some entries into the database and query for the related todos in postgres right now, but what we really want is for `ActiveRecord` to know about this relationship.

* In the `User` model, specify the model's relation to the `Todo` model:

```ruby
has_many :todos
```

![screenshot](https://i.imgur.com/0k8EOmN.png)

<br>
<br>
<br>


### Todo model

* In the Todo model, specify the model's relation to the `User` model:

`belongs_to :user`

```ruby
class Todo < ApplicationRecord
  belongs_to :user
end
```

![screenshot](https://i.imgur.com/ZlnYXvV.png)

The methods `has_many` and `belongs_to` allows active record to read the foreign and primary keys as a relationship between our two Models.


<br>
<br>
<br>


## Active Record

### Active Record commands

Open Rails console: `rails c`

1. Create a User: `User.create(name: "Schmitty")`
2. Query for that user and save it to a variable: `user = User.find(1)`
3. Create a Todo for that user by accessing `user.todos`

```shell
user.todos.create(title: "Learn migrations and ActiveRecord", completed: false)
```

Now, query for `Todo.all` -- notice how the `user_id` is populated with the `id` of the user.

<br>
<br>
<br>


### Queries for related items

The relationship goes both ways. We can query for the Todo entries that belong to a user, and likewise, query for the User that owns a Todo.


<br>
<br>
<br>


### User -> Todos
See all the todos that **belong to** a specific user:

- `User.find(1).todos.all` or
- `user = User.find(1)` then `user.todos.all`

<br>
<br>
<br>


### Todo -> User
See the user associated with a Todo:

- `Todo.where(user_id: 1)` or
- `Todo.where(user_id: user.id)`

<br>
<br>
<br>

### Seeding the Database

Let's give our Users and Todos some seed data.

Open the file `db/seeds.rb`.

The pattern for making a single entry is:

```ruby
Model.create({ column: data, column: data })
```

To create a bulk set of User entries using the array syntax:

```ruby
User.create([{ name: "Neff" }, { name: "Jacc" }, { name: "Snoop" }])
```

To create four individual Todo entries:
(note that these have the foreign keys):

```ruby
Todo.create(title: "Accentuate the Positive", completed: false, user_id: 1)

Todo.create(title: "Eliminate the Negative", completed: false, user_id: 1)

Todo.create(title: "Latch on to the Affirmative", completed: false, user_id: 2)

Todo.create(title: "Don't mess with Mister In-Between", completed: false, user_id: 3)
```

**A Todo will not create if the associated user does not yet exist.**

![screenshot](https://i.imgur.com/JpjyKLM.png)

To run the seed file:

```shell
rails db:seed
```

Check that data was created by opening **rails console** and querying:

```shell
Todo.all
```

**EXERCISE:** Query a Todo for its associated User, and query a User for its associated Todos.

<br>
<br>
<br>


### BLOG APP II

Your blog app should now have a database table `posts` with columns for `title`, `author`, and `content`. Check that this is the case. Open up the `blog_app_api` directory, `rails dbconsole`, and `SELECT * FROM posts`.


**Activity (35 mins)**

* Create a model for the `posts` table that you made this morning (make the `post.rb` file in the `models` directory, and add the Class with inheritance from `ApplicationRecord`).

* Generate a migration for making a `Users` table
	* User should have a `name` and `password` (strings)

* Run the migration

* Create a model for `User`

* In `user.rb`, make it so the user `has_many` posts.  

* In `post.rb` make it so a post `belongs_to` a user.

Before we make our seed data, we need the `posts` table to have a foreign key column. The foreign key will reference which user the post belongs to.

* Generate a migration for adding a column to the the `Posts` table. The column should be called `user_id` of type `integer`.

* Run the migration, and check the `schema.rb`

* Seed your data:

In **Rails console:**

* Create two users
* Create a post for each user
* Check that the relations exist

In **seed.rb**

* Create two more users
* Create three posts, all three posts should belong to one of the users
* Run the seed file
* Check the data in Rails console and in the database

<br>
<br>
<br>

### Undoing Things

Undoing migrations:

```
rails db:rollback
```

Rolls back the last migration.

To go all the way back to the beginning, we can use

```
rails db:migrate VERSION=0
```

As you might guess, substituting any other number for 0 migrates to that version number, where the version numbers come from listing the migrations sequentially.

**Warning:** Migrations often depend on the previous migrations. If you go back in time with your migrations, be very careful what you alter later on in the chain.

To re-run your migrations from the beginning, AND seed the database:

```shell
rails db:migrate:reset
```

Destroy a migration file:

```shell
rails destroy migration migration_name
```

Destroy a model:

```shell
rails destroy model model_name
```

<br>
<br>
<br>

### Extra detail on the --api flag

 [Link to Resource](https://edgeguides.rubyonrails.org/api_app.html)

![screenshot](https://i.imgur.com/nGlVWQJ.png)

![screenshot](https://i.imgur.com/eYPmg1O.png)

![screenshot](https://i.imgur.com/i7dkplS.png)

