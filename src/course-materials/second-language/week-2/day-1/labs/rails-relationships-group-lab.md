---
track: "Second Language"
title: "Rails Relationships Group Lab"
week: 2
day: 1
type: "lab"
---


# Rails Relationships Group Lab

<br>
<br>
<br>

## Discuss

Answer these questions to the satisfaction of everyone in the group:

* Rails favors **convention** over **configuration**, what do you think this means?

* The way we have learned migrations, there is an intermediate step between generating a migration and running that migration. What is it and why does that step exist?

* What does running a migration do?

* What is a foreign key used for?

* What is `ActiveRecord` exactly?

<br>
<br>
<br>

## Build together

You'll have plenty of opportunity to do Rails stuff on your own (like Project 4). For now, build something together. Each person should have completed the step before the group moves on to the next step.

Answer any questions amongst yourselves along the way, before moving on to the next step.

<br>
<br>
<br>

### 1. Initialize new project

In `student_labs` make a project called `afternoon_lab_app_api`. Remember `rails new`, the `--api` flag, and the `-d postgresql` flag.


<br>
<br>
<br>


### 2. Create the postgres database

`rails db:create`

<br>
<br>
<br>


### 3. Generate a migration to create a table for `products`

Do not fill in the migration file yet.

<br>
<br>
<br>


### 4. Generate a migration to create a table for `reviews`



Do not fill in the migration file yet.

> Eventually, products and reviews will have a one-to-many relationship. A product will have many reviews. A review will belong a product.

<br>
<br>
<br>


### 5. Fill in the migration file for `products`

A product should have a `title` and a `price`. Research how to use a number as a datatype.

Do not run the migration yet.

<br>
<br>
<br>


### 6. Fill in the migration file for `reviews`

A review should have a rating (number) and content (string)

Do not run the migration yet.

<br>
<br>
<br>


### 7. Migrate both migration files

`rails db:migrate` will migrate all migration files that have not yet been migrated. Both the products and reviews tables should be created when you run the migration.

Check in the `schema.rb`.

<br>
<br>
<br>

### 8. Make a model for Product and a model for Review

Create `product.rb` and `review.rb`.

These models should be `Class`es that inherit from `ApplicationRecord`.

Don't add the relations just yet.

<br>
<br>
<br>

### 9. Test your models in Rails Console

`rails c`

Perform `ActiveRecord` queries on `Product` and `Review` to make sure they are working. `Product.count` should be zero.

<br>
<br>
<br>

### 10. Add a foreign key to reviews

Generate a migration that will add a column to the review schema.

Fill in the migration file: the column should be called `product_id` and will be a number (an integer).

Run the migrations (finally).

<br>
<br>
<br>

### 11. Add relationships to the models

Change `product.rb` to reflect that a `Product` has many reviews.

Change `review.rb` to reflect that a `Review` belongs to a product.

<br>
<br>
<br>

### 12. Seed some data

In `seed.rb`, create two products. Do not run the seed yet.

In `seed.rb` create three reviews. Associate two reviews with a product, and the remaining review with the other product.

Associate them using the expected ids of the seeded products.

Seed the products and reviews. `rails db:seed`

<br>
<br>
<br>

### 13. Test the seed in rails console

`rails c`

Run the queries to see if all the data is there, that the products have their related reviews, and the reviews have their related product.