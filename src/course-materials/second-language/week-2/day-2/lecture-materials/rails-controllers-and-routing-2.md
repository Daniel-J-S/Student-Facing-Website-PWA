---
track: "Second Language"
title: "Rails Controllers & Routing 2"
week: 2
day: 2
type: "lecture"
---


# Rails Controllers & Routing 2



<br>
<br>
<br>


### Lesson Objectives
_After this lesson, students will be able to:_

- Write a controller method that creates data
- Send a POST request using either Postman or cURL to the create route
- Write a controller method that updates data
- Send a PUT request using either Postman or cURL to the update route
- Write a controller method that destroys data
- Send a DELETE request using either Postman or cURL to the destroy route


<br>
<br>
<br>

## Setup

* Open the `songs_app_api` project from this morning.



<br>
<br>
<br>


## Postman

![screenshot](https://i.imgur.com/7XkQ4EB.png)

For our server requests we will look into another useful piece of software called Postman.

Postman allows us to do everything cURL does, but with a nice interface.

* **You probably already have this installed from earlier in the class!**
* Download and install Postman: `https://www.getpostman.com/app/download/osx64`

[Postman](https://www.getpostman.com/app/download/osx64)

You don't have to register / sign up to use it. Skip that step.

We will learn how to use it soon. Armed with Postman, let's make a **create** method in our songs app.



<br>
<br>
<br>

## Create

In `songs_controller.rb` we need a method along with **index** and **show**, one that will create data.

What could it be? `rails routes` will tell us.

Answer: create

```ruby
def create
end
```

<br>
<br>
<br>

## Strong Params

Before we continue with the create route, we need first to establish **strong params**. Strong params is a security measure we use to make sure no one can send errant or malicious data to our controllers.

To make **strong params**, we write a gatekeeper method inside a `private` section of our controller file. Let's called the private method `song_params`. We can reference this method later in our controller methods.

```ruby
  def song_params
    # Returns a sanitized hash of the params with nothing extra
    params.required(:song).permit(:title, :artist_name, :artwork)
  end
```

```ruby
class SongsController < ApplicationController
  def index
    render(json: { songs: Song.all })
  end

  def show
    # Input comes in from the `params` hash
    render(json: Song.find(params[:id]))
  end

  def create
  end

  private # Any methods below here

  def song_params
    # Returns a sanitized hash of the params with nothing extra
    params.required(:song).permit(:title, :artist_name, :artwork)
  end
end
```

All we are doing is returning the globally available **params hash** with some checks on it. We are running methods on the hash:
* We chain `required` to require the specific model
* We chain `permit` to permit specific columns.


<br>
<br>
<br>

## Private

What does `private` do?

Regular, public methods of a controller class are exposed to the web server through Rails routes, but private methods are not. If you make any helper methods that do not correspond to routes, make them private. This will keep them inaccessible to anyone.



## The Create Method

```ruby
  def create
    song = Song.new(song_params)

    if song.save
      render(status: 201, json: { song: song })
    else
      render(status: 422, json: { song: song })
    end
  end
```

```ruby
class SongsController < ApplicationController
  def index
    render(json: { songs: Song.all })
  end

  def show
    # Input comes in from the `params` hash
    render(json: Song.find(params[:id]))
  end

  def create
    song = Song.new(song_params)

    if song.save
      render(json: { song: song }, status: 201)
    else
      # Unprocessable Entity
      render(json: { song: song }, status: 422)
    end
  end

  private

  def song_params
    params.required(:song).permit(:title, :artist_name, :artwork)
  end
end
```


**What is this stuff?**

* `song = Song.new(song_params)`

Establishes a new song using the params that were permitted with the private song_params method. Saves it to a variable, `song`.

* `if song.save render(status: 201, json: { song: song })`

If the `song` variable saves without any errors, then send a `201` status code (everything is chill), along with the song data. Note: status code `200` would be fine, too.

![screenshot](https://i.imgur.com/bLf0OZA.png)

[HTTP Status Code 201 - Created](https://httpstatuses.com/201)

* `else render(status: 422, json: { song: song })`

Woops! Something went wrong! Send a status code of `422` Unprocessable Entity, along with whatever was in the `song` variable for debugging.

![screenshot](https://i.imgur.com/edPAtk6.png)

[HTTP Status codes](https://httpstatuses.com/)

[422 - Unprocessable Entity](https://httpstatuses.com/422)



<br>
<br>
<br>

## Send Requests - Postman

[Download Postman](https://www.getpostman.com/app/download/osx64)

* Make sure your server is running: `rails s`

* Open Postman

* Change the request type to POST:

![screenshot](https://i.imgur.com/2Rj6dKZ.png)

<br>

* Click on `body`

![screenshot](https://i.imgur.com/tRMswrj.png)

<br>
<br>

In `body` we can write our key-value pairs. These pairs will look different to how we did it with Node/Express. The key will look like: `model[column]`.

* In `key` put `song[title]`
* In `value` put anything. NO quotes.
* Do the same for `artwork` and `artist_name`

![screenshot](https://i.imgur.com/gRri1sB.png)

<br>

What is missing? The URL for the request. How do we know where to send it? `rails routes`

Answer: `localhost:3000/songs`

![screenshot](https://i.imgur.com/mTNy44C.png)

<br>

Hit the **SEND** button to make the request.

If all goes well, you should see the response below the key-value fields:

![screenshot](https://i.imgur.com/HXsOeoY.png)

You can check your data in the browser -- index or show route.


<br>
<br>
<br>

## cURL

cURL requests also look different with the `model[column]` key name syntax:

```bash
curl -X POST -d "song[title]=Peaks" -d "song[artist_name]=Dictaphone" -d song[artwork]="None" localhost:3000/songs
```

Request:
![screenshot](https://i.imgur.com/n3zyPdE.png)

Response:
![screenshot](https://i.imgur.com/RnPeIhw.png)


<br>
<br>
<br>

## Validation

In POSTMAN, what if we send data for a column that doesn't exist?

Change `song[artist_name]` to `song[zartist_name]`

![screenshot](https://i.imgur.com/04KOq8Y.png)

**SEND**

Response:

![screenshot](https://i.imgur.com/VLSjHrf.png)

`zartist_name` was ignored, and `artist_name` is null. Good! It looks like any data that we send that does not conform to the `params.require().permit()` helper method is ignored completely. Thanks, **strong params**.

However, what if we want to prevent that `null` field? Let's make it so there **must** be data sent to the `artist_name` column, otherwise the request should fail.

* Add a simple validation to the `song.rb` file:

`app/models/song.rb`

```ruby
class Song < ApplicationRecord
  validates :artist_name, presence: true
end
```

**SEND THE REQUEST AGAIN FROM POSTMAN**

Remember to send `[song]zartist_name`

![screenshot](https://i.imgur.com/vItv6pw.png)

Thanks to our validation, we got that Status Code `422` that we programmed in to our create method. Nothing was entered into the database because the validation failed.

**SEND THE REQUEST AGAIN**

* Change `song[zartist_name]` back to `song[artist_name]`

* The request should work again with a Status `200`.

[More on validations](http://guides.rubyonrails.org/active_record_validations.html)


<br>
<br>
<br>

## Lab

![screenshot](https://i.imgur.com/mS4bLMs.png)

Do this mid-afternoon lab:

* Use the `books_app_api` from this morning
* Make a **create** route
* Use **strong params**. Remember, the method goes _inside_ the class. It goes _under_ private.
* Permit all of the columns from your schema except 'updated at' and 'created at' (You only need to permit columns that take user input).

![screenshot](https://i.imgur.com/4uo8RQg.png)


* If the create is successful, send a 201 status and the book data
* If the create is unsuccessful, send a 422 status and the book data. You can also send `book.errors` instead of the book.
* Use Postman to send a successful POST request.
* Look at your existing book data to see how to format the date for date_published. Also, try out some other stuff to see what happens.
* Add a validation to your model that requires the book title.
* Send a bad request and get the 422 status code from the server response.
* Send a good request and get the 201 status code from the server response.
* Try messin' with the **strong params** method and see what happens. eg. change the required model name. Change the permitted column names.


<br>
<br>
<br>

## Update & Destroy

```ruby
  def update
    song = Song.find(params[:id])
    song.update(song_params)
    render(json: { song: song })
  end
```


* find the song by the id in the request url
* update the song according to the permitted params
* render status `200` and the result if successful
* you could add in a check for Unprocessable Entity if you like

```ruby
  def destroy
    song = Song.destroy(params[:id])
    render(status: 204)
  end
```

* destroys the song according the id in the request url
* renders the status code `204`: No Content

![screenshot](https://i.imgur.com/7qkK4aV.png)

[Status Code 204](https://httpstatuses.com/204)

<br>
<br>
<br>

All together:

```ruby
class SongsController < ApplicationController
  def index
    render(json: { songs: Song.all })
  end

  def show
    # Input comes in from the `params` hash
    render(json: Song.find(params[:id]))
  end

  def create
    song = Song.new(song_params)

    if song.save
      render(json: { song: song }, status: 201)
    else
      # Unprocessable Entity
      render(json: { song: song }, status: 422)
    end
  end

  def update
    song = Song.find(params[:id])
    song.update(song_params)
    render(json: { song: song })
  end

  def destroy
    song = Song.destroy(params[:id])
    render(status: 204)
  end

  private

  def song_params
    # Returns a sanitized hash of the params with nothing extra
    params.required(:song).permit(:title, :artist_name, :artwork)
  end
end
```


<br>
<br>
<br>

## Send a Put Request

Make a Postman request to update some data:

* Open a new Postman tab
* Select PUT
* Enter the URL: `localhost:3000/songs/6`
* Select Body
* key: `song[title]`
* value: `Fade Into You`

![screenshot](https://i.imgur.com/MGTJQa0.png)

Hit **send**

<br>
Do it again, but change a different attribute:

* Open a new Postman tab
* Select PUT
* Enter the URL: `localhost:3000/songs/6`
* Select Body
* key: `song[artist_name]`
* value: `Mazzy Star`

Hit **send**

<br>

Result of both updates:

![screenshot](https://i.imgur.com/BOQjlZw.png)


<br>
<br>
<br>


## Send a Delete Request

* Open a new Postman tab
* Select DELETE
* Enter the URL: `localhost:3000/songs/6`

![screenshot](https://i.imgur.com/Z0CWe2v.png)

Hit **send**

Response 204:

![screenshot](https://i.imgur.com/2zz72nP.png)

* In your browser, go to `localhost:3000/songs`. The index route.
* The song with id: 6 should be gone.

![screenshot](https://i.imgur.com/oRec1Ih.png)


<br>
<br>
<br>


## cURL

```bash
curl -X PUT -d "song[title]=Dem Bones" localhost:3000/songs/13
```

```bash
curl -X DELETE localhost:3000/songs/13
```


<br>
<br>
<br>


## Lab


![screenshot](https://i.imgur.com/mS4bLMs.png)

* Add update and delete routes to `books_app_api`
* Make successful PUT and DELETE requests using Postman


<br>
<br>
<br>

#### Notes - Requetst to POST & PUT requests

POST request to create data in Postman:

Select POST

`localhost:3000/songs`

Select Body

* In `key` put `song[title]`
* In `value` put anything. NO quotes.
* Do the same for `artwork` and `artist_name`

Hit **send**

POST request to create data with cURL:

```bash
curl -X POST -d "song[title]=Peaks" -d "song[artist_name]=Dictaphone" -d song[artwork]="None" localhost:3000/songs
```

<hr>

PUT request to update data in Postman:

Select PUT

`localhost:3000/songs/6`

Select Body

key: `song[title]`
value: `some new title`

Hit **send**

PUT request to update data with cURL:

```bash
curl -X PUT -d "song[title]=Dem Bones" localhost:3000/songs/13
```