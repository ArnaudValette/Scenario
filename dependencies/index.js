const rootComponent=[
	'react', 'reactDOMClient', 'Provider', 'createStore','Router'
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

const dependencies={
	react : `import react from 'react'`,
	reactDOMClient :`import * as ReactDOMClient from 'react-dom/client'`,
	Provider:`import {Provider} from 'react-redux'`,
	createStore:`import {createStore,combineReducers} from 'redux'`,
	Router:`import {BrowserRouter as Router} from 'react-router-dom'`,
	Routes:`import {Routes,Route} from 'react-router-dom'`,
	Outlet:`import {Outlet} from 'react-router-dom'`,
	Link:`import {Link} from 'react-router-dom'`,
}

module.exports={
	rootComponent,
	applicationComponent,
	layoutComponent,
	dependencies,
	navComponent,
}
