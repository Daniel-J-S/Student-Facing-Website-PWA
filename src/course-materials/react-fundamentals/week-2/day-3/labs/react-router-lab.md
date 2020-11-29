---
track: "React Fundamentals"
title: "React Router Lab"
week: 2
day: 3
type: "lab"
---

# React Router Lab

<br>
<br>
<br>


## Intro

In the lesson earlier you:

1. Learned how to use React Router to perform client-side routing.
 
2. Refactored the react-mastermind app to render a `<GamePage>` component at the root route.

3. Added a "Difficulty" `<Link>` to the `<GamePage>` used to navigate to a `<SettingsPage>` component.

3. As a practice exercise, added an additional `<Route>` with a path of `/settings`.

4. Created a minimal `<SettingsPage>` component that included a "HOME" `<Link>`.

In this lab, you'll continue to have fun building out react-mastermind using what you know about components, state, props, styling, event handlers, routing and of course, JavaScript.

**This lab is not a deliverable**

<br>
<br>
<br>



## Set Up

The starter code for this lab is the same as the completed code from the _React Router_ lesson. However, just in case your code wasn't working or to ensure you have no issues following along with this lab, please follow the steps below:

To get set up for this lab:

- Download the <a href="/downloads/react_fundamentals/react-router-lab/react-mastermind.zip" download>Starter Code</a>
- Extract the folder from the `.zip` file and `cd` into it
- Install the Node modules: `$ npm i`
- Open the code in VS Code: `$ code .`
- Start the dev server: `$ npm start`

Once the dev server opens a tab to `localhost:3000`, the page should have something like the following:

<img src="https://i.imgur.com/ibMTm9k.png">

<br>
<br>
<br>




## Exercises

In this lab, you'll be adding the "Difficulty" setting functionality by completing the exercises below.

When completed, clicking the "Difficulty" link (styled as a button) will display the following:

<img src="https://i.imgur.com/gFjNSt0.png">

As you can see, the settings page allows the player to change the difficulty level by selecting the number of colors available to choose from!

1. Currently, the `<GamePage>` component is relying on CSS classes defined in **App.css**. Refactor to cure this inappropriateness by copying the classes in **App.css** over to **GamePage.css** created during the lesson. Update the class names and update **GamePage.js** as required to use those class names. 

2. Since both `<App>` & `<GamePage>` rely on a `*-header-footer` class with the same styling, refactor by renaming it to `header-footer` and putting it in **index.css** instead. Update **App.js** & **GamePage.js** to use `header-footer`, then you can delete `GamePage-header-footer` from **GamePage.css** and all of the CSS in **App.css**.

3. There will be three levels of difficulty: 'Easy'; 'Moderate'; and 'Difficult'.  The game's difficulty will be held in a seperate piece of state named `difficulty`. 

4. Using a `useState` hook, initialize the `difficulty` state with a value of `'Easy'`. However, `difficulty` should not be "reset" if the player clicks the **[New Game]** button.
	
5. Using strings such as 'Easy', etc., to represent the `difficulty` is a fantastic way to access the array of colors for a particular difficulty level by using an object as a lookup. Refactor the `colors` array in **App.js** to be an object with keys of `Easy`, `'Moderate` and `Difficult` which hold arrays of 4, 5, or 6 color strings respectively.

	Hint: The first couple of lines will look like this
	
	```javascript
	const colors = {
	  Easy: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD'],
	  ...
	```

5. Changing the structure of `colors` expectedly broke the code because we were used to passing `colors` as an array to `<GamePage>`. Refactor the value that is assigned to the `colors` prop in `<GamePage>` such that the appropriate array in the refactored `colors` object is passed according to the value of the `difficulty`  state property. With this step complete, the react-mastermind will be working again.

6. Now comes the "fun" part - building out the `<SettingsPage>` component so that:

	- It displays the UI shown above, including the three difficulty levels, with a button to select the level and the colors rendered as pegs. Also, theres a "Cancel" link used to return to the root without changing the difficulty.

	- The button to select the difficulty level is disabled for the currently selected difficulty.

	- Clicking one of difficulty buttons should update the `difficulty` state, initialize a new game, and programmatically route back to the `<GamePage>` page (root route).
	
	- As always, use React Developer Tools to browse components and check/modify state & props.
	
	- `<SettingsPage>` is going to need both the `colors` object, the `difficulty` state & the `setDifficulty` setter function.

	- Since we need to reset the `gameState` after the difficulty has been changed, can add a `useEffect` hook inside of `App.js` to reset `gameState` whenever `difficulty` state changes:

	```javascript
	useEffect(() => {
      handleNewGameClick()
    }, [difficulty]) 
	```

	- Then, after calling the `setDifficulty` setter function, you can use the technique shown in the [**further reading section**](/react-fundamentals/week-2/day-3/lecture-materials/intro-to-react-router/#routing-programmatically) of _React Router_ lesson to programmatically route to `/`.

Choosing the **Difficulty** level will result in the root route displaying this:

<img src="https://i.imgur.com/IaKWyLR.png">

Good luck cracking the code!

<br>
<br>
<br>




#### Pssssst ... here's one possible solution to this lab (Please, only use if necessary) 

<a href="/downloads/react_fundamentals/react-router-lab-solution/react-mastermind.zip" download>Solution Code<a>