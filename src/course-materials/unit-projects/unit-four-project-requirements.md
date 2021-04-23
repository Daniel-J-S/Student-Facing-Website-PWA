---
track: "Second Language"
title: "Project Four"
type: "Project Prompt"
topics: "Unit Projects"
---

# Project #4: Ruby on Rails and React as a Team

<br>
<br>
<br>
<br>

### Overview

You’ve already worked in small groups to accomplish various labs and exercises, but this time **we’re going to challenge you to work in a small team on a project.**

You and your teammates together will architect, design, and collaboratively build a full-stack web app.

With this project you'll be building an exciting full-stack app that uses the **Ruby**-based **Rails Web Framework** with React as your front end just as we've done in class more than once.

**This project will push you both technically and collaboratively!**

You'll likely be working as part of a team in the workplace and **this project will provide you with that important team development experience.**

However, working on a project as part of a team can be more challenging due to logistical reasons, differing opinions, etc.

During this project, your instructors are going to be evaluating **your ability to listen to and respect other opinions; to share and contribute your ideas with the team; and form a consensus and compromise when opinions differ**.

In fact, **your ability to work in a team during this project is more important to your instructors than the project itself**.


<br>
<br>
<br>
<br>


## Technical Requirements

<br>

### &#x1F534; Mandatory to pass:
<br>

#### MVP - minimum viable product

* **Rails backend**: Serve a JSON API with all CRUD operations available across your models. 
	* The Rails API must be deployed online via Heroku.
	* Must have at least one model with full CRUD
* **React frontend**: Serve a React frontend that consumes your Rails API. The React frontend must be deployed online via Heroku or (more likely) Vercel, Netlify, or GitHub Pages.
	* Tip if you're using Heroku: Be sure to configure it to serve up the react static site or use the [mars/create-react-app buildpack](https://github.com/mars/create-react-app-buildpack) to do it automatically.
	* To use the create-react-app buildpack on Heroku, use this command line when creating your app from the terminal: `heroku create yourappname --buildpack mars/create-react-app` where `yourappname` is the name you want for your app/url.
* **Two git repositories** hosted on Github, with a link to the relevant live sites, and frequent commits dating back to the very beginning of the project. Commit early, commit often!
* At **least** one Github commit per day reasonably distributed across group members.
* **Full participation** by all group members
* **A ``README.md`` file** with explanations of the technologies used, the approach was taken, unsolved problems, and notes to yourself/group members so you can come back to your project later and be able to pick up your train of thought, etc. As well as a **link to your hosted working app**

<br>
<br>
<br>
<br>

### Project Approval

Be sure to write out what features you will need to build in order to meet MVP and some stretch goal ideas. Come prepared with:

- A repo with a `README` for the back end
- A repo with a `README` for the front end
- A Trello with sized user stories that encompass all major features of the project
- A role assignment for all group members (at least one)

<br>
<br>
<br>


### Project Assignment and Roles

Once teams are set, groups should decide upon the following roles. Everyone must have **at least one** of these roles, but smaller groups will have a member with two roles. We **do not advise one person to be both release manager and product manager**, as it is a direct conflict of interest ("let's get those features out--no, we need to make sure the code is clean first!").

- Release manager (responsible for handling branches, keeping `master` safe, and resolving merge conflicts if the developers cannot resolve them)
- Product manager (responsible for prioritizing tasks so that the user gets the most out of the app -- this will usually be the originator of the project idea)
- Lead front-end dev (responsible for breaking ties when the group has disagreements on front-end coding, and for designing a general plan for front-end development, e.g. file structure and `state` management)
- Lead back-end dev (responsible for breaking ties when the group has disagreements on back-end coding, and for designing a general plan for back-end development, e.g. file structure and schema definitions)

These roles may not seem important now, but when disagreements inevitably enter the dialog, it is important for someone to be responsible for specific parts of the application.

<br>
<br>
<br>

### Presentations

**Your entire team must participate in the presentation of the project.**

You will have approximately 10 minutes to present your project following these guidelines:

1. **Introduce the Project:**

	☐ Intro your project by paraphrasing the README.
	
2. **Demonstrate the Project:**

	☐ Launch the project by clicking the link in the README.
	
	☐ Be sure to demo all CRUD data operations.
	
3. **Show/discuss your code:**

	☐ Show the "main" model.
	
	☐ Show the code for some of your main components

4. **Share the experience:**

	☐ What was your biggest challenge? (besides Team Git Workflow)
	
	☐ What are your key learnings/takeaways?
	
5. **Q & A + Feedback**

<br>
<br>
<br>

### &#x1F535; Not mandatory:

#### Recommended features - choose two or more

* Configure CORS in your rails API so that **only** your frontend app can access your API
* Use Sass
* Include **two or more models** (additional models do not require full CRUD)
* Include either a one-to-many or a many-to-many relationship (full CRUD not required)
* Use a **third party API** with a gem
* Add **graphs or visuals** on your data with `Chart.js` or `D3.js`
* **Include portfolio-quality styling**
* **Use a CSS framework** like skeleton or bootstrap
* **Include User Stories**
* **Include wireframes** that you designed during the planning process (uploaded to your github repo)
* **Authentication**
* **Implement React Router**

<br>
<br>
<br>

## Meetings with instructors

_Approval meetings with instructors are TBT following the last class for Unit 4_

<br>
<br>
<br>


## How to Submit Your Project
**Project Metadata, Github Repos, Deployed Urls ... etc must be submitted ASAP following approval**


<br>
<br>
<br>
<br>

### Suggested Ways to Get Started

<details><summary>List of ways to get started</summary>

1. **Wireframe** Make a drawing of what your app will look like on each page of your application (what does it look like as soon as you log on to the site? What does it look like once a user logs in, etc.).

<br>

2. **Break the project down into different components** (data, presentation, views, style, DOM manipulation) and brainstorm each component individually.

<br>

3. Create your **user stories**

<br>

4. Create a **Trello board** and break down the user stories into cards

<br>

5. **Use your Development Tools** (console.log, inspector, alert statements, etc) to debug and solve problems

<br>

6. Work through the lessons in class for help and inspiration! Think about adding relevant code to your application each day - you are given a week so that you can work on it in small chunks, so COMMIT OFTEN. We will be looking at your commit dates and comments are part of your scoring.

<br>

7. **Commit early, commit often.** Don’t be afraid to break something because you can always go back in time to a previous version.

<br>

8. **Consult documentation resources** (MDN, jQuery, etc.) at home to better understand what you’ll be getting into.

<br>

9 . **Don’t be afraid to write code that you know you will have to remove later.** Create temporary elements (buttons, links, etc) that trigger events if real data is not available. For example, if you’re trying to figure out how to change some text when the game is over but you haven’t solved the win/lose game logic, you can create a button to simulate that until then.

</details>


<br>
<br>
<br>

### Useful Resources

* **[Heroku](http://www.heroku.com)** _(for hosting your project)_
* **[Writing Good User Stories](http://www.mariaemerson.com/user-stories/)** _(for a few user story tips)_
* **[Presenting Information Architecture](http://webstyleguide.com/wsg3/3-information-architecture/4-presenting-information.html)** _(for more insight into wireframing)_
