# Scenario
## Generates react-app skeletons:
  * - [x] Via nodeJS
  * - [ ] Via CLI
  * - [ ] Via commonLisp
  * - [ ] Via a graphical user interface

## Features:
  * - [x] Generation of functional components skeletons
  * - [x] Importation of generated components in the chosen 'parent' components
  * - [x] Automatic creation of .css file in the subfolder containing its component
  * - [ ] Automatic creation of test files
  * - [x] Generation of reducers files and importation of the files inside index.js
  * - [x] Generation of reducer functions inside reducers files
  * - [x] Generation of Routes map for react-router-dom
  * - [x] Automatic creation of Route **element** (with nesting)
  * - [x] Automatic creation of <Route> logic inside App.jsx
  * - [x] Creation of a Menu component based on the Route logic
  * - [x] Generation of custom-hook skeletons
  
# Example :

## For now
Everything must happen in the index.js of Scenario.


## Generating public files
The following function will generate template files in *./template/public/*.

These are useful if you wish to use **Scenario** as a way to create templates
for **create-react-app**.

generateHtmlRoot accepts two arguments, one for the *title* of the html page,
one for the *description* of the page.
```
generatePublic.generateHtmlRoot('frontend', 'this is a frontend')
generatePublic.generateRobots()
```


## Basic usage 

First create a Scenario instance
```
const s = new Scenario()
```
Generate index.js and App.jsx
```
const {index, app} = generateSrc(s)
```
This creates index.js, App.jsx, App.css, index.css, calling the following methods under the hood:
```
const app = s.createAppComponent('App', {type:'applicationComponent'})
const title = s.createRootComponent('index', {type:'rootComponent')})
s.addLocalDependency(index, app)
```

There are several types of components you can generate, one of the simplest is the 'genericComponent' type
which generates a simple component skeleton inside *./template/src/component/--component-name--/--component-name--.jsx.

To create a generic component : 
```
const test4=s.createComponent('Test4', {})
```

It will generate a file looking like this :
```
import './Test4.css'
function Test4(){
  return(
    <div className='Test4'>
    </div>
    )
}

export default Test4
```

Then you may want to **import** test4 into app like that :

```
s.addLocalDependency(app,test4)
```

This will edit the imports of App.jsx and add the following line (if not already present):

```
import Test4 from './component/Test4/Test4'
```

## Routing
### Trivia

There are **2 types** of routing components.
1. Layouts
2. Routes

Layouts serve for nesting other Routes or Layouts components.
 
Routes are used when the component you are generating doesn't have children in react-router-dom (i.e. when 
you don't need to use <Outlet/> to render the child Routes)

TL;DR : *layoutComponent* has an **Outlet**, *routeComponent* **doesn't**

### Generate the routing components

First :

```
const Cover=s.createRouteComponent('Cover',{type:'layoutComponent', to:'/'})
const Layout=s.createRouteComponent('Layout', {type:'layoutComponent', to:'menu'})
const test2=s.createRouteComponent('Test2', {type:'routeComponent', to:'about'})
const test3=s.createRouteComponent('Test3', {type:'routeComponent',to:'contact'})
const Layout2=s.createRouteComponent('Layout2',{type:'layoutComponent',to:'home'})
const test5=s.createRouteComponent('Test5', {type:'routeComponent',to:'hello'})
```

The routes are located in **./template/route/--name-of-the-route--/** folders.

### Connecting the Routes

Again, there are two types of object to be dealed with :
1.routerTree
2.childRoute

RouterTrees are the roots of the router, i.e. *level 0* of the tree.

childRoute are the leaves of the tree.
  
Note that with react-router-dom, the following is possible:
```
              [/]      [/2ndRoot]     [/3rdRoot]
              / \             \      
       [contact][about]        [a]
```

Meaning you can do the following :

```
s.addRouterTree(Cover)
s.addRouterTree(Layout)
s.addRouterTree(Layout2)
```

And then :

```
s.addChildRoute(Layout,test2)
s.addChildRoute(Layout, test3)
s.addChildRoute(Layout2, test5)
```
Binding test2 and test3 as children of Layout,
and test5 as a child of Layout2

At this stage, App.jsx should display :

```
import Test5 from "./route/Test5/Test5"
import Layout2 from "./route/Layout2/Layout2"
import Test3 from "./route/Test3/Test3"
import Test2 from "./route/Test2/Test2"
import Layout from "./route/Layout/Layout"
import Cover from "./route/Cover/Cover"
import './App.css'
import {Routes,Route} from 'react-router-dom'
function App(){
	return(
		<>
		<Routes>
			<Route path='/' element={<Cover/>}/>
			<Route path='menu' element={<Layout/>}>
				<Route path='about' element={<Test2/>}/>
				<Route path='contact' element={<Test3/>}/>
			</Route>
			<Route path='home' element={<Layout2/>}>
				<Route path='hello' element={<Test5/>}/>
			</Route>
		</Routes>
		</>
	)
}
export default App     
```
## Generating a navBar:
After the routing has been done, you can then generate a navComponent which will contain the following :
```
import './Menu.css'
import {Link} from 'react-router-dom'
function Menu(){
	return(
		<nav>
			<Link to='/'/>
			<Link to='/menu'/>
			<Link to='/menu/about'/>
			<Link to='/menu/contact'/>
			<Link to='/home'/>
			<Link to='/home/hello'/>
		</nav>
	)
}
export default Menu 
```

To do so:
```
s.createNavComponent('Menu', {type:'navComponent'})
s.createLinksNavbar()
```
## Custom Hooks :
### Generating a custom hook:

Custom hooks, located in *./template/src/hook/-nameOfTheHook-/*
can be created with the following method :
```
const logout = s.createHook('logout')
```

You can add them as dependency to another component like this :
```
s.addLocalDependency(test3,logout)
```

Note that the parameter string 'name' is handled to correspond to what kind 
of names react accepts as custom hook (i.e. something that begins with 'use' and ends 
with a capitalized string)

```
//creates a hook named useLogout
s.createHook('logout')
//creates a hook named useLogout
s.createHook('Logout')
//creates a hook named useLogout
s.createHook('useLogout')
``` 
 

## Redux:

### Trivia

There is a distinction between a reducer file and a proper *reducer*.
 
A reducer file can contain several *reducers*.

### Generating a reducer file

```
const reducerOne= s.createReducer('ReducerOne')
const dialog = s.createReducer('dialog')
```
This will have two effects:
1. It will create two reducer files :
*./template/reducer/reducerOne/reducerOne.js*
```
const ReducerOne={
}

export default ReducerOne
```
*./template/reducer/dialog/dialog.js*
```
const dialog={
}

export default dialog
```

2. It will update index.js like that:

```
import dialog from './reducer/dialog/dialog.js'
import ReducerOne from './reducer/ReducerOne/ReducerOne.js'
import App from "./App"
import './index.css'
import react from 'react'
import * as ReactDOMClient from 'react-dom/client'
import {Provider} from 'react-redux'
import {createStore,combineReducers} from 'redux'
import {BrowserRouter as Router} from 'react-router-dom'

const reducers = combineReducers({
})

const store=createStore(reducers)
const container=document.getElementById('application')
const root=ReactDOMClient.createRoot(container)

root.render(
	<Provider store={store}>
		<Router>
			<App/>
		</Router>
	</Provider>
)
export default index
```

### Generating reducers

You then need to populate the reducer files with some proper *reducers*.

To do so :
```
s.feedReducer(reducerOne, 'user')
s.feedReducer(reducerOne, 'token')

s.feedReducer(dialog , 'one')
```

This will update ReducerOne.js like this :
```
function token(state='',action){
	switch(action.type){
		default:
			return state
	}
}
function user(state='',action){
	switch(action.type){
		default:
			return state
	}
}
const ReducerOne={
	user,
	token,
}

export default ReducerOne
```

dialog.js:

```
function one(state='',action){
	switch(action.type){
		default:
			return state
	}
}
const dialog={
	one,
}

export default dialog
```

index.js:
```
import dialog from './reducer/dialog/dialog.js'
import ReducerOne from './reducer/ReducerOne/ReducerOne.js'
import App from "./App"
import './index.css'
import react from 'react'
import * as ReactDOMClient from 'react-dom/client'
import {Provider} from 'react-redux'
import {createStore,combineReducers} from 'redux'
import {BrowserRouter as Router} from 'react-router-dom'

const reducers = combineReducers({
	user:ReducerOne.user,
	token:ReducerOne.token,
	one:dialog.one,
})

const store=createStore(reducers)
const container=document.getElementById('application')
const root=ReactDOMClient.createRoot(container)

root.render(
	<Provider store={store}>
		<Router>
			<App/>
		</Router>
	</Provider>
)
export default index
```

# What is coming next ?

Scenario is a personal *research* before being a **project**, I tend to commit in my free time and already have an usage for it in my workflow,
but my aim here is to understand a problem in order to fully refactor the code (and to create a commonlisp image). 
  
## What I imagine :
* A proper way to interact with it
* A streamlined way for users to define their own Scenario components 
* A component store
* Possibility to use it as a react-app development 'helper' more than as a react-app template builder
* Possibility to use it as a *standardized* basis (as a framework/metalanguage call it the way you want) that can handle the formal idiosyncrasies present 
in react app development 

Scenario lives in :
```
//from there :

import x from 'x'
import y from 'y'

function F(){

//to there

  ...
  [You handle this part : useState, useEffect, useRef,useMemo, useCallback, vanillaJS etc...]
  ...
  
//AND from there

return(
  <div>
  
//to there

  ...
  [You handle this part: jsx, jsx, jsx etc...]
  ...
  
//AND from there
  </div>
  )
}

export default F
//to there
```

One would argue that hooks+jsx are already a super fast and pleasant way to develop a web application.
  
I totally agree, 

but I would enjoy the ability to generate hooks and jsx from a lisp image using Scenario as an architect, where the content generated by the lisp image 
would be passed to Scenario as furnitures to place in a building.

Enjoyment was a sufficient plea to write this (even if a lot of tools like that already exists).
