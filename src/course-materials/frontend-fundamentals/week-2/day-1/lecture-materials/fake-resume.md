---
track: "Frontend Fundamentals"
title: "Fake Resume & Github Practice"
week: 2
day: 1
type: "lecture"
---


# Fake Resume & Github Practice

<br>
<br>
<br>


#### Learning Objectives

- HTML/CSS
- Getting comfortable with GitHub


<br>
<br>
<br>


## Git & Github - Getting Started


1. Create a file called `answers.md` inside a folder called `resume_page`.
2. Write your and answer the questions below in your `answers.md` file.
3. Commit your work at each point when directed (remember to `git add .` and then `git commit -m "your commit message here"`).

<br>
<br>
<br>

## Git & Github - Questions

Refer back to the notes from today and/or use the internet and google-fu to find the answers to the questions below:

<br>
<br>
<br>

**Answer the following questions**

1. What command do you use to setup a git repository inside of your folder?
1. What command do you use to ask git to start tracking a file?
1. What command do you use to ask git to move your file from the staging area to the repository?
1. What command do you use to get updates from the class repository?
1. What command do you use to push your work to your fork of the class repository?

<br>
<br>
<br>


🔴 **Commit your work!** <br>
Your commit message should read something like: 

<br>

`"The 1st set of GIT homework answers are complete"`


<br>
<br>
<br>


## HTML & CSS Videos

You should have covered all of this information during Fundamentals, but if you feel like you need a refresher on some of the basics of HTML and CSS, you can watch the following videos! If you don't need a refresher, feel free to skip this section.

1. [HTML Intro (tags, content, attributes, semantic HTML)](https://www.youtube.com/watch?v=DxhXFpsN5I4&index=1&list=PLdnONIhPScST0Vy4LrIZiYKpFNoxgyH7J)
1. [HTML Elements (headers, navigation, lists, sections, etc.) and Media (images, audio, videos)](https://www.youtube.com/watch?v=KhbnrDhWDdE&index=2&list=PLdnONIhPScST0Vy4LrIZiYKpFNoxgyH7J)
1. [CSS Intro (including css files in HTML, elements)](https://www.youtube.com/watch?v=xWiT2TWCFjc&index=3&list=PLdnONIhPScST0Vy4LrIZiYKpFNoxgyH7J)
1. [CSS Basics (colors, background, font properties)](https://www.youtube.com/watch?v=UMMHsQPmfug&index=4&list=PLdnONIhPScST0Vy4LrIZiYKpFNoxgyH7J)

<br>
<br>
<br>


## Fake Resume Page

![](https://imgur.com/gpMfn6n.png)

Grumpy cat is looking for a new job! Using what you know about HTML and CSS, help him by creating a resume website for him. (Note: You don't need to know 'real information' about Grumpy Cat -- just make things up!)

This is what he wants you to incdlude and do for his resume:

- have an `index.html` file
- have an `main.css` file that is linked to the `index.html` file
- have HTML `boilerplate` code for `index.html`
- Include:
  - at least one header
  - navigation (these can be dummy links that don't go anywhere yet)
  - at least one list
  - change the font color in at least one place
  - change the background in at least one place
  - change the font in at least one place

<br>
<br>
<br>


## Fake Resume Page - Getting Started

1. Make sure you're in your `resume_page` folder (you created this earlier for your Git/GitHub answers).
2. From inside this folder, create two files: `index.html` and `style.css`.
3. Open the directory in your text editor and add the HTML boilerplate to your `index.html`.
    - _HINT:_ There's a shortcut to quickly create an HTML boilerplate. 
4. Create a heading level-one tag with the name: Grumpy Cat.
5. Open the `index.html` in your browser to confirm that everything is set up properly.
Reminder: To open your file with your browser, from the command line, type `open index.html`

<br>
<br>
<br>


🔴 **Commit your work!** <br>
Your commit message should read something like: 


<br>

`"resume index.html file is setup"`


<br>
<br>
<br>


## Fake Resume Page - Adding Content

1. Insert a professional image of Grumpy Cat ('img' tag), it should be placed right after your 'h1' tags
1. Insert an unordered list of his past three work positions ('ul' tag)
1. Create links for LinkedIn and Facebook/Twitter pages ('a' tag). You can set this to a dummy link
1. Use level-three heading tags to create headings before the work positions and before the links

<br>
<br>
<br>


🔴 **Commit your work!** <br>
Your commit message should read something like: 

<br>


`"added initial content for resume site"`

<br>
<br>
<br>


## Fake Resume Page - Adding Style

Add some style to your site and feel free to style it however you want! Here are some ideas:

1. Center your "h1" tag
1. Change the font of your "h1" tag
1. Change the color of the font of your "h3" tag
1. Add some space on the body of your application to make your site look more appealing.

<br>
<br>
<br>


🔴 **Commit your work!** <br>
Your commit message should read something like: 

<br>

`"added styling for resume site"`


<br>
<br>
<br>


## Fake Resume Page - Adding Navigation

1. Create a nav bar with the links to LinkedIn, Twitter (whichever links you had created earlier); Remove the links section that you had created earlier in the homework
1. In the nav bar, also create a link to the 'index.html' page (maybe give it a name of `Home Page` in the bar), and a link to a file called "projects.html" (maybe call this `Projects` in the bar)
1. Create another html file in this folder called 'projects.html'
1. Copy the contents of the nav bar and information from the 'head' tag of your `index.html` file and paste it into your `projects.html` file<
1. Inside `projects.html`, create a level-two heading and add the text `Projects`
1. Check to make sure that your links work! When you click on "Projects" in your nav bar, does it open the `projects.html` document?
1. In `projects.html`, add three projects that Grumpy Cat has worked on. To do this simply, you can use an ordered list. If you're up for a little more of a challenge, create three columns: each column should contain the title and a description of their three most recent, successful projects

<br>
<br>
<br>


🔴 **Commit your work!** <br>
Your commit message should read something like: 

<br>

`"added project.html page and content - finished resume"`


<br>
<br>
<br>


## Loops - Getting Started


Now, let's get in a little bit of JavaScript practice.  Specifically, more loops!

1. In tonight's main `homework` folder (not inside `resume_page`!), create a `loops.js` file and complete the following section in that file.

<br>
<br>
<br>


## Loops - More Reps!

Pick **five** to tackle.

1. Create a loop that logs the numbers from 0-99 (ascending)
1. Create a loop that logs the numbers from 99-0 (descending)
1. Create a loop that logs the **EVEN** numbers from 0-98 (ascending)
1. Create a loop that logs the **EVEN** numbers from 98-0 (descending)
1. Create a loop that logs the **ODD** numbers from 0-99 (ascending)
1. Create a loop that logs the **ODD** numbers from 99-0 (descending)
1. Create a loop that logs the numbers from 49-72 (ascending)
1. Create a loop that logs the numbers from 81-26 (descending)
1. Create a loop that logs the numbers from 3-90 **that are multiples of 3** (ascending)

<br>
<br>
<br>


🔴 **Commit your work!** <br>
Your commit message should read something like:

<br>

`"finished loop practice"`


<br>
<br>
<br>


## Hungry for More?

### Git
- Check out this [tutorial](http://gitreal.codeschool.com/?utm_source=github&utm_medium=codeschool_option&utm_campaign=trygit) that includes videos about using git and some challenges for you to tackle.


<br>
<br>
<br>


### More for grump cat's site:
1. Insert a video of grumpy cat's work or his favorite YouTube video ('iframe' tag)
1. Add a level-three heading above his video with a title for the section
1. Insert a table with his contact info (`table` tag)
1. Add a level-three heading above his contact info with a title for the section

1. Give the image a 1px black border<br>
1. Give the body of the page a thicker border than the picture but only on the top and bottom of the page
1. Using HTML, insert a short blurb or biography with "p" tags
1. Using HTML, insert a short description above your "p" tag; use an "h3" tag
1. Make his name uppercase <strong>using CSS</strong>

1. Insert another image of grumpy cat, or an image of one of his projects, but make it round
1. Insert a button on both pages that links to opening an email to his email address
1. Style the navigation bar

<br>
<br>
<br>


### Loops
- Go back and finish all the loop problems!
- Go back and tackle the loop problems with a different kind of loop! (for/while)



