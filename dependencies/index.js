const rootComponent=[
	'react', 'reactDOMClient', 'Provider', 'createStore','reducer','Router'
]

const dependencies={
	react : `import react from 'react'`,
	reactDOMClient :`import * as ReactDOMClient from 'react-dom/client'`,
	Provider:`import {Provider} from 'react-redux'`,
	createStore:`import {createStore,combineReducers} from 'redux'`,
	reducer :`import reducer from './reducers/reducer'`,
	Router:`import {BrowserRouter as Router} from 'react-router-dom'`,
}

module.exports={
	rootComponent,
	dependencies,
}
