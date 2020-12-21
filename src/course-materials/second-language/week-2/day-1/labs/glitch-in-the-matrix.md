---
track: "Second Language"
title: "Glitch in the Matrix Lab"
week: 2
day: 1
type: "lab"
---


# Glitch in the Matrix Lab


![screenshot](https://i.imgur.com/90wg6lD.png)

## Initialize a new Rails project

* Use `rails new` to make a new Rails project called `matrix_app_api`
* You'll also want to push this homework to your Github Enterprise account; be sure to commit often when prompted.

* [Do it now!](https://getyarn.io/yarn-clip/6595a4af-f212-4fe4-a26a-95afae185ff7)

**Glitch?**

* You forgot to use the `--api` flag? Can't really fix that.

**Solution:** Don't worry about it for now, just keep going!

**Glitch?**

* You forgot to make postgres the db with the `-d` flag? If you forget this, `sqlite` will be the default, and we don't want that. You could fix this by installing the `pg` gem and altering the `database.yml` file, but since you just made the app it would be easier to start over.

**Solution:** Delete your folder, do `rails new` again, and this time use postgresql.

<hr>

**Commit your work** <br>
The commit message should read: <br>
"Commit 1: Initialized Rails server".
<hr>



<br>
<br>
<br>

## Run the Rails server

We haven't done this yet, but in Terminal, run the Rails server with `rails s`. The output in Terminal should look like:

![screenshot](https://i.imgur.com/Fx3Yue5.png)

In your browser, go to `localhost:3000`

You should see an error page:

If you remembered to set it up with the `--api` flag:

![screenshot](https://i.imgur.com/TLr8Llh.png)

If you forgot the `--api` flag:

![screenshot](https://i.imgur.com/x9ZTg7B.png)

**Glitch!**

* The database does not exist

**Solution:** Quit the server with `ctrl + c`. Make the database with `rails db:create`

<hr>

**Commit your work** <br>
The commit message should read: <br>
"Commit 2: Created the db".

<hr>

<br>
<br>
<br>
<br>


## Run migrations

Run your migrations with `rails db:migrate`.

**Glitch!**

* Nothing happens. That's because we did not first `generate` any migrations.

**Solution:** Generate migrations (instructions below)

<br>
<br>
<br>


## Generate migrations

We are going to make a **table** for the database. The table will eventually hold information about characters from the Matrix movies.

Generate a migration to make the table:

```shell
rails g migration CreateCharacter
```

Even though Character is singular, go ahead and press enter to generate the migration.

**Glitch!**

* I realized that I don't want a table called `character`. I want a table called `characters`. It's proper to name the table with a plural of the resource.

**Solution:** Rails solved this for us automagically!

The migration file should look like this:

![screenshot](https://i.imgur.com/3Gyh5RP.png)

You can see that it's going to name the table `characters` anyway! [Thanks, Rails](https://pics.me.me/i-get-logins-for-netflix-from-my-cousin-greg-thanks-46583612.png).

<hr>

**Commit your work** <br>
The commit message should read: <br>
"Commit 3: Created table migration".
<hr>

<br>

## Give details to migration file

I want my Matrix characters to have a name, description, and image url. All three will be strings. I'm going to try this in the migration file:

![screenshot](https://i.imgur.com/OZg87Yo.png)

I'm going to ignore the fact that I spelled `description` wrong (`desciption`).

<br>
<hr>


## Run migrations

Run the migration to create the table:

```shell
rails db:migrate
```

![screenshot](https://i.imgur.com/PoN7zYk.png)

**Glitch!**

* When I check the `schema.rb` file, I am disgusted to learn that I spelled `description` wrong.

![screenshot](https://i.imgur.com/O60cIMc.png)

**Solution:** Run another migration to change the column name (instructions below)

<br>
<br>
<hr>
<br>
<br>


## Make a corrective migration

I want to change the column in the schema called "desciption" to "description".

* Run a migration `rails g migration FixDescriptionColumnTypo`

The migration file should be an empty change method:

![screenshot](https://i.imgur.com/Fi0Oexz.png)

Good! No glitches, even though we called our migration `FixSomething` rather than `ChangeSomething`. It's all good, mates.

Add in `rename_column`:

```ruby
def change
  rename_column :characters, :desciption, :description
end
```

![screenshot](https://i.imgur.com/Cr5Be3H.png)


**Run the migration**

<br>
<hr>


# Check migrations

* Check the `schema.rb` file.

* Check the db with `rails dbconsole`

* `SELECT * FROM characters;`

![screenshot](https://i.imgur.com/gswi0M7.png)

* `\q` to quit dbconsole.

**Glitch?**

* If other columns are not spelled correctly, run more migrations to fix the column names.

<hr>

**Commit your work** <br>
The commit message should read: <br>
"Commit 4: Renamed the column".
<hr>

<br>

# Change table

**Glitch!**

I decided I want to name my entire table something other than `characters`. I want to call it `matrix_characters` because I might add in more movies to my app later, and want to be specific about which movie's characters I'm referencing.

**Solution:** Create another migration

```shell
rails g migration ChangeTableName
```

I can use a method called `rename_table` in the migration file:

```ruby
class ChangeTableName < ActiveRecord::Migration[6.0]
  def change
    rename_table :characters, :matrix_characters
  end
end
```

![screenshot](https://i.imgur.com/viS2D1c.png)

**Run the migration**

* Check the `schema.rb`

<hr>

**Commit your work** <br>
The commit message should read: <br>
"Commit 5: Changed table name".
<hr>

<br>

# Um, I changed my mind

**Glitch!**

I don't want the table to be called `matrix_characters`. I just want it to be called `characters`. I don't want or need the last migration, so can I get rid of it?

**Solution:**

* Undo the last migration with `rails db:rollback`
* Check that the `schema.rb` has "characters" as the table name, not "matrix_characters".

**Glitch!**

* If I ever run migrations again, it will rename my table again, because that migration file is sitting there ready to go. Ugh! I need to get rid of it!

**Solution:**

Destroy the migration with `rails destroy migration <migration name>`

![screenshot](https://i.imgur.com/LHGGBN5.png)

![screenshot](https://i.imgur.com/qIEa6QH.png)

Now the unnecessary migration should be gone. In the future, you could shorten the command to:

```shell
rails d migration <migration name>
```

<hr>

**Commit your work** <br>
The commit message should read: <br>
"Commit 6: Rolled back and destroyed migration".
<hr>

<br>

## Seed the database

Open the file `db/seeds.rb`

The pattern for making a single entry is:

```ruby
Model.create({ column: data, column: data })
```

Note that the Model name is **capitalized** and **singular**.

We can create many of a given Model using an array of entries. Copy this data into your `seeds.rb` file, an array of Matrix characters for our Character model (our table is called 'characters', so our model should be called 'Character' ... right?

```ruby
Character.create([
	{ name: "Neo", description: false },
	{ name: "Trinity", description: false },
	{ name: "Morpheus", description: false },
	{ name: "Agent Smith", description: false },
])
```

![screenshot](https://i.imgur.com/2Ub3JU5.png)

To run the seed file:

```shell
rails db:seed
```

Glitch! &#x1F47E; Glitch! &#x1F47E; Glitch! &#x1F47E; Glitch! &#x1F47E; **Glitch!**

![screenshot](https://i.imgur.com/eEnKDGQ.png)

* We haven't defined what `Character` is, yet.

* **Solution:** Make a `Character` model to relate to our database (instructions below). Then, we can make ActiveRecord entries for the `Character` model.

<hr>

**Commit your work** <br>
The commit message should read: <br>
"Commit 7: Failed to seed database"


<hr>

<br>
<br>
<br>

# Make a model

To make a model, first we need a model file.

Make a file in `app/models` called `characters.rb`

Can we seed our model yet? Run `rails db:seed`

**Glitch!**

* Character is still not recognized

<br>
<br>
<br>


**Solution:**

* Make a Character class. In `characters.rb` write in:

```ruby
class Character

end
```

Can we seed our model yet? Run `rails db:seed`.

<br>
<br>


**Glitch!**

* Character is _still_ not recognized.

<br>
<br>

**Solution:**

* Make the Character class inherit from ApplicationRecord (which, if you look in the `application_record.rb` file, you'll see that it inherits from `ActiveRecord`)

```ruby
class Character < ApplicationRecord

end
```

![screenshot](https://i.imgur.com/5NjS00n.png)

Can we seed our model yet? Run `rails db:seed`

**Glitch!**

* Nope! Character is still an unrecognized constant.

**Solution:**

* Rename our model file. Remember, Rails favors **convention** over **configuration**. We have to stick to Rails' conventions or we'll be doomed. Rails wants the model files to be **singular** not plural.

* Rename `characters.rb` to `character.rb`.

Can we seed our model yet? Run `rails db:seed`.

**Glitch?**

* There should be no glitch! In fact, there should be nothing printed at all.

![screenshot](https://i.imgur.com/T8TucKh.png)

If you did get an error, keep trying to fix the glitch.

<br>
<hr>


## Check seed data in the db

Open `rails dbconsole`

```sql
SELECT * FROM characters;
```

Expected output:

![screenshot](https://i.imgur.com/UCPfefb.png)

If you have any glitches, fix them!

<hr>


**Commit your work** <br>
The commit message should read: <br>
"Commit 8: Successfully seeded database"
<hr>

<br>

## The seed data is all wrong

**Glitch!**

* I don't like the seed data. There is an 'f' in the description columns instead of a description, and no data in the img_url columns. _But_ if I run more seeds the old data will still be there. I kind of want to reset the whole db with new seed data.

**Solution:**

* This is kinda overkill, but you never know when you'll need to do this. Drop the databases, run all the migrations all over again and then re-seed the database from scratch. (Instructions below)

**Change your seed data to have a (very) brief `description` of each Matrix character**

**Don't worry about the `img_url` for now**

- [Neo on Wikipedia](https://en.wikipedia.org/wiki/Neo_(The_Matrix))

- [Morpheus on Wikipedia](https://en.wikipedia.org/wiki/Morpheus_(The_Matrix))

- [Trinity on Wikipedia](https://en.wikipedia.org/wiki/Trinity_(The_Matrix))

- [Agent Smith on Wikipedia](https://en.wikipedia.org/wiki/Agent_Smith)



* Then, run `rails db:reset`

Expected output:

![screenshot](https://i.imgur.com/zbavral.png)

**reset** has dropped the databases, re-run the migrations, and re-seeded the databases.

Check that the db has seeded correctly inside `rails dbconsole`

```
SELECT * FROM characters;
```

`\q` to quit

<hr>


**Commit your work** <br>
The commit message should read: <br>
"Commit 9: Reset database"
<hr>

<br>

## Active Record Queries

Open the Rails console:

`rails c`

Using Active Record queries, do the following:

* add an `img_url` to each of the Matrix characters
* delete Agent Smith
* add a new character: The Oracle

<hr>


**Commit your work** <br>
The commit message should read: <br>
"Commit 10: Active Record queries"
<hr>

<br>

## Relations

* Make a second model, `vehicles` that has a column for `name` and `style`
* Seed a vehicle with a style "Spaceship", and name "Nebuchadnezzar"
* Change the `characters` table to have an integer field called `vehicle_id`
* In Rails console, associate Morpheus and Trinity with the Nebuchadnezzar

<hr>

**Commit your work** <br>
The commit message should read: <br>
"Commit 11: Relations"
<hr>

<br>

## Hungry For More?

* Read through the documentation on Migrations [Active Record Migrations](http://edgeguides.rubyonrails.org/active_record_migrations.html)

* Read about controllers to prepare you for your next lesson [Rails controllers](https://github.com/ga-students/wdi-remote-hopper/blob/master/unit_4/w10d05/instructor_notes/RAILS_CONTROLLERS.md)

* Implement an Index route that displays the JSON of all [Matrix characters](https://en.wikipedia.org/wiki/The_Matrix)

* Implement a Show route that displays the JSON of a single [Matrix character](https://en.wikipedia.org/wiki/The_Matrix)

<hr>

**Commit your work** <br>
The commit message should read: <br>
"Commit 12: Implemented controller"
<hr>

<br>