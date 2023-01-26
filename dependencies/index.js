const rootComponent=[
	 'reactDOMClient', 'Provider', 'createStore','Router','core','regen'
]

const applicationComponent=[
	'Routes',
]

const layoutComponent=[
	'Outlet'
]

const navComponent=[
	'Link'
]

const customHook=[
	'hooks'
]

const dependencies={
	hooks: `import {useState,useEffect} from 'react'`,
	react : `import React from 'react'`,
	reactDOMClient :`import * as ReactDOMClient from 'react-dom/client'`,
	Provider:`import {Provider} from 'react-redux'`,
	createStore:`import {createStore,combineReducers} from 'redux'`,
	Router:`import {BrowserRouter as Router} from 'react-router-dom'`,
	Routes:`import {Routes,Route} from 'react-router-dom'`,
	Outlet:`import {Outlet} from 'react-router-dom'`,
	Link:`import {Link} from 'react-router-dom'`,
	core:`import 'core-js/stable/index.js'`,
	regen:`import 'regenerator-runtime/runtime.js'`
}

module.exports={
	rootComponent,
	applicationComponent,
	layoutComponent,
	dependencies,
	navComponent,
	customHook,
}
