---
track: "Capstone Week"
title: "Week 1 - Day 1"
week: 1
day: 1
type: "lecture"
topics: "Installfest Phase 4"
---


# Installfest Phase 4

As an option for capstone week, we'll have the opportunity to learn another programming language and accompanying framework. However, before we get started, we need to ensure we have the proper tools installed on our machines.


<br>
<br>
<br>



## PostgreSQL

PostgreSQL is the database engine we'll use during this track and at this point we should already have it set up to run locally with the [Postgres App](https://postgresapp.com/)


<br>
<br>
<br>


## Python 3


We'll use homebrew to install Python 3. (_Python 2 is already installed on your Mac, the latest versions of MacOSX are also including Python 3 now. However, for safety concerns, we shouldn't actively develop our Python projects with the globally installed Python interpreter_)

**First, you might want to update Homebrew: `brew update`.**

**Install Python3 using Homebrew with this command:** `brew install python`. 

- You can test the installation by running `python3 --version`.

- You can also further test that you're using the correct (Homebrew) installation of Python by closing your terminal and then typing `which python3`

    - You should see `/usr/local/bin/python3` print as a result


**Python 3's package manager, `pip3` should have automatically been installed with Python 3.**

- Test that it was installed by running `pip3 --version`.


<br>
<br>
<br>


## PipEnv

**Next, let's install `pipenv`, this package enables us to better manage our project's dependencies using the following files:**
- `Pipfile`
- `Pipfile.lock`

**It works similarly to how we managed dependencies with `npm`/`node`, `package.json` & `package-lock.json` files.** 

<br>

**Pipenv provides us with what is known as a virtual environment for local development of Python projects.**

**Virtual environments help us manage the dependencies for each of our python projects with major/minor differences in versioning. Failure to seperate the different versions of dependencies across our projects can result in catastrophic issues during local development**

**Albiet we never took time to appreciate it, we enjoyed this same benefit with `node` and how each project by default has it's own `package.json` & `package-lock.json` files. This seperation of concerns also helps us protect and declutter our system and homebrew installed python package lists.**

- To install, run: `pip3 install pipenv`



<br>
<br>

**Next, we'll create a folder to manage our virtual environment and then install Django in it. Let's navigate to a location on our machine where we'd like to practice our Django Development and then run the following commands:**

- `mkdir django_env`
- `cd django_env`
- `pipenv shell`
- `pipenv install django`




<br>
<br>


**Now we can navigate anywhere on our machine while inside of this environment and create a django project:**

- `django-admin startproject first_django_project`
- `cd first_django_project`
- `python manage.py runserver`
- Navigate to `http://localhost:8000/` to see your new Django App!




<br>
<br>
<br>


## Summary

That's a wrap! 

These are all the tools we need to install for now. We'll learn more about Django this week!


