---
track: "React Fundamentals"
title: "React From the Beginning"
week: 1
day: 1
type: "lecture"
---

# The Differences Between Unit 1, Unit 2, Unit 3, Unit 4, Unit 5,
1. Unit 1 - We Build the Foundation
1. Unit 2 - We Fammiliarize You With Modern Software Set Up
1. Unit 3 - We Teach How To Build Modern Apps and Debug Your Own Code
1. Unit 4 - We Teach You How To Teach Yourself
1. Unit 5- We take off all the rails and let you build whatever you want.

## In Unit 3
1. We still want you to ask questions
1. We won't fix your bugs during class, if it's a bug in your code.
1. In Unit 3 It will be up to you to compare your code to the completed code for any lesson and fix it.

## FAQ
1. Why? Because once we get out in the field we will be expected to fix our own typos and bugs, so we 
would be harming you, by not making you spend the next 6 weeks doing that.

# Beginning with the End In Mind
- Describe why React is so popular and in high demand
 - Describe the history of React
 - Describe what is React in terms of code organization
 - Explain what is JSX
 - Explain what is state
 - Build a simple React app
 
## Why React ?
According to the 2018 Stack Overflow Developer Survey, React is the framework most developers say they want to work with if they don’t already. There are plenty of reasons for this, but here are just a few:

1. Speed: React is fast! As more and more people visit webpages on a wide range of devices, fast performance is increasingly critical.

1. Reusable components: You can break down common elements (e.g., forms, buttons, or layouts) into a component, which you
 can reuse as you build out your app’s functionality, rather than code each new piece from scratch.

1. Easy collaboration: Independent components allow larger dev teams to split work without stepping on one another’s toes. 
For example, if you were working on a real estate listings site, you could have dedicated developers working on individual
views of property listings, while another group tackles the view of all available listings and another works on the ratings system.

1. Highly scalable: Developers often prefer React for large-scale application because of the reusability and independence 
of the components.

## How React is Used To Build Web Pages

1. Developers leverage React to create seamless user interactions. For example, when you search Netflix for a show you 
want to watch, you might see the results list narrow down with each letter you enter into the search field. These changes 
are immediate and you see a consistent user interface, which makes it easy to find what you’re looking for. But there’s 
a lot going on behind the scenes.

1. When you search for a movie (i.e., input data), your input goes to Netflix, and Netflix quickly returns matching results. This is because data for each category, movie, and show is loaded into a React component (you can think of this as a template or blueprint) that can be reused and updated based on the data.

1. The framework is based on the concept of components, both for viewing different data and for coding efficiency. Rather than reloading a whole webpage when a user interacts with it, the only components that change are those that need to be updated based on what the user wants to see or do on the page. Developers can also reuse components that have similar functionality throughout a site, saving them extra, repetitive work.

1. React is “agnostic” to other tools in your front end, which means developers can use it in tandem with other powerful front-end JavaScript frameworks and libraries like Redux, Mobx, RxJS. 
Since React only handles how data is presented, developers often pair it with numerous back-end (i.e., data-handling) frameworks, 
such as Ruby on Rails, Express, Django, Drupal, and others.

1. In Unit 3 we will Pair React with Express and in Unit 4 we will use Ruby on Rails as our BackEnd

### What is React in terms of code?

React is written in JavaScript. However, it has always relied on the bleeding edge of JavaScript and uses JSX (an HTML-JavaScript hybrid). Therefore, in order for browsers to understand it, it has to be compiled into older JavaScript.

Luckily there is a great technology called [Babel](https://babeljs.io/), that will handle this for us. This lets us write modern React/JavaScript without having to worry whether an older browser is up to date with its JavaScript.

Let's start with a `Hello World` example.

Every (class) component needs a render function. React is the view layer for users to see and interact with. If these components don't render any elements to the DOM, then they don't serve much purpose. So we'll always have a render function.

The render function returns the html elements that will be loaded somewhere in the DOM.

```jsx
class HelloWorld extends React.Component {
  render () {
    return (
      <div>
        Hello World!
      </div>
    )
  }
}
```
This is a class based react component. In OOP driven applications this will be the go to way
of handling React Components.

This has always been a problem for React Though because it doesn't behave in a true
Object Oriented Fashion. Because of this to get the full power of React requires us to learn about
Functional Programming.

Now Functional Programming is VERY VERY Mathy. In JavaScript we don't truly have to dive into the deep depths
of functional programming, but you can do that with Haskell, or even GoLang.

#### Now The Principals of OOP were
1. Abstraction
1. Encpapsulation
1. Inheritance
1. Polymorphism

### The Principles of Functional Programming
1. Immutability.
1. Disciplined state.
1. Pure functions and no side effects.
1. First class functions and higher order functions.
1. Type systems.
1. Referential transparency.

```jsx
function HelloWorld(props) {
 return (<h1>Hello World</h1>)
}
```

Very subtle difference. But now we will describe our UI as functions.

## Lets Code
1. Navigate to your `dev_ga` folder
1. In your dev_ga ```mkdir unit_3_lessons```
1. then ```cd unit_3_lessons```
1. then run ```sudo npm i -g big-poppa-code-react-starter```
1. then run ```lets-code```
1. Listen to my instructions

## Look at Our Files
1. Lets look at the scripts in our package.json (can you identify the dev script)
1. We will be working in the src folder
1. Lets Locate App.js and Home.js

```jsx
export default function Home(props) {
	const [cardText, updateCardText] = useState('');

	const addACard = element => {
		let promptCardText = window.prompt('Enter Your Text', 'enter text here');
		const list = document.getElementById(element);
		const card = document.createElement('li');
		card.innerText = promptCardText;
		list.appendChild(card);
		return;
	};
	const addWinnie = event => {
		return addACard('winnie-list');
	};
	const addBob = event => {
		return addACard('bob-list');
	};
	const addThomas = event => {
		return addACard('thomas-list');
	};
	const addGeorge = event => {
		return addACard('george-list');
	};
	return (
		<div className="Page">
			<div className="column">
				<h2 className="heading winnie">Winnie</h2>
				<ul id="winnie-list">
					<li>1 Card</li>
					<li>43 Card</li>
				</ul>
				<button onClick={addWinnie}>Add A Card</button>
			</div>
			<div className="column">
				<h2 className="heading bob">Bob</h2>
				<ul id="bob-list">
					<li>1 Card</li>
					<li>3 Card</li>
				</ul>
				<button onClick={addBob}>Add A Card</button>
			</div>
			<div className="column">
				<h2 className="heading thomas">Thomas</h2>
				<ul id="thomas-list">
					<li>1 Card</li>
					<li>2 Card</li>
				</ul>
				<button onClick={addThomas}>Add A Card</button>
			</div>
			<div className="column">
				<h2 className="heading george">George</h2>
				<ul id="george-list">
					<li>1 Card</li>
					<li>2 Card</li>
				</ul>
				<button onClick={addGeorge}>Add A Card</button>
			</div>
		</div>
	);
}
```

### A lot is happening here, so lets break this down
- note: the classNames are defined in our stylesheet, lets take that for granted and discuss it later
1. First we have a functional component inside of that functional we are
using a React Hook Called UseState `State` should sound fammiliar
1. what we need to understand is that when useState is invoked it returns an array with
2 values. A Value of a certain dataType and a function that has
one Job, to update that value.
1. We are using array destructuring which works like this
    ```js
    const arthursNameArray = ['Arthur', 'Bernier']
    const [firstName, lastName] = arthursNameArray
    // i now have 2 constants 
    // firstName which has what value
    // lastName which has what value

    // now think of this as a function

    const createArrayWithUpdater = (arr) => {
     return [arr, (newValue)=> {
     arr.push(newValue)
    }]
    }
    
    const [myArr, updateMyArr] = createArrayWithUpdater([1,2,3])
    ```
    <img width="842" alt="Screen Shot 2020-08-21 at 2 36 39 PM" src="https://media.git.generalassemb.ly/user/15881/files/26ae1d80-e3cc-11ea-9dae-a6ca2e6fcaf0"> 
  
1. also we have multiple functions inside the scope of this function
It appears that they all call the original addACard Function and add a card to an individual list (lets demonstrate)
1. This functionality should make sense to us because we aren't yet using state, lets change that
1. Now that we see that lets go ahead and add some functionality


### Lets Use State Ourself in a simple location
1. Go to the App.js file
1. Lets update our code to add a button that changes the state of our application

```jsx
function App(props) {
   const [name, updateName] = useState('Arthur');
   return (
       <div className="Page-wrapper">
           <h2>Arete App</h2>
           <button onClick={e => updateName(e.target.value)} value={name + 's'}>
               Change
           </button>
           <h2>{name}</h2>
           <Home />
       </div>
   );
}    
```      

1. When we click on this button that we created we update our state.
When the button is clicked, we call updateName with the value of e.target.value `e` standing for event
So that function has one purpose which is to update Name. Name updates and which also will update the value because value is 
always equal to `value={name + 's'}`. This causes each time we click the button for an S to get added onto the end of our name.

<img width="842" alt="Screen Shot 2020-08-21 at 3 32 57 PM" src="https://media.git.generalassemb.ly/user/15881/files/26158700-e3cc-11ea-903d-a263f5c5dae3">


### Lets use that understanding to add a new Functional Component for a Form.

```jsx
import React, { useState } from 'react';

export default function NameForm(props) {
	const [name, setName] = useState('');

	const handleSubmit = evt => {
		evt.preventDefault();
		alert(`Submitting Name ${name}`);
		setName('');
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
					Frirst Name:
					<input
						type="text"
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</label>
				<input type="submit" value="Submit" />
			</form>
			<h1>{name}</h1>
		</>
	);
}
```

1. In this component we have a form that has one field called name.
1. Whenever a user inputs a value name is dynamically changed and then finally submitted when the submit button
is clicked.
1. The submit button also causes the form to clear itself when its done by setting name back to an empty string.


## Why React Hooks

The ability to have reusable logic shared across components, without having to introduce extra components into our hierarchy.

1. So lets say we want to build multiple forms
1. Were going to need some way to handle multiple different Input Fields
1. For this we will have to create our own React Hook
1. Lets call this hook useInput
1. inside the `src/components` directory lets make a hooks folder
1. inside that folder make a `useInput.js` file.

```jsx
import { useState } from "react";

export default const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
      }
    }
  };
};

```

1. Lets Refactor NameForm to use this custom hook

```jsx
import React from 'react';
import useInput from './hooks/useInput';

export default function NameForm(props) {
	const { value, bind, reset } = useInput('');

	const handleSubmit = evt => {
		evt.preventDefault();
		alert(`Submitting Name ${value}`);
		reset();
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
					Name:
					<input type="text" {...bind} />
				</label>
				<input type="submit" value="Submit" />
			</form>
			<h1>{value}</h1>
		</>
	);
}

```

1. Now lets think about a form with more than 1 Input...


```jsx
import React from 'react';
import useInput from './hooks/useInput';

export default function NameForm(props) {
	const {
		value: firstName,
		bind: bindFirstName,
		reset: resetFirstName
	} = useInput('');
	const {
		value: lastName,
		bind: bindLastName,
		reset: resetLastName
	} = useInput('');

	const handleSubmit = e => {
		e.preventDefault();
		alert(`Submitting Name ${firstName} ${lastName}`);
		resetFirstName();
		resetLastName();
	};
	return (
		  <>
      <form onSubmit={handleSubmit}>
        <label>
            First Name:
            <input type="text" {...bindFirstName} />
        </label>
        <label>
            Last Name:
            <input type="text" {...bindLastName} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <h1>
        <span>First Name is: {firstName} </span>
        <span>Last Name is: {lastName} </span>
      </h1>
     </>
	);
}
```
<img width="842" alt="Screen Shot 2020-08-21 at 4 21 57 PM" src="https://media.git.generalassemb.ly/user/15881/files/26158700-e3cc-11ea-8220-0351178f28f8">

## Now lets refactor Our Lists To Use Our hooks

```jsx
import React, { useState } from 'react';
import useInput from './hooks/useInput';

export default function Home(props) {
	const [cardText, updateCardText] = useState('');
	const {
		value: winnieNewCard,
		bind: bindWinnieNewCard,
		reset: resetWinnieNewCard
	} = useInput('');
	const {
		value: bobNewCard,
		bind: bindBobNewCard,
		reset: resetBobNewCard
	} = useInput('');
	const {
		value: thomasNewCard,
		bind: bindThomasNewCard,
		reset: resetThomasNewCard
	} = useInput('');
	const {
		value: georgeNewCard,
		bind: bindGeorgeNewCard,
		reset: resetGeorgeNewCard
	} = useInput('');
	const [winnieList, updateWinnieList] = useState([]);
	const [bobList, updateBobList] = useState([]);
	const [thomasList, updateThomasList] = useState([]);
	const [georgeList, updateGeorgeList] = useState([]);

	const addWinnie = event => {
		event.preventDefault();
		updateWinnieList([...winnieList, winnieNewCard]);
		resetWinnieNewCard();
	};
	const addBob = event => {
		event.preventDefault();
		updateBobList([...bobList, bobNewCard]);
		resetBobNewCard();
	};
	const addThomas = event => {
		event.preventDefault();
		updateThomasList([...thomasList, thomasNewCard]);
		resetThomasNewCard();
	};
	const addGeorge = event => {
		event.preventDefault();
		updateGeorgeList([...georgeList, georgeNewCard]);
		resetGeorgeNewCard();
	};
	return (
		<div className="Page">
			{/* Winnie Column  Start*/}
			<div className="column winnieColumn">
				<h2 className="heading winnie">Winnie</h2>
				<ul id="winnie-list">
					{winnieList?.length
						? winnieList.map((listItem, i) => {
								return (
									<li key={listItem + '_' + i}>{`${i + 1}. ${listItem}`}</li>
								);
						  })
						: ''}
				</ul>
				<form className="task-form" onSubmit={addWinnie}>
					<label htmlFor="winnieNewCard">
						<span>New Task For Winnie:</span>
						<input type="text" id="winnieNewCard" {...bindWinnieNewCard} />
					</label>
					<button type="submit">Add A Task</button>
				</form>
			</div>
			{/*Winnie Column End */}
			{/* Bob Column Start */}
			<div className="column bobColumn">
				<h2 className="heading bob">Bob</h2>
				<ul id="bob-list">
					{bobList?.length
						? bobList.map((listItem, i) => {
								return (
									<li key={listItem + '_' + i}>{`${i + 1}. ${listItem}`}</li>
								);
						  })
						: ''}
				</ul>
				<form className="task-form" onSubmit={addBob}>
					<label htmlFor="bobNewCard">
						<span>New Task For Bob:</span>
						<input type="text" id="bobNewCard" {...bindBobNewCard} />
					</label>
					<button type="submit">Add A Task</button>
				</form>
			</div>
			{/* Bob Column End */}
			{/* Thomas Column Start */}
			<div className="column thomasColumn">
				<h2 className="heading thomas">Thomas</h2>
				<ul id="thomas-list">
					{thomasList?.length
						? thomasList.map((listItem, i) => {
								return (
									<li key={listItem + '_' + i}>{`${i + 1}. ${listItem}`}</li>
								);
						  })
						: ''}
				</ul>
				<form className="task-form" onSubmit={addThomas}>
					<label htmlFor="ThomasNewCard">
						<span>New Task For Thomas:</span>
						<input type="text" id="ThomasNewCard" {...bindThomasNewCard} />
					</label>
					<button type="submit">Add A Task</button>
				</form>
			</div>
			{/* Thomas Column End */}
			{/* George Column Start */}
			<div className="column georgeColumn">
				<h2 className="heading george">George</h2>
				<ul id="george-list">
					{georgeList?.length
						? georgeList.map((listItem, i) => {
								return (
									<li key={listItem + '_' + i}>{`${i + 1}. ${listItem}`}</li>
								);
						  })
						: ''}
				</ul>
				<form className="task-form" onSubmit={addGeorge}>
					<label htmlFor="georgeNewCard">
						<span>New Task For George:</span>
						<input type="text" id="georgeNewCard" {...bindGeorgeNewCard} />
					</label>
					<button type="submit">Add A Task</button>
				</form>
			</div>
			{/* George Column End */}
			{/* Hmmmm could these be built out in another component */}
		</div>
	);
}



```

## Lets code this out and talk about what changed.
1. We used Our Custom Hook to handle the Inputs for Winnie, Bob, thomas and george
1. We also used state to create updatable arrays with Use State Hook
1. We Rendered 4 Lists That are bound to each of our `list` state variables
1. We made a Function that handles adding a task to each users list.

## Lab Activity
1. How Can We Add A Button That Will Delete An Item From The List
1. Remember to use the spread operator to copy the list
1. `const newList = [...oldList]`
1. Remember the [__splice__](https://www.w3schools.com/jsref/jsref_splice.asp) method.
1. [__Filter__](https://www.w3schools.com/jsref/jsref_filter.asp) is also a valid way to solve that.
