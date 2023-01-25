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

function genericComponent(component){
	return `function ${component.getNodeId()}(){
	return(
	<div className='${component.getNodeId()}'>
	</div>
	)
}
`

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
}
