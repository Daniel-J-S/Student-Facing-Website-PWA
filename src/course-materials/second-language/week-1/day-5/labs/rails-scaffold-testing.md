---
track: "Second Language"
title: "Books App Lab"
week: 1
day: 5
type: "lab"
---

# Rails Scaffold And Automated Testing Lab

-------

<br>
<br>
<br>

Based on today's lesson, you'll need to:
- Create a New Application
  - Hint: Use `rails new` be sure to use the `--api` flag
- 1 Blog Model with the following Fields
    - Title -> String
    - Body -> String
- full crud API routes (index, show, create, update, destroy)
  - Hint: Use `rails g scaffold`
- test the api

<br>
<br>
<br>

## When finished generating your app, use the following steps to run automated testing and make sure your code works:

- Ensure your `rails server` is running on localhost:3000. It needs to be up and running for the tests to work.

- In your work folder (this does not need to live inside your rails project), create a file called `test_blogs.rb`

- Paste the following code into your `test_blogs.rb` file and save it:

```ruby
# To run tests, run this file, make sure to have installed minitest
# gem install minitest
require 'minitest/autorun'
require 'faraday'
require 'json'

## Test Class
class TestBlogs < Minitest::Test

    def test_index()
        puts("TESTING THE GET ROUTE")
        r = Faraday.get("http://localhost:3000/blogs/")
        assert r.status == 200
    end
    
    def test_create()
        puts("TESTING THE POST ROUTE")
        response = Faraday.post "http://localhost:3000/blogs/" do |request|
            request.body = {"title": "Super Blog", "body": "fsdadfasdf"}.to_json
            request.headers['Content-Type'] = 'application/json'
        end
        assert JSON.parse(response.body)["title"] == "Super Blog"
    end
    
    def test_update()
        puts("TESTING THE PUT ROUTE")

        response = Faraday.post "http://localhost:3000/blogs/" do |request|
            request.body = {"title": "Super Blog", "body": "dfadfadafd"}.to_json
            request.headers['Content-Type'] = 'application/json'
        end

        body = JSON.parse(response.body)

        response = Faraday.put "http://localhost:3000/blogs/#{body['id']}" do |request|
            request.body = {"title": "Super Blog II", "body": 5}.to_json
            request.headers['Content-Type'] = 'application/json'
        end

        body = JSON.parse(response.body)

        assert body["title"] == "Super Blog II"
    end
    
    def test_delete()
        puts("TESTING THE DELETE ROUTE")
        response = Faraday.post "http://localhost:3000/blogs/" do |request|
            request.body = {"title": "Super Blog", "body": "dfsdfsdf"}.to_json
            request.headers['Content-Type'] = 'application/json'
        end

        body = JSON.parse(response.body)

        id = body['id']

        response = Faraday.delete("http://localhost:3000/blogs/#{id}")

        assert response.status == 204
    end
end
```

- Run one time: `gem install faraday minitest`
  - These only need to be installed one time. You don't need to `gem install` every time you run your tests in the future.

- Run the tests: `ruby test_blogs.rb`

- See if your app passes the tests:

  - ![](https://i.imgur.com/cr0brMe.png)

  - It should have 0 failures and 0 errors. If not, make sure your rails server is running and you have migrated your database.

- Take a look through the automated tests to get a feel for what they are doing. Feel free to do some googling for `minitest` and `automated testing ruby` to learn more.

<br>
<br>
<br>

## Homework submission:
This homework counts as extra credit. To submit the homework, send us a screenshot of your tests passing like this:

![](https://i.imgur.com/cr0brMe.png)

It should have 0 failures and 0 errors.

<br>
<br>
<br>