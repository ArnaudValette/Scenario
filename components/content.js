function reducerComponent(name){
	return `const ${name}={
}

export default ${name}`
}

function rootComponent(component){
	return `const reducers = combineReducers({
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
`
}

function applicationComponent(component){
	return `function ${component.getNodeId()}(){
	return(
		<>
		</>
	)
}
`

}

function navComponent(component){
	return `function ${component.getNodeId()}(){
	return(
		<nav>
		</nav>
	)
}
`
}

function genericComponent(component){
	return `function ${component.getNodeId()}(){
	return(
	<div className='${component.getNodeId()}'>
	</div>
	)
}
`

}

function reducerStructure(name){
	return `function ${name}(state='',action){
	switch(action.type){
		default:
			return state
	}
}`
}

function layoutComponent(component){
	return `function ${component.getNodeId()}(){
	return(
	<div className='${component.getNodeId()}'>
		<header>
		</header>
		<main>
			<Outlet/>
		</main>
	</div>
	)
}
`

}
function routeComponent(component){
	return `function ${component.getNodeId()}(){
	return(
	<div className='${component.getNodeId()}'>
	</div>
	)
}
`

}

module.exports={
	rootComponent,
	applicationComponent,
	genericComponent,
	layoutComponent,
	routeComponent,
	reducerComponent,
	reducerStructure,
	navComponent,
}
